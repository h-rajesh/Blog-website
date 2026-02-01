import prisma from "@/lib/db"

export const getAllComments = () => {
    return prisma.comment.findMany({include:{author:true,post:true}})
}

export const getCommentById = (id: number) => {
    return prisma.comment.findUnique({
        where: { id },
        include:{author:true,post:true}
    })
}
export const createComments = (data: { postID: number; authorID: number; content: string }) => {
    return prisma.comment.create({data})
}

export const updateComment = (id: number, data: any) => {
    return prisma.comment.update({
        where: { id },
        data
    })
}

export const deleteComment = (id: number) => {
    return prisma.comment.delete({where:{id}})
}