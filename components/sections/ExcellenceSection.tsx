"use client";

import { CheckCircle2 } from "lucide-react";

const treatments = [
  {
    title: "Spinal Manipulation Therapy",
    desc: "To locate properly the vertebrae to relieve pain and restore function.",
  },
  {
    title: "Cervical and Lumbar Traction",
    desc: "Specialized techniques to relieve pressure off spinal nerves to reduce discomfort in the neck and lower back.",
  },
];

export default function ExcellenceSection() {
  return (
    <section className="py-14 lg:py-20 bg-[#f8fcfc]">

      <div className="max-w-7xl mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* LEFT CONTENT */}
          <div>

            <p className="text-[#11bfd0] uppercase tracking-[3px] text-xs sm:text-sm font-semibold mb-3">
              Chiropractic Excellence
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0b1f3a] leading-tight mb-5">
              A Proven Historical Record Of Excellence In Chiropractic Care
            </h2>

            <div className="w-20 h-[3px] bg-[#11bfd0] rounded-full mb-6" />

            <div className="space-y-4 text-gray-600 text-[15px] leading-7">

              <p>
                Dr. Rajneesh Kant has earned a reputation as a
                leading chiropractor in India for successfully
                treating patients through chiropractic care with
                lasting beneficial results.
              </p>

              <p>
                He is working towards the treatment of back pain,
                neck pain, sciatica, and migraines, thereby
                affirming very superficial relief to his patients.
              </p>

              <p>
                He has enhanced the quality of life for many by
                employing advanced chiropractic techniques in
                designing their various treatment regimens for
                the restoration of mobility and relief.
              </p>

              <p>
                He has become a household name for chiropractors
                in India primarily due to his commitment to
                patient care.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-cyan-50">

            <h3 className="text-xl sm:text-2xl font-bold text-[#0b1f3a] leading-snug mb-4">
              Revolutionary Treatments Offered By
              <span className="text-[#11bfd0]">
                {" "}Dr. Rajneesh Kant
              </span>
            </h3>

            <p className="text-gray-600 text-[14px] leading-7 mb-6">
              He is the best chiropractor in India and has
              developed revolutionary, state-of-the-art,
              and non-invasive treatments that bring sweeping
              changes to chiropractic care.
            </p>

            {/* TREATMENT LIST */}
            <div className="space-y-5">

              {treatments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-5 border-b border-gray-100 last:border-0 last:pb-0"
                >

                  {/* ICON */}
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 flex items-center justify-center shrink-0">
                    <CheckCircle2
                      size={20}
                      className="text-[#11bfd0]"
                    />
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-[#0b1f3a] mb-1.5">
                      {item.title}
                    </h4>

                    <p className="text-gray-600 leading-6 text-[14px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* BOTTOM TEXT */}
            <div className="mt-6 p-4 rounded-xl bg-cyan-50 border border-cyan-100">
              <p className="text-gray-700 leading-6 text-[14px]">
                These innovative treatments are specifically
                designed to alleviate pain and facilitate
                long-term wellness and injury prevention;
                therefore, Dr. Rajneesh Kant is a reliable
                chiropractor in India.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}