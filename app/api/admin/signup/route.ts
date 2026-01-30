import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { stat } from "fs";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    try {
         const body =await req.json();
        const { name, email, password } = body;
        if (!name || !email || !password) {
            return NextResponse.json(
                { msg: "Missing parameters" },
                {status:400}
            )
        }

        const existing = await prisma.user.findUnique({
            where: { email }
        });

        if (existing) {
            return NextResponse.json(
                { message: "User Already exists" },
                {status:400}
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        console.error("Signup error", error);

        return NextResponse.json({ status: 500 });
    }
}