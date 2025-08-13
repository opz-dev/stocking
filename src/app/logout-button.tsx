"use client";

import { Button } from "@/components/ui/button";
import { Loader, LogOut } from "lucide-react";
import { useTransition } from "react";
import { logoutAction } from "./actions/logout-action";

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  async function handleLogout() {
    startTransition(async () => {
      await logoutAction();
    });
  }
  return (
    <Button onClick={handleLogout} variant="ghost" className="w-full text-left">
      {isPending ? (
        <Loader className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="mr-2 h-4 w-4" />
      )}
      <span>ログアウト</span>
    </Button>
  );
}
