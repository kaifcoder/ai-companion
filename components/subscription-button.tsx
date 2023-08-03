"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import { useToast } from "./ui/use-toast";
import axios from "axios";

interface Props {
  isPro: boolean;
}

const SubscriptionBtn = ({ isPro }: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast({
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={loading}
      onClick={onClick}
      size={"sm"}
      variant={isPro ? "default" : "premium"}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Sparkles className="h-6 w-6 pl-2 text-white fill-white" />}
    </Button>
  );
};

export default SubscriptionBtn;
