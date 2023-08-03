import SubscriptionBtn from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

const page = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="h-full p-4 space-y-3">
      <h3 className="text-lg font-medium">Settings</h3>
      <div className="text-muted-foreground text-sm">
        {isPro ? "You are on pro plan" : "You are on free plan."}
      </div>
      <SubscriptionBtn isPro={isPro} />
    </div>
  );
};

export default page;
