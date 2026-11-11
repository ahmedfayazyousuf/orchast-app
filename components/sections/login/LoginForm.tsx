"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Lock, Mail } from "lucide-react";
import { MyBadge } from "@/components/ui/MyBadge";
import { MyButton } from "@/components/ui/MyButton";
import { MyHeading } from "@/components/ui/MyHeading";
import { MyInput } from "@/components/ui/MyInput";
import { dummyUser } from "@/data/workspaces";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    window.setTimeout(() => {
      router.push("/command-centre");
    }, 450);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <MyHeading as="h1" eyebrow="Workspace access" className="text-[40px] sm:text-[48px]">
        Sign in to <span className="serif">Orchast.</span>
      </MyHeading>
      <p>
        Dummy authentication only. Any email and password will open the Kestrel
        Commerce workspace.
      </p>
      <MyBadge>Demo mode · no accounts are created</MyBadge>
      <MyInput
        label="Work email"
        name="email"
        type="email"
        required
        defaultValue={dummyUser.email}
        icon={<Mail size={15} />}
      />
      <MyInput
        label="Password"
        name="password"
        type="password"
        required
        defaultValue="orchast-demo"
        icon={<Lock size={15} />}
      />
      <MyButton type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
        {loading ? "Opening workspace…" : "Enter command centre"}
        <ArrowUpRight size={16} />
      </MyButton>
      <p className="text-[11px]">
        By continuing you accept that this is a local prototype with fictional
        business data.
      </p>
    </form>
  );
}
