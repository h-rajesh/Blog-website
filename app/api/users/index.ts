import { createUser, getAllUsers } from "@/services/userService";
import {  NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const users = await getAllUsers();
            return res.status(200).json(users)
        }
        if (req.method === "POST") {
            const { name, email, password, image, bio } = req.body;
            if (!email) return res.status(400).json({ msg: "Email is required" });
            const user = await createUser({ name, email, password, image, bio })
            return res.status(201).json(user)
        }
        return res.status(405).json({ msg: "Method not allowed" })
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal server error")
    }
}