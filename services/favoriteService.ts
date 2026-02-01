import prisma from "@/lib/db"

export const favoritePost = (userID: number, postID: number) => {
    return prisma.postFavorite.create({data:{userID,postID}})
}

export const unfavoritePost = (userID: number, postID: number) => {
    return prisma.postFavorite.delete({where:{userID_postID:{userID,postID}}})
}