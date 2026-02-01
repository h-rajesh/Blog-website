import { deleteUser, getUserById, updateUser } from "@/services/userService";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = Number(req.query.id);
    
    try {
        if (req.method === "GET") {
            const user = await getUserById(id);
            return res.status(200).json(user)
        }

        if (req.method === "PUT") {
            const user = await updateUser(id, req.body);
            return res.status(200).json(user)
        }
        if (req.method === "DELETE") {
            await deleteUser(id);
            return res.status(204).end();
        }
        return res.status(405).json({msg:"Method is not allowed"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server error"})
        
    }
}