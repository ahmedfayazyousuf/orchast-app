"use client";

import { Bell, Menu, Search } from "lucide-react";
import { MyBadge } from "@/components/ui/MyBadge";
import { MyInput } from "@/components/ui/MyInput";
import { dummyUser } from "@/data/workspaces";

export function DashboardTopbar({ onMenu }: { onMenu: () => void }) {
  return (
    <div className="sticky top-0 z-30 flex h-[64px] items-center gap-3 border-b border-line bg-bg/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={onMenu}
        className="grid size-10 place-items-center rounded-full border border-line bg-white md:hidden"
        aria-label="Open navigation"
      >
        <Menu size={16} />
      </button>
      <div className="hidden items-center gap-2 text-[11px] text-muted sm:flex">
        <span className="size-1.5 rounded-full bg-deep" />
        PRODUCT / LIVE PROTOTYPE
        <MyBadge>V2.0 · DEMO</MyBadge>
      </div>
      <div className="ml-auto flex min-w-0 items-center gap-2">
        <div className="hidden w-[220px] sm:block">
          <MyInput
            name="search"
            placeholder="Search workspace…"
            icon={<Search size={14} />}
            className="h-9"
          />
        </div>
        <button
          type="button"
          className="relative grid size-10 place-items-center rounded-full border border-line bg-white"
          aria-label="Notifications"
        >
          <Bell size={15} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-warn" />
        </button>
        <div className="hidden text-right text-[11px] leading-tight md:block">
          <div className="font-semibold text-ink">{dummyUser.name}</div>
          <div className="text-muted">{dummyUser.role}</div>
        </div>
      </div>
    </div>
  );
}
