"use client";

import { useState } from "react";
import { MyBadge } from "@/components/ui/MyBadge";
import { MyButton } from "@/components/ui/MyButton";
import { MyCard } from "@/components/ui/MyCard";
import { MyHeading } from "@/components/ui/MyHeading";
import { MyInput } from "@/components/ui/MyInput";
import { dummyUser } from "@/data/workspaces";

const toggles = [
  { id: "approvals", label: "Require human approval above AED 5,000", on: true },
  { id: "quiet", label: "Enforce quiet hours 22:00–08:00 GST", on: true },
  { id: "roi", label: "Hold unproven ROI claims from reports", on: true },
  { id: "email", label: "Email digest every Monday 08:00", on: false },
];

export function SettingsPanel() {
  const [state, setState] = useState(toggles);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <MyHeading as="h1" eyebrow="Workspace" className="text-[32px] sm:text-[42px]">
        Settings
      </MyHeading>
      <p>Local preferences only. Nothing is persisted beyond this browser session.</p>

      <MyCard>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[16px] font-semibold text-ink">Profile</h3>
          <MyBadge>Dummy user</MyBadge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <MyInput label="Name" name="name" defaultValue={dummyUser.name} />
          <MyInput label="Role" name="role" defaultValue={dummyUser.role} />
          <MyInput label="Email" name="email" defaultValue={dummyUser.email} />
          <MyInput label="Company" name="company" defaultValue={dummyUser.company} />
        </div>
        <div className="mt-4">
          <MyButton variant="primary">Save changes</MyButton>
        </div>
      </MyCard>

      <MyCard>
        <h3 className="text-[16px] font-semibold text-ink">Policy toggles</h3>
        <p className="mt-1 text-[13px]">
          These switches only change the labels in this prototype.
        </p>
        <ul className="mt-4 space-y-3">
          {state.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-4 rounded-[14px] border border-line px-3 py-3"
            >
              <span className="text-[13px] text-ink">{item.label}</span>
              <button
                type="button"
                onClick={() =>
                  setState((current) =>
                    current.map((row) =>
                      row.id === item.id ? { ...row, on: !row.on } : row,
                    ),
                  )
                }
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  item.on ? "bg-ink" : "bg-line"
                }`}
                aria-label={item.label}
                aria-pressed={item.on}
              >
                <span
                  className={`absolute top-0.5 size-5 rounded-full bg-white transition-transform ${
                    item.on ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </MyCard>
    </div>
  );
}
