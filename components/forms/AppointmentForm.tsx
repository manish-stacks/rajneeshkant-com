"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, Loader2, CheckCircle } from "lucide-react";
import { treatments as fallbackTreatments } from "@/lib/data";
import api from "@/lib/axios";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email address"),
  treatment: z.string().optional(),
  date: z.string().min(1, "Please select a preferred date"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function AppointmentForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [treatments, setTreatments] = useState<{ slug: string; name: string }[]>(
    fallbackTreatments as { slug: string; name: string }[]
  );

  useEffect(() => {
    api
      .get("/treatments")
      .then((res) => {
        if (res.data.treatments && res.data.treatments.length > 0)
          setTreatments(res.data.treatments);
      })
      .catch(() => {});
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      await api.post("/appointments", data);
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please call us directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
          Appointment Requested!
        </h3>
        <p className="text-gray-600 mb-6">
          Thank you! We&apos;ll contact you within 24 hours to confirm your appointment.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="px-6 py-2.5 bg-brand-blue text-white rounded-xl font-medium hover:bg-brand-blue-dark transition-colors"
        >
          Book Another
        </button>
      </div>
    );
  }

  const fieldClass = (error?: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors ${
      error
        ? "border-red-300 focus:border-red-400 bg-red-50"
        : "border-gray-200 focus:border-brand-blue bg-white"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
      <h2 className="font-heading text-xl font-bold text-gray-900 mb-6">Request an Appointment</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("name")}
            placeholder="John Doe"
            className={fieldClass(errors.name?.message)}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register("phone")}
            placeholder="+91 98765 43210"
            className={fieldClass(errors.phone?.message)}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="john@example.com"
            className={fieldClass(errors.email?.message)}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Treatment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Treatment Required
          </label>
          <select
            {...register("treatment")}
            className={fieldClass()}
          >
            <option value="">Select treatment (optional)</option>
            {treatments.map((t) => (
              <option key={t.slug} value={t.name}>{t.name}</option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Preferred Date <span className="text-red-500">*</span>
          </label>
          <input
            {...register("date")}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className={fieldClass(errors.date?.message)}
          />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Additional Message
          </label>
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Describe your symptoms or any additional information..."
            className={`${fieldClass()} resize-none`}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm mt-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 w-full py-3.5 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Submitting...
          </>
        ) : (
          "Book Appointment"
        )}
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        We&apos;ll confirm your appointment within 24 hours.
      </p>
    </form>
  );
}
