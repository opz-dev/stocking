"use client";

import { cn } from "@/lib/utils";
import { HistoryIcon, ListCheckIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Menu() {
  const pathname = usePathname();
  const tabs = [
    {
      name: "品出しリスト",
      href: `/`,
      icon: ListCheckIcon,
      active: pathname === `/`,
    },
    {
      name: "品出し履歴",
      href: `/histories`,
      icon: HistoryIcon,
      active: pathname === `/histories`,
    },
  ];

  return (
    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={cn(
              "group inline-flex items-center gap-2 border-b-2 px-1 py-2 text-sm font-medium",
              tab.active
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
}
