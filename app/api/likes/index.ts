import { dislikePost, likePost } from "@/services/likeService";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            const { userID, postID } = req.body;
            if(!userID || !postID) return res.status(400).json({msg:"Missing fields required"})
            const like = await likePost(userID, postID);
        return res.status(201).json(like)
        }
        if (req.method === "DELETE") {
            const { userID, postID } = req.body;
            if (!userID || !postID) return res.status(400).json({ msg: "Missing fields required" });
            await dislikePost(userID, postID);
            return res.status(204).end()
        }
        return res.status(405).json({msg:"Method not allowed"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server error"})
    }
}