export const marketingUrl = (
  process.env.NEXT_PUBLIC_MARKETING_URL ?? "http://localhost:1618"
).replace(/\/$/, "");
