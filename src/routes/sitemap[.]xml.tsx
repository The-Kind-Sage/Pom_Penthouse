import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const baseUrl = "https://pom-penthouse.vercel.app";
        const pages = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/apartments", changefreq: "weekly", priority: "0.9" },
          { path: "/rooms", changefreq: "weekly", priority: "0.9" },
          { path: "/amenities", changefreq: "monthly", priority: "0.8" },
          { path: "/gallery", changefreq: "monthly", priority: "0.8" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/contact", changefreq: "monthly", priority: "0.7" },
        ];

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pages.map((p) => `  <url>
    <loc>${baseUrl}${p.path}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

        return new Response(xml, {
          status: 200,
          headers: { "Content-Type": "application/xml" },
        });
      },
    },
  },
});
