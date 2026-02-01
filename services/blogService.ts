import prisma from "@/lib/db";

export const getAllBlogs = () => {
  return prisma.blog.findMany({
    include: {
      author: true,
      posts: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getPublishedBlogs = () => {
  return prisma.blog.findMany({
    where: { published: true },
    include: { author: true, posts: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getBlogsByAuthor = (authorID: number) => {
  return prisma.blog.findMany({
    where: { 
      authorID, // Only get blogs created by this specific author
    },
    include: { 
      author: true, // Include author information
      posts: true, // Include posts for each blog
    },
    orderBy: { createdAt: "desc" }, // Most recent first
  });
};

export const getBlogById = (id: number) => {
  return prisma.blog.findUnique({
    where: { id },
    include: { author: true, posts: true },
  });
};

export const createBlog = (data: {
  title: string;
  description: string;
  authorID: number;
  published: boolean;
}) => {
  return prisma.blog.create({ data });
};

export const updateBlog = (id: number, data: any) => {
  return prisma.blog.update({ where: { id }, data });
};

export const deleteBlog = (id: number) => {
  return prisma.blog.delete({ where: { id } });
};
