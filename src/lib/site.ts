export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://mohamedali-delta.vercel.app").replace(/\/$/, ""),
  email: "midoaliii927@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhamed1ali",
  github: "https://github.com/mohumedali",
  whatsapp: {
    number: "201147886551", // international format, no "+" — what wa.me expects
    display: "+20 114 788 6551",
  },
  websitesDelivered: 20,
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || undefined,
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp.number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
