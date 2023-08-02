import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

interface Props {
  src: string;
}

const BotAvatar = ({ src }: Props) => {
  return (
    <Avatar className="h-12 w-12">
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default BotAvatar;
