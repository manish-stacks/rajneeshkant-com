"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  Stethoscope,
  Images,
  Star,
  Inbox,
  Settings,
  Globe,
  X,
  Activity,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: "Overview",
    items: [
      { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    section: "Manage",
    items: [
      { href: "/admin/appointments", label: "Appointments", icon: CalendarCheck },
      { href: "/admin/blogs", label: "Blog Posts", icon: FileText },
      { href: "/admin/treatments", label: "Treatments", icon: Stethoscope },
      { href: "/admin/gallery", label: "Gallery", icon: Images },
      { href: "/admin/testimonials", label: "Testimonials", icon: Star },
      { href: "/admin/messages", label: "Messages", icon: Inbox },
    ],
  },
  {
    section: "Configuration",
    items: [
      { href: "/admin/pages", label: "Content Pages", icon: FileText },
      { href: "/admin/settings", label: "Site Settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 z-40 flex h-screen w-[260px] shrink-0 flex-col
          border-r border-slate-200 bg-white transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Link href="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-sm">
              <Activity size={18} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-slate-900">Dr. Rajneesh Kant</p>
              <p className="text-[11px] text-slate-400">Admin Panel</p>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {NAV.map((group) => (
            <div key={group.section} className="mb-6">
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {group.section}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all
                        ${
                          active
                            ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-sm shadow-sky-200"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                    >
                      <Icon
                        size={18}
                        className={active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}
                      />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer link */}
        <div className="border-t border-slate-100 p-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            <Globe size={18} className="text-slate-400" />
            View Live Website
          </a>
        </div>
      </aside>
    </>
  );
}
