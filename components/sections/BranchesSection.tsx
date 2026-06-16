"use client";

import {
  MapPin,
  Phone,
  Clock,
} from "lucide-react";

export default function BranchesSection() {
  return (
    <section className="py-14 lg:py-20 bg-[#f8fcfc]">

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADING */}
        <div className="text-center mb-10 lg:mb-12">

          <p className="text-[#11bfd0] uppercase tracking-[3px] text-xs sm:text-sm font-semibold mb-3">
            Our Branches
          </p>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b1f3a] mb-4">
            Visit Our Clinic Branches
          </h2>

          <p className="max-w-2xl mx-auto text-gray-600 text-[15px] leading-7">
            Experience advanced chiropractic and physiotherapy
            treatment at our modern clinic branches with expert
            care and patient-focused rehabilitation services.
          </p>
        </div>

        {/* BRANCH GRID */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* BRANCH 1 */}
          <div className="bg-white rounded-2xl overflow-hidden border border-cyan-50 shadow-sm hover:shadow-2xl transition-all duration-500">

            {/* MAP */}
            <div className="h-[260px] sm:h-[300px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.2603760444376!2d72.82600839999998!3d19.1373902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b73d0ff983c9%3A0xccf5d3ec82864c0e!2sDr.Rajneesh%20kant!5e0!3m2!1sen!2sin!4v1778501111915!5m2!1sen!2sin"
                width="100%"
                height="100%"
                loading="lazy"
                className="border-0 w-full h-full"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6">

              <h3 className="text-xl sm:text-2xl font-bold text-[#0b1f3a] mb-5">
                Mumbai Branch
              </h3>

              <div className="space-y-4">

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
                    <MapPin
                      size={18}
                      className="text-[#11bfd0]"
                    />
                  </div>

                  <p className="text-gray-600 leading-6 text-[14px]">
                    Spine Clinic, Andheri West,
                    Mumbai, Maharashtra, India
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
                    <Phone
                      size={18}
                      className="text-[#11bfd0]"
                    />
                  </div>

                  <div className="text-gray-600 leading-6 text-[14px]">
                    <p>+91-9308511357</p>
                    <p>+91-9137352377</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
                    <Clock
                      size={18}
                      className="text-[#11bfd0]"
                    />
                  </div>

                  <div className="text-gray-600 leading-6 text-[14px]">
                    <p>Mon - Sat : 9 AM - 7 PM</p>
                    <p>Sunday : By Appointment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BRANCH 2 */}
          <div className="bg-white rounded-2xl overflow-hidden border border-cyan-50 shadow-sm hover:shadow-2xl transition-all duration-500">

            {/* MAP */}
            <div className="h-[260px] sm:h-[300px] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.764684870925!2d85.1019907!3d25.579494500000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f2a999e11be2a7%3A0x8c4a7845d1e3f087!2sDr.Rajneesh%20kant!5e0!3m2!1sen!2sin!4v1778501157274!5m2!1sen!2sin"
                width="100%"
                height="100%"
                loading="lazy"
                className="border-0 w-full h-full"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* CONTENT */}
            <div className="p-6">

              <h3 className="text-xl sm:text-2xl font-bold text-[#0b1f3a] mb-5">
                Patna Branch
              </h3>

              <div className="space-y-4">

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
                    <MapPin
                      size={18}
                      className="text-[#11bfd0]"
                    />
                  </div>

                  <p className="text-gray-600 leading-6 text-[14px]">
                    Spine Clinic, Patna,
                    Bihar, India
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
                    <Phone
                      size={18}
                      className="text-[#11bfd0]"
                    />
                  </div>

                  <div className="text-gray-600 leading-6 text-[14px]">
                    <p>+91-9308511357</p>
                    <p>+91-8403131311</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
                    <Clock
                      size={18}
                      className="text-[#11bfd0]"
                    />
                  </div>

                  <div className="text-gray-600 leading-6 text-[14px]">
                    <p>Mon - Sat : 10 AM - 6 PM</p>
                    <p>Sunday : Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}