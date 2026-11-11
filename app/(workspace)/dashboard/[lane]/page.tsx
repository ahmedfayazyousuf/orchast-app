import type { Metadata } from "next";
import { CategoryHub } from "@/components/sections/dashboard/CategoryHub";
import { dashboardNav } from "@/data/navigation";

type LanePageProps = {
  params: Promise<{ lane: string }>;
};

export async function generateMetadata({
  params,
}: LanePageProps): Promise<Metadata> {
  const { lane } = await params;
  const group = dashboardNav.find((item) => item.id === lane);
  return { title: group?.label ?? "Lane" };
}

export default async function LanePage({ params }: LanePageProps) {
  const { lane } = await params;
  return <CategoryHub id={lane} />;
}
