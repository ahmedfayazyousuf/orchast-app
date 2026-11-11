import type { Metadata } from "next";
import { CommandCentre } from "@/components/sections/command-centre/CommandCentre";

export const metadata: Metadata = {
  title: "Command centre",
  description: "Speak to QUEEN and brief the specialist agents.",
};

export default function CommandCentrePage() {
  return <CommandCentre />;
}
