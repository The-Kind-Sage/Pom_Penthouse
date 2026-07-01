import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://pom-penthouse.vercel.app/sitemap.xml`;

        return new Response(robots, {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        });
      },
    },
  },
});
