"use client";
import type { Metadata } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
} from "lucide-react";

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
    phones: ["+91-9137352377", "+91-8409313131"],
  },
  {
    city: "Patna",
    address:
      "Central Jail, Near Kuswaha Chowk, beside SK Vihar Colony, Kisan Colony, Beur, Patna, Bihar 800002",
    phones: ["+91-9308511357"],
  },
];

// export const metadata: Metadata = {
//   title: "Contact Dr. Rajneesh Kant",
//   description:
//     "Expert health articles by Dr. Rajneesh Kant. Read about back pain, chiropractic care, physiotherapy, sciatica, sports injuries and more.",
// };
export default function ContactPage() {
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass = (err?: string) =>
    `w-full rounded-2xl border bg-white px-4 py-3.5 text-sm outline-none transition-all duration-300 ${err
      ? "border-red-300 bg-red-50"
      : "border-slate-200 focus:border-[#0ea5e9] focus:ring-4 focus:ring-sky-100"
    }`;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white pt-28 pb-16">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-sky-100 blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-100 blur-3xl opacity-60" />

        <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-sky-100 bg-sky-50 px-4 py-1 text-sm font-semibold text-sky-600 mb-5">
            Contact Our Clinic
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Book Your
            <span className="text-sky-500"> Appointment</span>
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Reach out for consultation, physiotherapy, chiropractic care,
            rehabilitation, and personalized treatment guidance.
          </p>
        </div>
      </section>

      {/* MAIN */}
      <section className="relative bg-white py-10 lg:py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-7 lg:grid-cols-[1fr_340px]">

            {/* LEFT SIDE */}
            <div>
              {/* FORM CARD */}
              <div className="rounded-[26px] border border-slate-200 bg-white p-5 md:p-7 shadow-[0_8px_40px_rgba(0,0,0,0.04)]">

                {/* TOP */}
                <div className="flex items-start justify-between gap-4 mb-7">
                  <div>
                    <span className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">
                      Appointment Form
                    </span>

                    <h2 className="mt-3 text-2xl md:text-3xl font-bold text-slate-900">
                      Send Us A Message
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500 max-w-xl">
                      Fill in your details and our medical team will contact you shortly.
                    </p>
                  </div>

                  <div className="hidden md:flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">
                    <Mail size={26} className="text-sky-600" />
                  </div>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Full Name *
                      </label>

                      <input
                        {...register("name")}
                        placeholder="Enter your full name"
                        className={inputClass(errors.name?.message)}
                      />

                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Email Address *
                      </label>

                      <input
                        type="email"
                        {...register("email")}
                        placeholder="you@example.com"
                        className={inputClass(errors.email?.message)}
                      />

                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Phone Number
                      </label>

                      <input
                        {...register("phone")}
                        placeholder="+91 98765 43210"
                        className={inputClass()}
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">
                        Subject *
                      </label>

                      <input
                        {...register("subject")}
                        placeholder="Appointment / Consultation"
                        className={inputClass(errors.subject?.message)}
                      />

                      {errors.subject && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Message *
                    </label>

                    <textarea
                      {...register("message")}
                      rows={5}
                      placeholder="Tell us about your condition..."
                      className={`${inputClass(
                        errors.message?.message
                      )} resize-none`}
                    />

                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* ERROR */}
                  {status === "error" && (
                    <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                      Failed to send message. Please contact us directly.
                    </div>
                  )}

                  {/* SUCCESS */}
                  {status === "success" && (
                    <div className="mt-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
                      Message sent successfully.
                    </div>
                  )}

                  {/* BUTTON */}
                  <div className="mt-5">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-600 disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Make Appointment
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* BRANCHES */}
              <div className="grid gap-5 md:grid-cols-2 mt-6">
                {branches.map((branch, index) => (
                  <div
                    key={index}
                    className="rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    {/* TOP */}
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-2xl font-bold text-slate-900">
                        {branch.city}
                      </h3>

                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
                        <MapPin size={20} />
                      </div>
                    </div>

                    {/* ADDRESS */}
                    <p className="text-sm leading-6 text-slate-600">
                      {branch.address}
                    </p>

                    {/* PHONE */}
                    <div className="mt-5 space-y-3">
                      {branch.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone}`}
                          className="flex items-center gap-3 text-sm text-slate-700 transition-colors hover:text-sky-600"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                            <Phone size={15} />
                          </div>

                          <span className="font-medium">{phone}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-5">
              {/* QUICK CONTACT */}
              <div className="rounded-[26px] border border-slate-200 bg-gradient-to-br from-sky-500 to-cyan-500 p-6 text-white shadow-lg">
                <h3 className="text-xl font-bold">
                  Need Immediate Help?
                </h3>

                <p className="mt-2 text-sm leading-6 text-white/90">
                  Contact us directly for emergency consultation or appointment support.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                      <Phone size={18} />
                    </div>

                    <div>
                      <p className="text-xs text-white/80">Call Us</p>
                      <p className="text-sm font-semibold">
                        +91-9308511357
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                      <Mail size={18} />
                    </div>

                    <div>
                      <p className="text-xs text-white/80">Email</p>
                      <p className="text-sm font-semibold">
                        rajnish8989@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                      <Clock size={18} />
                    </div>

                    <div>
                      <p className="text-xs text-white/80">
                        Working Hours
                      </p>
                      <p className="text-sm font-semibold">
                        Mon - Sat : 9AM - 7PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MAP */}
              <div className="overflow-hidden rounded-[26px] border border-slate-200 shadow-sm h-[270px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.2603760444376!2d72.82600839999998!3d19.1373902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b73d0ff983c9%3A0xccf5d3ec82864c0e!2sDr.Rajneesh%20kant!5e0!3m2!1sen!2sin!4v1778501111915!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="border-0"
                />
              </div>
              <div className="overflow-hidden rounded-[26px] border border-slate-200 shadow-sm h-[270px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.764684870925!2d85.1019907!3d25.579494500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2a999e11be2a7%3A0x8c4a7845d1e3f087!2sDr.Rajneesh%20kant!5e0!3m2!1sen!2sin!4v1778501157274!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}