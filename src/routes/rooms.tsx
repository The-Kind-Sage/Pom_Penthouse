import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/pom/PageLayout";
import { Rooms } from "@/components/pom/Rooms";
import { BreadcrumbJsonLd } from "@/components/pom/JsonLd";

export const Route = createFileRoute("/rooms")({
  head: () => ({
    meta: [
      { title: "Hotel Rooms in Lakeside Pokhara | Single, Double, Twin Bed" },
      { name: "description", content: "Comfortable hotel rooms in Lakeside, Pokhara. Single bed, double bed, and twin bed rooms with modern amenities, free WiFi, and Phewa Lake views. Book your stay today." },
      { name: "keywords", content: "hotel rooms Pokhara, Lakeside Pokhara rooms, single bed room Pokhara, double bed room Pokhara, twin bed room Pokhara, budget hotel Pokhara, luxury room Pokhara" },
      { property: "og:title", content: "Hotel Rooms in Lakeside Pokhara | Single, Double, Twin Bed" },
      { property: "og:description", content: "Comfortable rooms in Lakeside, Pokhara with modern amenities and mountain views." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pom-penthouse.vercel.app/rooms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://pom-penthouse.vercel.app/rooms" },
    ],
  }),
  component: RoomsPage,
});

function RoomsPage() {
  return (
    <PageLayout transparent={false}>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Rooms", url: "/rooms" }]} />
      <div className="pt-32">
        <Rooms />
      </div>
    </PageLayout>
  );
}
