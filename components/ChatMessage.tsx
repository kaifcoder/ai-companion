"use client";

import React from "react";
import { useToast } from "./ui/use-toast";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import BotAvatar from "./BotAvatar";
import { BeatLoader } from "react-spinners";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

export interface chatProps {
  role: "user" | "system";
  content?: string;
  isLoading?: boolean;
  src?: string;
}

const ChatMessage = ({ role, content, isLoading, src }: chatProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      toast({
        title: "Not Copied to clipboard",
      });
      return;
    }
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
    });
  };
  return (
    <div
      className={cn(
        "group flex items-start py-4 w-full gap-x-3",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}
      <div className="rounded-md max-w-sm px-4 py-2 text-sm bg-primary/10 ">
        {isLoading ? (
          <BeatLoader
            color={theme === "light" ? "black" : "white"}
            size={10}
            speedMultiplier={0.5}
          />
        ) : (
          content
        )}
      </div>
      {role === "user" && <UserAvatar />}
      {role !== "user" && !isLoading && (
        <Button
          onClick={onCopy}
          className="opacity-0 group-hover:opacity-100 transition"
          size="icon"
          variant="ghost"
        >
          <Copy className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ChatMessage;
