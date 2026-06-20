import { createFileRoute } from "@tanstack/react-router";
import { MONTHLY_REVENUE } from "@/lib/admin-types";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  component: AnalyticsPage,
});

const COLORS = ["#C9A86C", "#3A6B7C", "#E8DCC6", "#1A1A1A"];

const occupancyData = [
  { name: "Pom Penthouse", occupancy: 82 },
  { name: "Master Suite", occupancy: 68 },
  { name: "Sunset Lounge", occupancy: 45 },
  { name: "Rooftop Terrace", occupancy: 74 },
];

const pieData = [
  { name: "Accommodation", value: 65 },
  { name: "Add-ons", value: 20 },
  { name: "Cleaning", value: 10 },
  { name: "Service Fee", value: 5 },
];

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-foreground/60">Deep dive into performance metrics</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-paper border rounded-xl p-5">
          <h3 className="font-medium mb-4">Revenue Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONTHLY_REVENUE}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--border)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--border)" tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Line type="monotone" dataKey="revenue" stroke="var(--gold)" strokeWidth={2} dot={{ fill: "var(--gold)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-paper border rounded-xl p-5">
          <h3 className="font-medium mb-4">Occupancy by Property</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={occupancyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="var(--border)" unit="%" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="var(--border)" width={100} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="occupancy" fill="var(--gold)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-paper border rounded-xl p-5">
          <h3 className="font-medium mb-4">Revenue Breakdown</h3>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 text-xs">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                  <span>{d.name}: {d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-paper border rounded-xl p-5">
          <h3 className="font-medium mb-4">Monthly Bookings</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_REVENUE}>
                <defs>
                  <linearGradient id="bookGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3A6B7C" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3A6B7C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--border)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--border)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="bookings" stroke="#3A6B7C" fill="url(#bookGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
