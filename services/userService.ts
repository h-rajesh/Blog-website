import prisma from "@/lib/db";

export const getAllUsers = () => {
  return prisma.user.findMany();
};

export const getUserById = (id: number) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const createUser = (data: {
  name?: string;
  email: string;
  password?: string;
  image?: string;
}) => {
  return prisma.user.create({ data });
};

export const updateUser = (id: number, data: any)=>{
    return prisma.user.update({ where: { id }, data });
}

export const deleteUser = (id: number) => {
    return prisma.user.delete({where:{id}})
}