"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  CheckCircle,
  MapPin,
  Phone,
  Building2,
} from "lucide-react";
import api from "@/lib/axios";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

const branches = [
  {
    city: "Mumbai",
    address:
      "Aston Building, 704, opposite Bank of Baroda, Lokhandwala Complex, Andheri West, Mumbai, Maharashtra 400053",
    phones: ["+91-9137352377", "+91-8409313131", "+91-9031554875"],
  },
  {
    city: "Patna",
    address:
      "Central Jail, Near Kuswaha Chowk, beside SK Vihar Colony, Kisan Colony, Beur, Patna, Bihar 800002",
    phones: ["+91-9308511357"],
  },
];

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");

    try {
      await api.post("/contact", data);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (err?: string) =>
    `w-full rounded-2xl border bg-white/70 backdrop-blur px-4 py-3.5 text-sm outline-none transition-all duration-300 ${
      err
        ? "border-red-300 bg-red-50"
        : "border-slate-200 focus:border-[#7c3aed] focus:ring-4 focus:ring-violet-100"
    }`;

  if (status === "success") {
    return (
      <div className="rounded-[32px] border border-emerald-100 bg-white p-10 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle size={42} className="text-emerald-500" />
        </div>

        <h3 className="mt-6 text-3xl font-bold text-slate-900">
          Message Sent Successfully
        </h3>

        <p className="mt-3 text-slate-500">
          Our team will contact you shortly regarding your appointment.
        </p>

        <button
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-2xl bg-[#7c3aed] px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-[#6d28d9]"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur border border-white/10">
            <Building2 size={30} className="text-violet-300" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Book Your Appointment
          </h2>

          <div className="mx-auto mt-4 h-1.5 w-28 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />

          <p className="mt-5 text-slate-300 max-w-2xl mx-auto leading-7">
            Fill out the form below and our medical team will contact you for
            consultation and appointment confirmation.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Full Name *
              </label>

              <input
                {...register("name")}
                placeholder="Enter your full name"
                className={inputClass(errors.name?.message)}
              />

              {errors.name && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Email Address *
              </label>

              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className={inputClass(errors.email?.message)}
              />

              {errors.email && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Phone Number
              </label>

              <input
                {...register("phone")}
                placeholder="+91 98765 43210"
                className={inputClass()}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Subject *
              </label>

              <input
                {...register("subject")}
                placeholder="Enter subject"
                className={inputClass(errors.subject?.message)}
              />

              {errors.subject && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.subject.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Message *
            </label>

            <textarea
              {...register("message")}
              rows={5}
              placeholder="Write your message here..."
              className={`${inputClass(
                errors.message?.message
              )} resize-none`}
            />

            {errors.message && (
              <p className="mt-1 text-xs text-red-400">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* ERROR */}
          {status === "error" && (
            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              Failed to send message. Please contact us directly.
            </div>
          )}

          {/* BUTTON */}
          <div className="mt-7 text-center">
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(139,92,246,0.45)] disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Make An Appointment"
              )}
            </button>
          </div>
        </form>

        {/* BRANCHES */}
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="group rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-white/[0.08]"
            >
              {/* City */}
              <h3 className="text-3xl font-bold text-white text-center mb-6">
                {branch.city}
              </h3>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/20 text-violet-300">
                    <MapPin size={20} />
                  </div>

                  <p className="text-slate-300 leading-7 text-sm">
                    {branch.address}
                  </p>
                </div>

                {/* Phones */}
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-fuchsia-500/20 text-fuchsia-300">
                    <Phone size={20} />
                  </div>

                  <div className="space-y-2">
                    {branch.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        className="block text-slate-200 hover:text-violet-300 transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}