import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/pom/PageLayout";
import { Residence } from "@/components/pom/Residence";
import { WhyChoose } from "@/components/pom/WhyChoose";
import { BreadcrumbJsonLd } from "@/components/pom/JsonLd";

export const Route = createFileRoute("/apartments")({
  head: () => ({
    meta: [
      { title: "Luxury Serviced Apartments in Pokhara | 1 BHK, 2 BHK, 3 BHK" },
      { name: "description", content: "Browse luxury serviced apartments in Lakeside, Pokhara. Fully furnished 1 BHK, 2 BHK, 3 BHK and Studio apartments with kitchen, WiFi, parking and mountain views. Book daily, weekly or monthly." },
      { name: "keywords", content: "serviced apartments Pokhara, 1 BHK Pokhara, 2 BHK Lakeside, 3 BHK apartment Pokhara, studio apartment Pokhara, furnished apartment Nepal, luxury apartment Pokhara, monthly rental Pokhara" },
      { property: "og:title", content: "Luxury Serviced Apartments in Pokhara | 1 BHK, 2 BHK, 3 BHK" },
      { property: "og:description", content: "Fully furnished luxury apartments in Lakeside, Pokhara with Phewa Lake views." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pom-penthouse.vercel.app/apartments" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://pom-penthouse.vercel.app/apartments" },
    ],
  }),
  component: ApartmentsPage,
});

function ApartmentsPage() {
  return (
    <PageLayout transparent={false}>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Apartments", url: "/apartments" }]} />
      <div className="pt-24">
        <Residence />
        <WhyChoose />
      </div>
    </PageLayout>
  );
}
