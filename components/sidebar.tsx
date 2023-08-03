"use client";

import { cn } from "@/lib/utils";
import { Home, Plus, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { useProModal } from "@/hooks/use-pro-modal";

interface SidebarProps {
  isPro: boolean;
}

const Sidebar = ({ isPro }: SidebarProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const routes = [
    {
      label: "Home",
      icon: Home,
      href: "/",
      pro: false,
    },
    {
      label: "Create",
      icon: Plus,
      href: "/companion/new",
      pro: true,
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      pro: false,
    },
  ];

  const proModal = useProModal();

  const onNavigate = (href: string, pro: boolean) => {
    if (pro && !isPro) {
      return proModal.onOpen();
    }
    return router.push(href);
  };

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-2">
          {routes.map((route) => (
            <div
              onClick={() => onNavigate(route.href, route.pro)}
              key={route.href}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathName === route.href && "bg-primary/10 text-primary"
              )}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <route.icon className="h-5 w-5" />
                <span>{route.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
