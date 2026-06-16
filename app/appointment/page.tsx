import type { Metadata } from "next";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description:
    "Book a consultation with Dr. Rajneesh Kant. Expert chiropractic and physiotherapy care in Mumbai. Fill the form or call +91-9308511357.",
};

export default function AppointmentPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 text-center max-w-3xl mx-auto">
          <p className="text-brand-teal font-semibold text-sm uppercase tracking-wider mb-3">
            Consultation
          </p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Appointment
          </h1>
          <p className="text-gray-600 text-lg">
            Take the first step toward a pain-free life. Fill the form below or
            call us directly to schedule your consultation.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-heading text-xl font-bold text-gray-900 mb-5">
                  Get in Touch
                </h2>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Phone</p>
                      <a href="tel:9308511357" className="text-brand-blue text-sm hover:underline">+91-9308511357</a>
                      <br />
                      <a href="tel:9137352377" className="text-brand-blue text-sm hover:underline">+91-9137352377</a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Email</p>
                      <a href="mailto:rajnish8989@gmail.com" className="text-brand-blue text-sm hover:underline">
                        rajnish8989@gmail.com
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Location</p>
                      <p className="text-gray-500 text-sm">Spine Clinic, Mumbai, Maharashtra, India</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">Hours</p>
                      <p className="text-gray-500 text-sm">Mon–Sat: 9:00 AM – 7:00 PM</p>
                      <p className="text-gray-500 text-sm">Sunday: By appointment</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-brand-blue/5 rounded-2xl p-5 border border-brand-blue/10">
                <h3 className="font-heading font-semibold text-gray-900 mb-2 text-sm">Home Visit Available</h3>
                <p className="text-gray-500 text-sm">
                  On-call therapist available for home visits. Call us to enquire about home physiotherapy services.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <AppointmentForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
