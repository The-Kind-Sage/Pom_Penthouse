import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/pom/PageLayout";
import { About } from "@/components/pom/About";
import { Lifestyle } from "@/components/pom/Lifestyle";
import { Location } from "@/components/pom/Location";
import { LongTerm } from "@/components/pom/LongTerm";
import { FAQ } from "@/components/pom/FAQ";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/pom/JsonLd";

const ABOUT_FAQ = [
  { q: "What is POM'S Penthouse?", a: "POM'S Penthouse is a premium serviced apartment property in Lakeside, Pokhara offering luxury accommodations with hotel comfort and home privacy." },
  { q: "Who is POM'S Penthouse for?", a: "We cater to digital nomads, remote workers, business travelers, families, and anyone looking for a comfortable stay in Pokhara." },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — POM'S Penthouse | Luxury Apartments Pokhara" },
      { name: "description", content: "Discover POM'S Penthouse — premium serviced apartments in Lakeside, Pokhara offering luxury living with stunning Phewa Lake and Annapurna mountain views. Perfect for digital nomads, families and business travelers." },
      { name: "keywords", content: "about POM'S Penthouse, Pokhara luxury apartments, Lakeside Pokhara hotel, serviced apartments Nepal, digital nomad Pokhara, Pokhara accommodation" },
      { property: "og:title", content: "About Us — POM'S Penthouse | Luxury Apartments Pokhara" },
      { property: "og:description", content: "Premium serviced apartments in Lakeside, Pokhara with Phewa Lake views." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://pom-penthouse.vercel.app/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://pom-penthouse.vercel.app/about" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageLayout transparent={false}>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "About", url: "/about" }]} />
      <FAQJsonLd items={ABOUT_FAQ} />
      <div className="pt-32">
        <About />
        <Lifestyle />
        <Location />
        <LongTerm />
        <FAQ />
      </div>
    </PageLayout>
  );
}
