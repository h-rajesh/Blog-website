import { getServerSession } from "next-auth"
import { getToken } from "next-auth/jwt"
import { authOptions } from "./authOptions"
import { cookies } from "next/headers"

export const getSession = async () => {
    try {
        // Check if secret is configured
        if (!authOptions.secret) {
            console.error("NEXTAUTH_SECRET is not set in environment variables");
            return null;
        }

        // In App Router, getServerSession automatically reads from cookies()
        // This is the recommended approach for App Router API routes
        const session = await getServerSession(authOptions);
        
        if (session?.user?.id) {
            if (process.env.NODE_ENV === 'development') {
                console.log('Session retrieved successfully via getServerSession');
            }
            return session;
        }
        
        // If getServerSession didn't work, try manual token decoding as fallback
        if (process.env.NODE_ENV === 'development') {
            console.log('getServerSession returned no session, trying manual decode...');
        }
        
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('next-auth.session-token') || 
                             cookieStore.get('__Secure-next-auth.session-token') ||
                             cookieStore.get('__Host-next-auth.session-token');
        
        if (!sessionCookie) {
            if (process.env.NODE_ENV === 'development') {
                console.log('No NextAuth session cookie found');
            }
            return null;
        }

        // Build cookie header string manually
        const cookiePairs: string[] = [];
        cookieStore.getAll().forEach(cookie => {
            cookiePairs.push(`${cookie.name}=${cookie.value}`);
        });
        const cookieHeader = cookiePairs.join('; ');
        
        // Use getToken to decode the JWT from cookies
        const token = await getToken({ 
            req: {
                headers: {
                    cookie: cookieHeader,
                },
            } as any,
            secret: authOptions.secret,
            cookieName: sessionCookie.name,
        });
        
        if (!token) {
            if (process.env.NODE_ENV === 'development') {
                console.log('Token decode failed - possible secret mismatch. Try logging out and back in.');
            }
            return null;
        }
        
        // Debug: log token structure
        if (process.env.NODE_ENV === 'development') {
            console.log('Decoded token:', { 
                hasId: !!token.id, 
                id: token.id,
                email: token.email,
                name: token.name,
                sub: token.sub,
                keys: Object.keys(token)
            });
        }
        
        // Try to get id from token.id or token.sub (sub is the user id in NextAuth)
        const userId = token.id || token.sub;
        
        if (!userId) {
            if (process.env.NODE_ENV === 'development') {
                console.log('Token exists but no id or sub field');
            }
            return null;
        }
        
        return {
            user: {
                id: Number(userId),
                email: token.email as string,
                name: token.name as string | null,
            },
            expires: token.exp ? new Date(token.exp * 1000).toISOString() : "",
        };
    } catch (error) {
        // If anything fails, return null (not authenticated)
        console.error("Error getting session:", error);
        return null;
    }
}

export { authOptions };