import { deleteComment, getCommentById, updateComment } from "@/services/commentService";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = Number(req.query.id)

    try {
        if (req.method === "GET") {
            const comments = await getCommentById(id);
            return res.status(200).json(comments)
        }
        if (req.method === "PUT") {
            const updatedComment = updateComment(id, req.body);
            return res.status(201).json(updatedComment)
        }
        if (req.method === "DELETE") {
            await deleteComment(id);
            return res.status(204).end()
        }
        return res.status(405).json({ msg: "Method is not allowed" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server error"})
    }
}