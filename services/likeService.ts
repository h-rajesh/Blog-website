import prisma from "@/lib/db"

export const likePost = (userID: number, postID: number) => {
    return prisma.postLike.create({data:{userID,postID}})
}

export const dislikePost = (userID: number, postID: number) => {
    return prisma.postLike.delete({where:{userID_postID:{userID,postID}}})
}