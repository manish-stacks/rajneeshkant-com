"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Loader2,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";
import api from "@/lib/axios";

// "admin@gmail.com" "123456"
export default function AdminLoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await api.post("/auth", { email, password });
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sky-50 flex items-center justify-center px-4 py-10">

      {/* BG BLUR */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-sky-100 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-100 rounded-full blur-3xl opacity-60" />

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.06)]">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex relative flex-col justify-between overflow-hidden bg-gradient-to-br from-sky-500 to-cyan-500 p-10 text-white">

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                <ShieldCheck size={28} />
              </div>

              <div>
                <p className="text-sm text-white/80">
                  Secure Access
                </p>

                <h2 className="text-2xl font-bold">
                  Admin Panel
                </h2>
              </div>
            </div>

            <div className="mt-16">
              <h1 className="text-4xl font-bold leading-tight">
                Welcome Back,
                <br />
                Administrator
              </h1>

              <p className="mt-5 text-white/90 leading-8">
                Login to manage appointments, blogs, treatments,
                patient inquiries and clinic content securely.
              </p>
            </div>
          </div>

          {/* FEATURES */}
          <div className="space-y-4">
            {[
              "Manage Appointments",
              "Update Blogs & Articles",
              "Track Patient Queries",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur px-4 py-3"
              >
                <div className="h-2.5 w-2.5 rounded-full bg-white" />
                <p className="text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>

          {/* CIRCLE */}
          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10" />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-6 md:p-10">

          <div className="w-full max-w-md">

            {/* MOBILE LOGO */}
            <div className="lg:hidden text-center mb-8">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-lg">
                <ShieldCheck size={28} className="text-white" />
              </div>

              <h1 className="mt-5 text-3xl font-bold text-slate-900">
                Admin Login
              </h1>

              <p className="mt-2 text-slate-500">
                Dr. Rajneesh Kant Clinic
              </p>
            </div>

            {/* DESKTOP TITLE */}
            <div className="hidden lg:block mb-8">
              <span className="inline-flex rounded-full bg-sky-50 px-4 py-1 text-xs font-semibold text-sky-600">
                Secure Authentication
              </span>

              <h2 className="mt-4 text-3xl font-bold text-slate-900">
                Login to Dashboard
              </h2>

              <p className="mt-2 text-slate-500">
                Enter your credentials to continue.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none transition-all focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={show ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-sm outline-none transition-all focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {show ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 text-sm font-semibold text-white transition-all hover:shadow-lg disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login to Dashboard"
                )}
              </button>
            </form>

            {/* FOOTER */}
            <p className="mt-8 text-center text-xs leading-6 text-slate-400">
              Protected admin access for authorized clinic staff only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}