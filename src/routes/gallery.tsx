import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/pom/PageLayout";
import { Gallery } from "@/components/pom/Gallery";
import { BreadcrumbJsonLd } from "@/components/pom/JsonLd";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Photo Gallery — POM'S Penthouse Luxury Apartments Pokhara" },
      { name: "description", content: "Explore photos of POM'S Penthouse luxury serviced apartments, rooms, amenities, and stunning views of Phewa Lake and Annapurna mountains in Lakeside, Pokhara." },
      { name: "keywords", content: "POM'S Penthouse photos, Pokhara apartment gallery, Lakeside Pokhara images, Phewa Lake view apartment, Pokhara hotel photos, luxury apartment Pokhara images" },
      { property: "og:title", content: "Photo Gallery — POM'S Penthouse Luxury Apartments Pokhara" },
      { property: "og:description", content: "View photos of our luxury apartments, rooms, and stunning Pokhara views." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pom-penthouse.vercel.app/gallery" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://pom-penthouse.vercel.app/gallery" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <PageLayout transparent={false}>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Gallery", url: "/gallery" }]} />
      <div className="pt-32">
        <Gallery />
      </div>
    </PageLayout>
  );
}
