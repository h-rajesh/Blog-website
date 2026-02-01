import { favoritePost, unfavoritePost } from "@/services/favoriteService";
import { NextApiRequest, NextApiResponse } from "next";

export async function handlers(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            const { userID, postID } = req.body;
            if (!userID || !postID) return res.status(400).json({ msg: "Missing fields required" });

            const fav = await favoritePost(userID, postID);
            return res.status(201).json(fav)
        }
        if (req.method === "DELETE") {
            const { userID, postID } = req.body;
            if (!userID || !postID) return res.status(400).json({ msg: "Missing fields required" });

            await unfavoritePost(userID, postID);
            return res.status(204).end()
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Server error"})
        
    }
}