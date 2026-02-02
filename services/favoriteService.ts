import prisma from "@/lib/db"

export const favoritePost = (userID: number, postID: number) => {
    return prisma.postFavorite.create({data:{userID,postID}})
}

export const unfavoritePost = (userID: number, postID: number) => {
    return prisma.postFavorite.delete({where:{userID_postID:{userID,postID}}})
}

// Get blogs that contain posts favorited by the user
export const getFavoriteBlogs = (userID: number) => {
    return prisma.blog.findMany({
        where: {
            posts: {
                some: {
                    favorites: {
                        some: {
                            userID: userID
                        }
                    }
                }
            }
        },
        include: {
            author: true,
            posts: {
                where: {
                    favorites: {
                        some: {
                            userID: userID
                        }
                    }
                },
                include: {
                    favorites: {
                        where: {
                            userID: userID
                        }
                    }
                }
            }
        },
        orderBy: { createdAt: "desc" },
    });
}