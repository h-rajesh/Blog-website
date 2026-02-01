import { createComments, getAllComments } from "@/services/commentService";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const comments = await getAllComments()
            return res.status(200).json(comments)
        }
        if (req.method === "POST") {
            const { postID, authorID, content } = req.body;
            if (!postID || !authorID || content) return res.status(400).json({ message: "Missing fields" });

            const comment = await createComments({ postID, authorID, content });
            return res.status(201).json(comment)
        }
        return res.status(405).json({msg:"Method is not allowed"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server error"})
    }
}