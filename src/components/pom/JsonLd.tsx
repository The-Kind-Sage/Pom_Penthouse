import { SITE } from "@/lib/seo";

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    logo: SITE.logo,
    image: SITE.logo,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
      postalCode: SITE.address.postal,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    sameAs: [SITE.social.facebook, SITE.social.instagram],
    priceRange: "$$",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Parking", value: true },
      { "@type": "LocationFeatureSpecification", name: "Kitchen", value: true },
      { "@type": "LocationFeatureSpecification", name: "Lake View", value: true },
      { "@type": "LocationFeatureSpecification", name: "Mountain View", value: true },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "120",
      bestRating: "5",
    },
    hasMap: "https://www.google.com/maps/place/Lakeside,+Pokhara",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: SITE.logo,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function FAQJsonLd({ items }: { items: { q: string; a: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ApartmentJsonLd({ name, price, guests, bedrooms }: { name: string; price: string; guests: number; bedrooms: number }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${name} — POM'S Penthouse Pokhara`,
    description: `${name} luxury serviced apartment in Lakeside, Pokhara. ${bedrooms} bedroom${bedrooms > 1 ? "s" : ""}, up to ${guests} guests.`,
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: price.replace(/[^0-9.]/g, ""),
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/apartments`,
    },
    image: SITE.logo,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
