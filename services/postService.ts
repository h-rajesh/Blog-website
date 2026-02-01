import prisma from "@/lib/db";

export const getAllPosts = () => {
  return prisma.post.findMany({
    include: {
      blog: true,
      author: true,
      comments: true,
      likes: true,
      favorites: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getPostById = (id: number) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      blog: true,
      author: true,
      comments: true,
      likes: true,
      favorites: true,
    },
  });
};

export const createPost = (data: {
  blogID: number;
  authorID: number;
  content: string;
  image?: string;
}) => {
  return prisma.post.create({ data });
};

export const updatePost = (id: number, data: any) => {
  return prisma.post.update({
    where: { id },
    data,
  });
};

export const deletePost = (id: number) => {
  return prisma.post.delete({ where: { id } });
};
