import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const checkUser = async () => {
  const user = await currentUser();
// console.log(user)
  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await db?.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    if (loggedInUser) {
      return loggedInUser;
    }

    const name = `${user.firstName} ${user.lastName}`;

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return newUser;
  } catch (error) {
    console.log(error);
  }
};
// export const getUser = async () => {
//   try {
//     const users = await db.user.findMany();
//     console.log(users);
//     return users;
//   } catch (e) {
//     console.log("Error:", e);
//     throw e;
//   }
// };
