import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const findLastUserId = async (): Promise<string | undefined> => {
  const lastUser = await prisma.user.findFirst({
    select: {
      userId: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return lastUser?.userId ? lastUser.userId.toString().substring(2) : undefined;
};

export const generateUserId = async (): Promise<string> => {
  const currentId = await findLastUserId();
  const parsedId = currentId ? parseInt(currentId) : 0;
  const incrementedId = (parsedId + 1).toString().padStart(5, "0");
  const userId = `U-${incrementedId}`;

  return userId;
};
