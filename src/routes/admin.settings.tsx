import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-foreground/60">Configure your site</p>
      </div>

      <Tabs defaultValue="pricing" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="cms">Site Content</TabsTrigger>
          <TabsTrigger value="email">Email Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="pricing">
          <PricingTab />
        </TabsContent>
        <TabsContent value="cms">
          <CMSTab />
        </TabsContent>
        <TabsContent value="email">
          <EmailTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PricingTab() {
  const [peakMultiplier, setPeakMultiplier] = useState(20);
  const [minStay, setMinStay] = useState(2);
  const [holidayRate, setHolidayRate] = useState(30);

  const save = () => {
    toast.success("Pricing rules saved");
  };

  return (
    <div className="bg-paper border rounded-xl p-6 space-y-6 max-w-xl">
      <div>
        <h3 className="font-medium mb-1">Peak Season Multiplier</h3>
        <p className="text-xs text-foreground/60 mb-2">Additional % added during peak season (Oct-Feb)</p>
        <div className="flex items-center gap-4">
          <input type="range" min={0} max={100} value={peakMultiplier} onChange={(e) => setPeakMultiplier(Number(e.target.value))}
            className="flex-1 accent-[var(--gold)]" />
          <span className="text-sm font-medium w-12">{peakMultiplier}%</span>
        </div>
      </div>
      <div>
        <h3 className="font-medium mb-1">Minimum Stay (nights)</h3>
        <p className="text-xs text-foreground/60 mb-2">Default minimum booking duration</p>
        <input type="number" value={minStay} onChange={(e) => setMinStay(Number(e.target.value))}
          className="rounded-xl border px-4 py-2 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm w-24" />
      </div>
      <div>
        <h3 className="font-medium mb-1">Holiday Rate Increase</h3>
        <p className="text-xs text-foreground/60 mb-2">Additional % for public holidays</p>
        <div className="flex items-center gap-4">
          <input type="range" min={0} max={100} value={holidayRate} onChange={(e) => setHolidayRate(Number(e.target.value))}
            className="flex-1 accent-[var(--gold)]" />
          <span className="text-sm font-medium w-12">{holidayRate}%</span>
        </div>
      </div>
      <button onClick={save} className="btn-primary text-sm py-2 px-4">Save Pricing Rules</button>
    </div>
  );
}

function CMSTab() {
  const [heroTitle, setHeroTitle] = useState("Pom PentHouse");
  const [heroSubtitle, setHeroSubtitle] = useState("A Lakeside Sanctuary — 180 meters from Phewa Lake");
  const [contactEmail, setContactEmail] = useState("hello@pompenthouse.np");
  const [contactPhone, setContactPhone] = useState("+977 61-XXXXXX");

  const save = () => {
    toast.success("Site content updated");
  };

  return (
    <div className="bg-paper border rounded-xl p-6 space-y-4 max-w-xl">
      <div>
        <label className="text-sm font-medium mb-1 block">Hero Title</label>
        <input value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Hero Subtitle</label>
        <input value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Contact Email</label>
        <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Contact Phone</label>
        <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
      </div>
      <button onClick={save} className="btn-primary text-sm py-2 px-4">Save Content</button>
    </div>
  );
}

function EmailTab() {
  const [templates] = useState([
    { key: "confirmation", label: "Booking Confirmation", subject: "Your Pom PentHouse booking is confirmed", body: "Dear {name},\n\nYour booking at {penthouse} from {checkin} to {checkout} is confirmed.\n\nTotal: ${total}\n\nSee you soon,\nPom PentHouse" },
    { key: "welcome", label: "Welcome Email", subject: "Welcome to Pom PentHouse", body: "Dear {name},\n\nThank you for choosing Pom PentHouse.\n\nWe look forward to hosting you.\n\nBest,\nPom PentHouse" },
    { key: "reminder", label: "Payment Reminder", subject: "Payment reminder for your booking", body: "Dear {name},\n\nThis is a reminder that your payment of ${total} for {penthouse} is due.\n\nPlease complete your booking.\n\nThank you,\nPom PentHouse" },
  ]);
  const [active, setActive] = useState(templates[0]);

  const save = () => {
    toast.success("Email template saved");
  };

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-6">
      <div className="space-y-1">
        {templates.map((t) => (
          <button key={t.key} onClick={() => setActive(t)}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${active.key === t.key ? "bg-primary text-primary-foreground font-medium" : "hover:bg-muted"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="bg-paper border rounded-xl p-6 space-y-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Subject</label>
          <input value={active.subject} onChange={(e) => setActive({ ...active, subject: e.target.value })}
            className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Body</label>
          <textarea rows={10} value={active.body} onChange={(e) => setActive({ ...active, body: e.target.value })}
            className="w-full rounded-xl border px-4 py-3 bg-transparent focus:ring-2 focus:ring-primary outline-none text-sm resize-none font-mono" />
        </div>
        <p className="text-xs text-foreground/40">Available variables: {'{name}'}, {'{penthouse}'}, {'{checkin}'}, {'{checkout}'}, {'{total}'}</p>
        <button onClick={save} className="btn-primary text-sm py-2 px-4">Save Template</button>
      </div>
    </div>
  );
}
