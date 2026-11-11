import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Banknote,
  Building2,
  Megaphone,
  Search,
  Settings,
  ShieldAlert,
  ShoppingCart,
  Sparkles,
  Store,
  Users,
  Handshake,
} from "lucide-react";

export type NavChild = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export type NavGroup = {
  id: string;
  label: string;
  href: string;
  description: string;
  icon: LucideIcon;
  children: NavChild[];
};

export const dashboardNav: NavGroup[] = [
  {
    id: "digital-performance",
    label: "Digital Performance",
    href: "/dashboard/digital-performance",
    description:
      "Search, answer engines and always-on acquisition working as one lane.",
    icon: Activity,
    children: [
      {
        href: "/dashboard/digital-performance/seo",
        label: "SEO",
        description: "Rankings, crawl health and content opportunities.",
        icon: Search,
      },
      {
        href: "/dashboard/digital-performance/aieo",
        label: "AIEO",
        description: "Visibility inside AI answers, citations and share of voice.",
        icon: Sparkles,
      },
      {
        href: "/dashboard/digital-performance/digital-marketing",
        label: "Digital Marketing",
        description: "Paid media mix, creative tests and contribution margin.",
        icon: Megaphone,
      },
    ],
  },
  {
    id: "brand-advertising",
    label: "Brand Advertising",
    href: "/dashboard/brand-advertising",
    description: "Physical presence and creator-led brand demand, governed in one place.",
    icon: Building2,
    children: [
      {
        href: "/dashboard/brand-advertising/outdoor",
        label: "Outdoor",
        description: "OOH placements, reach estimates and flighting calendars.",
        icon: Store,
      },
      {
        href: "/dashboard/brand-advertising/influencer-marketing",
        label: "Influencer Marketing",
        description: "Creator partnerships, briefs and brand-safe delivery.",
        icon: Users,
      },
    ],
  },
  {
    id: "internal-tools",
    label: "Internal Tools",
    href: "/dashboard/internal-tools",
    description: "Specialist operators for sales, buying, risk and finance.",
    icon: Handshake,
    children: [
      {
        href: "/dashboard/internal-tools/sales",
        label: "Sales",
        description: "Pipeline hygiene, follow-ups and deal coaching.",
        icon: Handshake,
      },
      {
        href: "/dashboard/internal-tools/procurement",
        label: "Procurement",
        description: "Vendor shortlists, RFQs and purchase controls.",
        icon: ShoppingCart,
      },
      {
        href: "/dashboard/internal-tools/risk-analysing",
        label: "Risk Analysing",
        description: "Exposure, policy breaches and approval gates.",
        icon: ShieldAlert,
      },
      {
        href: "/dashboard/internal-tools/finance",
        label: "Finance",
        description: "Budgets, cash, ROI evidence and spend ceilings.",
        icon: Banknote,
      },
    ],
  },
];

export const settingsNav = {
  href: "/dashboard/settings",
  label: "Settings",
  icon: Settings,
};

export const overviewNav = {
  href: "/command-centre",
  label: "Command centre",
};
