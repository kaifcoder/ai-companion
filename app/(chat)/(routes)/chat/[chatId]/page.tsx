import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import ChatClient from "./components/ChatClient";

interface Props {
  params: {
    chatId: string;
  };
}

const page = async ({ params: { chatId } }: Props) => {
  const { userId } = auth();
  if (!userId) return redirectToSignIn();
  const companion = await prismadb.companion.findUnique({
    where: {
      id: chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) return redirect("/");

  return <ChatClient companion={companion} />;
};

export default page;
