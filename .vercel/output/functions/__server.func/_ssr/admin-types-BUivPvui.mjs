//#region node_modules/.nitro/vite/services/ssr/assets/admin-types-BUivPvui.js
var MOCK_PENTHOUSES = [
	{
		id: "p1",
		name: "Pom Penthouse",
		location: "Lakeside Road, Pokhara",
		pricePerNight: 189,
		status: "available",
		image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
		description: "Full 3-bed luxury penthouse with Annapurna views.",
		amenities: [
			"Lake View",
			"WiFi 600mbps",
			"Kitchen",
			"Sonos",
			"AC"
		],
		maxGuests: 6,
		bedrooms: 3,
		bathrooms: 3,
		rules: ["No smoking", "Check-in 3PM"],
		images: [],
		createdAt: "2025-01-01"
	},
	{
		id: "p2",
		name: "Master Suite",
		location: "Lakeside Road, Pokhara",
		pricePerNight: 110,
		status: "available",
		image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&q=80",
		description: "King bed, lake-facing glass, limestone soaking bath.",
		amenities: [
			"Lake View",
			"King Bed",
			"Private Bath",
			"Cedar Closet"
		],
		maxGuests: 2,
		bedrooms: 1,
		bathrooms: 1,
		rules: ["No smoking", "Check-in 3PM"],
		images: [],
		createdAt: "2025-01-01"
	},
	{
		id: "p3",
		name: "Sunset Lounge",
		location: "Lakeside Road, Pokhara",
		pricePerNight: 189,
		status: "maintenance",
		image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
		description: "Low oak sofa, hand-thrown ceramics, vinyl.",
		amenities: [
			"Lake View",
			"Sonos",
			"Bar"
		],
		maxGuests: 4,
		bedrooms: 1,
		bathrooms: 1,
		rules: ["No smoking"],
		images: [],
		createdAt: "2025-02-01"
	},
	{
		id: "p4",
		name: "Rooftop Terrace Suite",
		location: "Lakeside Road, Pokhara",
		pricePerNight: 250,
		status: "available",
		image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&q=80",
		description: "Private rooftop with Annapurna panorama.",
		amenities: [
			"Rooftop",
			"Lake View",
			"Outdoor Dining",
			"Lounge"
		],
		maxGuests: 4,
		bedrooms: 1,
		bathrooms: 1,
		rules: ["No smoking", "No pets"],
		images: [],
		createdAt: "2025-03-01"
	}
];
var MOCK_BOOKINGS = [
	{
		id: "b1",
		penthouseId: "p1",
		penthouseName: "Pom Penthouse",
		guestName: "John Doe",
		guestEmail: "john@example.com",
		checkIn: "2026-07-01",
		checkOut: "2026-07-05",
		nights: 4,
		total: 756,
		status: "confirmed",
		paymentStatus: "paid",
		guests: 2,
		createdAt: "2026-06-15"
	},
	{
		id: "b2",
		penthouseId: "p2",
		penthouseName: "Master Suite",
		guestName: "Jane Smith",
		guestEmail: "jane@example.com",
		checkIn: "2026-07-10",
		checkOut: "2026-07-13",
		nights: 3,
		total: 330,
		status: "pending",
		paymentStatus: "unpaid",
		guests: 1,
		createdAt: "2026-06-18"
	},
	{
		id: "b3",
		penthouseId: "p1",
		penthouseName: "Pom Penthouse",
		guestName: "Alice Wang",
		guestEmail: "alice@example.com",
		checkIn: "2026-08-01",
		checkOut: "2026-08-07",
		nights: 6,
		total: 1134,
		status: "confirmed",
		paymentStatus: "paid",
		guests: 4,
		createdAt: "2026-06-20"
	},
	{
		id: "b4",
		penthouseId: "p4",
		penthouseName: "Rooftop Terrace Suite",
		guestName: "Bob Chen",
		guestEmail: "bob@example.com",
		checkIn: "2026-07-15",
		checkOut: "2026-07-18",
		nights: 3,
		total: 750,
		status: "pending",
		paymentStatus: "unpaid",
		guests: 2,
		createdAt: "2026-06-22"
	},
	{
		id: "b5",
		penthouseId: "p3",
		penthouseName: "Sunset Lounge",
		guestName: "Maria Garcia",
		guestEmail: "maria@example.com",
		checkIn: "2026-06-25",
		checkOut: "2026-06-28",
		nights: 3,
		total: 567,
		status: "completed",
		paymentStatus: "paid",
		guests: 2,
		createdAt: "2026-06-10"
	}
];
var MOCK_USERS = [
	{
		id: "u1",
		name: "John Doe",
		email: "john@example.com",
		role: "guest",
		bookingCount: 3,
		lifetimeSpend: 1890,
		createdAt: "2026-01-15",
		banned: false
	},
	{
		id: "u2",
		name: "Jane Smith",
		email: "jane@example.com",
		role: "guest",
		bookingCount: 1,
		lifetimeSpend: 330,
		createdAt: "2026-03-10",
		banned: false
	},
	{
		id: "u3",
		name: "Alice Wang",
		email: "alice@example.com",
		role: "guest",
		bookingCount: 5,
		lifetimeSpend: 4200,
		createdAt: "2025-11-20",
		banned: false
	},
	{
		id: "u4",
		name: "Admin User",
		email: "admin@pompenthouse.np",
		role: "admin",
		bookingCount: 0,
		lifetimeSpend: 0,
		createdAt: "2025-01-01",
		banned: false
	},
	{
		id: "u5",
		name: "Staff One",
		email: "staff@pompenthouse.np",
		role: "staff",
		bookingCount: 0,
		lifetimeSpend: 0,
		createdAt: "2026-02-01",
		banned: false
	}
];
var MOCK_ACTIVITIES = [
	{
		id: "a1",
		action: "New Booking",
		detail: "Pom Penthouse booked by John Doe",
		time: "2 min ago",
		type: "booking"
	},
	{
		id: "a2",
		action: "Payment Received",
		detail: "$756 received for booking #b1",
		time: "15 min ago",
		type: "payment"
	},
	{
		id: "a3",
		action: "New Review",
		detail: "5-star review for Master Suite",
		time: "1 hour ago",
		type: "review"
	},
	{
		id: "a4",
		action: "User Registered",
		detail: "New account: Bob Chen",
		time: "3 hours ago",
		type: "user"
	},
	{
		id: "a5",
		action: "Booking Modified",
		detail: "Alice Wang changed check-in date",
		time: "5 hours ago",
		type: "booking"
	},
	{
		id: "a6",
		action: "Review Flagged",
		detail: "Review for Sunset Lounge flagged",
		time: "1 day ago",
		type: "review"
	}
];
var MONTHLY_REVENUE = [
	{
		month: "Jan",
		revenue: 4200,
		bookings: 8
	},
	{
		month: "Feb",
		revenue: 3800,
		bookings: 6
	},
	{
		month: "Mar",
		revenue: 5100,
		bookings: 10
	},
	{
		month: "Apr",
		revenue: 4800,
		bookings: 9
	},
	{
		month: "May",
		revenue: 6200,
		bookings: 12
	},
	{
		month: "Jun",
		revenue: 5900,
		bookings: 11
	},
	{
		month: "Jul",
		revenue: 7200,
		bookings: 14
	},
	{
		month: "Aug",
		revenue: 8100,
		bookings: 16
	},
	{
		month: "Sep",
		revenue: 6800,
		bookings: 13
	},
	{
		month: "Oct",
		revenue: 5500,
		bookings: 10
	},
	{
		month: "Nov",
		revenue: 4700,
		bookings: 7
	},
	{
		month: "Dec",
		revenue: 9100,
		bookings: 18
	}
];
//#endregion
export { MONTHLY_REVENUE as a, MOCK_USERS as i, MOCK_BOOKINGS as n, MOCK_PENTHOUSES as r, MOCK_ACTIVITIES as t };
