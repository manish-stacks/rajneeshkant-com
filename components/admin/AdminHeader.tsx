"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, LogOut, Bell, User } from "lucide-react";
import api from "@/lib/axios";

const TITLES: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/appointments": "Appointments",
  "/admin/blogs": "Blog Posts",
  "/admin/treatments": "Treatments",
  "/admin/gallery": "Gallery",
  "/admin/testimonials": "Testimonials",
  "/admin/messages": "Messages",
  "/admin/settings": "Site Settings",
};

interface HeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState("admin");
  const [unread, setUnread] = useState(0);

  const title =
    TITLES[pathname] ||
    (pathname.startsWith("/admin/blogs") ? "Blog Posts" : "Admin");

  useEffect(() => {
    api
      .get("/auth")
      .then((res) => res.data?.email && setEmail(res.data.email))
      .catch(() => {});

    api
      .get("/contact")
      .then((res) => res.data?.unread != null && setUnread(res.data.unread))
      .catch(() => {});
  }, [pathname]);

  const logout = async () => {
    try {
      await api.delete("/auth");
    } catch {
      /* ignore */
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-base font-bold text-slate-900 md:text-lg">{title}</h1>
          <p className="hidden text-xs text-slate-400 sm:block">
            Dr. Rajneesh Kant Clinic — Management Console
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <a
          href="/admin/messages"
          className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"
          title="Messages"
        >
          <Bell size={19} />
          {unread > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </a>

        <div className="hidden items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-2 pr-3 sm:flex">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-cyan-500">
            <User size={14} className="text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold text-slate-700">{email}</p>
            <p className="text-[10px] text-slate-400">Administrator</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
