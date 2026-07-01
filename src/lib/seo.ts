export const SITE = {
  name: "POM'S Penthouse",
  url: "https://pom-penthouse.vercel.app",
  logo: "https://pom-penthouse.vercel.app/favicon/logo.png",
  description: "Premium serviced apartments in Lakeside, Pokhara. Daily, weekly and monthly stays with hotel comfort and home privacy — overlooking Phewa Lake and the Annapurnas.",
  phone: "+9779840814142",
  email: "stay@pomspenthouse.com",
  address: {
    street: "Lakeside",
    city: "Pokhara",
    region: "Gandaki",
    country: "NP",
    postal: "33700",
  },
  geo: {
    latitude: 28.2096,
    longitude: 83.9856,
  },
  social: {
    facebook: "https://www.facebook.com/poms.penthouse",
    instagram: "https://www.instagram.com/poms_penthouse",
  },
};

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogImage?: string;
}

export const PAGES: Record<string, PageSEO> = {
  home: {
    title: "POM'S Penthouse — Luxury Serviced Apartments in Lakeside, Pokhara",
    description: "Premium serviced apartments in Lakeside, Pokhara. Daily, weekly and monthly stays with hotel comfort and home privacy — overlooking Phewa Lake and the Annapurnas.",
    keywords: "Pokhara serviced apartments, Lakeside Pokhara accommodation, luxury apartments Nepal, Phewa Lake stay, long-term rental Pokhara, digital nomad Pokhara, penthouse Pokhara",
    canonical: "/",
  },
  about: {
    title: "About Us — POM'S Penthouse | Luxury Apartments Pokhara",
    description: "Discover POM'S Penthouse — premium serviced apartments in Lakeside, Pokhara offering luxury living with stunning Phewa Lake and Annapurna mountain views.",
    keywords: "about POM'S Penthouse, Pokhara luxury apartments, Lakeside Pokhara hotel, serviced apartments Nepal",
    canonical: "/about",
  },
  apartments: {
    title: "Luxury Serviced Apartments in Pokhara | 1 BHK, 2 BHK, 3 BHK",
    description: "Browse luxury serviced apartments in Lakeside, Pokhara. Fully furnished 1 BHK, 2 BHK, 3 BHK and Studio apartments with kitchen, WiFi and mountain views.",
    keywords: "serviced apartments Pokhara, 1 BHK Pokhara, 2 BHK Lakeside, 3 BHK apartment Pokhara, studio apartment Pokhara, furnished apartment Nepal",
    canonical: "/apartments",
  },
  rooms: {
    title: "Hotel Rooms in Lakeside Pokhara | Single, Double, Twin Bed",
    description: "Comfortable hotel rooms in Lakeside, Pokhara. Single bed, double bed, and twin bed options with modern amenities and Phewa Lake views.",
    keywords: "hotel rooms Pokhara, Lakeside Pokhara rooms, single bed room Pokhara, double bed room Pokhara, twin bed room Pokhara",
    canonical: "/rooms",
  },
  amenities: {
    title: "Premium Amenities — WiFi, Kitchen, Parking | POM'S Penthouse Pokhara",
    description: "Enjoy premium amenities at POM'S Penthouse — free WiFi, fully equipped kitchen, parking, laundry, and 24/7 security in Lakeside, Pokhara.",
    keywords: "Pokhara apartment amenities, Lakeside Pokhara facilities, WiFi apartment Pokhara, serviced apartment features Nepal",
    canonical: "/amenities",
  },
  gallery: {
    title: "Photo Gallery — POM'S Penthouse Luxury Apartments Pokhara",
    description: "Explore photos of POM'S Penthouse luxury serviced apartments, rooms, amenities, and stunning views of Phewa Lake and Annapurna mountains.",
    keywords: "POM'S Penthouse photos, Pokhara apartment gallery, Lakeside Pokhara images, Phewa Lake view apartment",
    canonical: "/gallery",
  },
  contact: {
    title: "Contact Us — Book Your Stay | POM'S Penthouse Pokhara",
    description: "Contact POM'S Penthouse for bookings and inquiries. Located in Lakeside, Pokhara. Call +977 984-081-4142 or WhatsApp us.",
    keywords: "contact POM'S Penthouse, book apartment Pokhara, Lakeside Pokhara booking, Pokhara accommodation contact",
    canonical: "/contact",
  },
};
