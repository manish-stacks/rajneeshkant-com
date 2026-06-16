"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  FileText,
  Inbox,
  Stethoscope,
  Images,
  Star,
  Clock,
  ArrowUpRight,
  PlusCircle,
} from "lucide-react";
import { Card, LoadingState, Badge } from "@/components/admin/ui";
import api from "@/lib/axios";

interface Stats {
  appointments: number;
  pendingAppointments: number;
  blogs: number;
  publishedBlogs: number;
  contacts: number;
  unreadContacts: number;
  treatments: number;
  gallery: number;
  testimonials: number;
}

interface RecentAppt {
  _id: string;
  name: string;
  treatment?: string;
  date: string;
  status: string;
  createdAt: string;
}

const statusColor: Record<string, "amber" | "blue" | "green" | "rose"> = {
  pending: "amber",
  confirmed: "blue",
  completed: "green",
  cancelled: "rose",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentAppt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/stats")
      .then((res) => {
        const d = res.data;
        if (d.stats) setStats(d.stats);
        if (d.recentAppointments) setRecent(d.recentAppointments);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingState message="Loading dashboard..." />;

  const tiles = stats
    ? [
        {
          label: "Appointments",
          value: stats.appointments,
          sub: `${stats.pendingAppointments} pending`,
          icon: CalendarCheck,
          href: "/admin/appointments",
          grad: "from-sky-500 to-blue-500",
        },
        {
          label: "Blog Posts",
          value: stats.blogs,
          sub: `${stats.publishedBlogs} published`,
          icon: FileText,
          href: "/admin/blogs",
          grad: "from-teal-500 to-emerald-500",
        },
        {
          label: "Messages",
          value: stats.contacts,
          sub: `${stats.unreadContacts} unread`,
          icon: Inbox,
          href: "/admin/messages",
          grad: "from-violet-500 to-purple-500",
        },
        {
          label: "Treatments",
          value: stats.treatments,
          sub: "active services",
          icon: Stethoscope,
          href: "/admin/treatments",
          grad: "from-amber-500 to-orange-500",
        },
        {
          label: "Gallery Images",
          value: stats.gallery,
          sub: "live photos",
          icon: Images,
          href: "/admin/gallery",
          grad: "from-rose-500 to-pink-500",
        },
        {
          label: "Testimonials",
          value: stats.testimonials,
          sub: "patient reviews",
          icon: Star,
          href: "/admin/testimonials",
          grad: "from-cyan-500 to-sky-500",
        },
      ]
    : [];

  const quickActions = [
    { href: "/admin/blogs", label: "Write a Blog Post", icon: FileText },
    { href: "/admin/treatments", label: "Add a Treatment", icon: Stethoscope },
    { href: "/admin/gallery", label: "Upload Gallery Image", icon: Images },
    { href: "/admin/settings", label: "Edit Site Settings", icon: PlusCircle },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome strip */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-500 p-6 text-white md:p-8">
        <p className="text-sm text-white/80">Welcome back 👋</p>
        <h2 className="mt-1 text-2xl font-bold">Clinic Management Console</h2>
        <p className="mt-2 max-w-xl text-sm text-white/90">
          Manage appointments, blogs, treatments, gallery, testimonials and your
          website content — all from one place.
        </p>
      </div>

      {/* Stat tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {tiles.map((t) => {
          const Icon = t.icon;
          return (
            <Link key={t.label} href={t.href}>
              <Card className="group p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${t.grad}`}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-slate-300 transition-colors group-hover:text-sky-500"
                  />
                </div>
                <p className="mt-4 text-2xl font-bold text-slate-900">
                  {t.value}
                </p>
                <p className="text-sm font-medium text-slate-600">{t.label}</p>
                <p className="mt-0.5 text-xs text-slate-400">{t.sub}</p>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent appointments */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <h3 className="font-bold text-slate-900">Recent Appointments</h3>
            <Link
              href="/admin/appointments"
              className="text-xs font-semibold text-sky-600 hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recent.length === 0 ? (
              <p className="px-6 py-10 text-center text-sm text-slate-400">
                No appointments yet.
              </p>
            ) : (
              recent.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-6 py-3.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {a.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {a.treatment || "General consultation"} ·{" "}
                      {new Date(a.date).toDateString()}
                    </p>
                  </div>
                  <Badge color={statusColor[a.status] || "slate"}>
                    {a.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Quick actions */}
        <Card>
          <div className="border-b border-slate-100 px-6 py-4">
            <h3 className="font-bold text-slate-900">Quick Actions</h3>
          </div>
          <div className="space-y-1.5 p-4">
            {quickActions.map((q) => {
              const Icon = q.icon;
              return (
                <Link
                  key={q.label}
                  href={q.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-700"
                >
                  <Icon size={16} className="text-slate-400" />
                  {q.label}
                </Link>
              );
            })}
          </div>
          <div className="border-t border-slate-100 px-6 py-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Clock size={13} />
              System running on Next.js 14 · MongoDB
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
