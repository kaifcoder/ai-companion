"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { Companion } from "@prisma/client";
import ChatMessage, { chatProps } from "./ChatMessage";

interface Props {
  messages: chatProps[];
  isLoading: boolean;
  companion: Companion;
}

const ChatMessages = ({ messages = [], isLoading, companion }: Props) => {
  const scrollRef = useRef<ElementRef<"div">>(null);
  const [fakeloading, setFakeloading] = useState(
    messages.length === 0 ? true : false
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setFakeloading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);
  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeloading}
        src={companion.src}
        role="system"
        content={`Hello I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={companion.src}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={companion.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};

export default ChatMessages;
