import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, DollarSign, CalendarCheck, Percent, MessageCircle } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { MONTHLY_REVENUE, MOCK_ACTIVITIES } from "@/lib/admin-types";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

const metrics = [
  { label: "Total Revenue", value: "$68,400", trend: "+12.5%", up: true, icon: DollarSign, color: "text-emerald-500" },
  { label: "Active Bookings", value: "12", trend: "+3 this week", up: true, icon: CalendarCheck, color: "text-blue-500" },
  { label: "Occupancy Rate", value: "78%", trend: "+5.2%", up: true, icon: Percent, color: "text-amber-500" },
  { label: "Pending Inquiries", value: "4", trend: "-2", up: false, icon: MessageCircle, color: "text-rose-500" },
];

function MetricCard({ label, value, trend, up, icon: Icon, color }: typeof metrics[0]) {
  return (
    <div className="bg-paper border rounded-xl p-5 flex items-start justify-between">
      <div>
        <p className="text-sm text-foreground/60">{label}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        <span className={`inline-flex items-center gap-1 text-xs mt-2 ${up ? "text-emerald-600" : "text-rose-500"}`}>
          {up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trend}
        </span>
      </div>
      <div className={`p-3 rounded-xl bg-muted ${color}`}>
        <Icon size={22} />
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-foreground/60">Overview of your penthouse business</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => <MetricCard key={m.label} {...m} />)}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-paper border rounded-xl p-5">
          <h3 className="font-medium mb-4">Revenue Over Time</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_REVENUE}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--gold)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--border)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--border)" tickFormatter={(v) => `$${v}`} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--gold)" fill="url(#revGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-paper border rounded-xl p-5">
          <h3 className="font-medium mb-4">Monthly Bookings</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_REVENUE}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="var(--border)" />
                <YAxis tick={{ fontSize: 12 }} stroke="var(--border)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Bar dataKey="bookings" fill="var(--gold)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-paper border rounded-xl p-5">
        <h3 className="font-medium mb-4">Recent Activity</h3>
        <div className="space-y-0 divide-y">
          {MOCK_ACTIVITIES.map((a) => (
            <div key={a.id} className="flex items-start gap-3 py-3">
              <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                a.type === "booking" ? "bg-blue-500" : a.type === "payment" ? "bg-emerald-500" : a.type === "review" ? "bg-amber-500" : "bg-purple-500"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{a.action}</p>
                <p className="text-xs text-foreground/60">{a.detail}</p>
              </div>
              <span className="text-xs text-foreground/40 shrink-0">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
