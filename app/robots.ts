import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/", "/profile"],
      },
    ],
    sitemap: "https://srisri.com/sitemap.xml",
  };
}
