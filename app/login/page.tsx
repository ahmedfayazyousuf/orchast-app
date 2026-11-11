import type { Metadata } from "next";
import { LoginForm } from "@/components/sections/login/LoginForm";
import { Logo } from "@/components/ui/Logo";
import { marketingUrl } from "@/lib/urls";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to the Orchast workspace.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-bg">
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
        <div className="mb-10">
          <Logo href={marketingUrl} />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
