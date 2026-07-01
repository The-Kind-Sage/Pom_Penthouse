import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/pom/PageLayout";
import { Amenities } from "@/components/pom/Amenities";
import { BreadcrumbJsonLd } from "@/components/pom/JsonLd";

export const Route = createFileRoute("/amenities")({
  head: () => ({
    meta: [
      { title: "Premium Amenities — WiFi, Kitchen, Parking | POM'S Penthouse Pokhara" },
      { name: "description", content: "Enjoy premium amenities at POM'S Penthouse — free WiFi, fully equipped kitchen, free parking, laundry, 24/7 security, and housekeeping in Lakeside, Pokhara." },
      { name: "keywords", content: "Pokhara apartment amenities, Lakeside Pokhara facilities, WiFi apartment Pokhara, serviced apartment features Nepal, free parking Pokhara, kitchen apartment Pokhara" },
      { property: "og:title", content: "Premium Amenities — WiFi, Kitchen, Parking | POM'S Penthouse Pokhara" },
      { property: "og:description", content: "Free WiFi, fully equipped kitchen, parking, and more at our Lakeside Pokhara apartments." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pom-penthouse.vercel.app/amenities" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://pom-penthouse.vercel.app/amenities" },
    ],
  }),
  component: AmenitiesPage,
});

function AmenitiesPage() {
  return (
    <PageLayout transparent={false}>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Amenities", url: "/amenities" }]} />
      <div className="pt-32">
        <Amenities />
      </div>
    </PageLayout>
  );
}
