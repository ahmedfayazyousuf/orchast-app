import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MyCard } from "@/components/ui/MyCard";
import { MyHeading } from "@/components/ui/MyHeading";
import { dashboardNav } from "@/data/navigation";
import { notFound } from "next/navigation";

export function CategoryHub({ id }: { id: string }) {
  const group = dashboardNav.find((item) => item.id === id);
  if (!group) notFound();
  const Icon = group.icon;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-start gap-4">
        <div className="grid size-12 place-items-center rounded-full bg-mint-0 text-deep">
          <Icon size={22} />
        </div>
        <MyHeading as="h1" eyebrow="Lane" className="text-[32px] sm:text-[42px]">
          {group.label}
        </MyHeading>
      </div>
      <p className="mb-8 max-w-2xl">{group.description}</p>
      <div className="grid gap-4 md:grid-cols-2">
        {group.children.map((child) => {
          const ChildIcon = child.icon;
          return (
            <Link key={child.href} href={child.href} className="group">
              <MyCard hover className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-mint-0 text-deep">
                    <ChildIcon size={18} />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
                <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.025em] text-ink">
                  {child.label}
                </h2>
                <p className="mt-2">{child.description}</p>
              </MyCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
