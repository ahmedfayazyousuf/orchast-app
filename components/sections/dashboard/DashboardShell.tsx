"use client";

import { useCallback, useState } from "react";
import { Sidebar } from "@/components/navigations/sidebar/Sidebar";
import { DashboardTopbar } from "@/components/sections/dashboard/DashboardTopbar";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar open={open} onClose={onClose} />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar onMenu={() => setOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
