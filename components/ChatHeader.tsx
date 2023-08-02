"use client";

import { Companion, Message } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import {
  ChevronLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";

import BotAvatar from "./BotAvatar";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";
import axios from "axios";

interface Props {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
}

const ChatHeader = ({ companion }: Props) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/companion/${companion.id}`);
      toast({
        description: "Companion deleted successfully.",
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
      <div className="flex items-center gap-x-2">
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <BotAvatar src={companion.src} />
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{companion.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessagesSquare className="w-3 h-3 mr-1" />
              {companion._count.messages}
            </div>
          </div>
          <p className="text-muted-foreground text-xs">
            Created by {companion.userName}
          </p>
        </div>
      </div>
      {user?.id === companion.userId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="secondary">
              <MoreVertical className="h-8 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${companion.id}`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ChatHeader;
