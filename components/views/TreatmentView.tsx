import Link from "next/link";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";

export function TreatmentView({
  treatment,
  related,
}: {
  treatment: any;
  related: any[];
}) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: treatment.name,
    description: treatment.shortDesc,
    possibleTreatment: {
      "@type": "MedicalTherapy",
      name: "Chiropractic Care & Physiotherapy",
      provider: {
        "@type": "Physician",
        name: "Dr. Rajneesh Kant",
        url: "https://drrajneeshkant.com",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaMarkup),
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/service-banner.jpg"
            alt={treatment.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/80" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 break-words">
              {treatment.name}
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              {treatment.shortDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section — NOTE: no overflow-x-hidden here, it would break the
          sticky sidebar. Horizontal containment is handled on the article
          wrapper below instead. */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-12">
            {/* Main Content */}
            <div className="min-w-0">
              {treatment.image && (
                <div className="mb-8 overflow-hidden rounded-3xl shadow-lg">
                  <img
                    src={treatment.image}
                    alt={treatment.name}
                    className="w-full h-[240px] md:h-[420px] object-cover"
                  />
                </div>
              )}

              {treatment.content ? (
                <div className="min-w-0 overflow-hidden">
                  <article
                    className="
                      prose prose-lg prose-blue max-w-none
                      prose-headings:text-gray-900
                      prose-p:text-gray-700
                      prose-li:text-gray-700
                      prose-img:max-w-full
                      prose-img:h-auto
                      prose-img:rounded-2xl
                      prose-pre:overflow-x-auto
                      break-words
                      [&_*]:max-w-full
                      [&_img]:h-auto
                      [&_iframe]:max-w-full
                      [&_video]:max-w-full
                      [&_table]:block
                      [&_table]:overflow-x-auto
                      [&_table]:w-full
                    "
                    dangerouslySetInnerHTML={{
                      __html: treatment.content,
                    }}
                  />
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
                    About {treatment.name}
                  </h2>

                  <p className="text-gray-600 leading-relaxed">
                    {treatment.shortDesc}
                  </p>
                </>
              )}

              {treatment.conditions?.length > 0 && (
                <div className="mt-12">
                  <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                    Conditions We Address
                  </h3>

                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {treatment.conditions.map((condition: string) => (
                      <li
                        key={condition}
                        className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100"
                      >
                        <CheckCircle
                          size={18}
                          className="text-brand-teal mt-0.5 shrink-0"
                        />

                        <span className="text-gray-700">{condition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sticky Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">
                {/* Consultation Card */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#0F172A]/80 to-[#0F172A] text-white p-8 shadow-2xl">
                  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

                  <div className="relative">
                    <h3 className="font-heading text-2xl font-bold mb-3">
                      Book a Consultation
                    </h3>

                    <p className="text-blue-100 text-sm leading-relaxed mb-6">
                      Get expert treatment for{" "}
                      <strong>{treatment.name}</strong>. Schedule your
                      appointment today.
                    </p>

                    <Link
                      href="/appointment"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-white text-[#0F172A] font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                      Book Appointment
                      <ArrowRight size={18} />
                    </Link>

                    <a
                      href="tel:9308511357"
                      className="flex items-center justify-center gap-2 w-full py-4 mt-3 border border-white/30 rounded-xl hover:bg-white/10 transition-all duration-300"
                    >
                      <Phone size={18} />
                      +91 9308511357
                    </a>
                  </div>
                </div>

                {/* Doctor Card */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#0F172A] to-[#0F172A]/60 flex items-center justify-center text-white font-bold text-xl mb-4">
                      DR
                    </div>

                    <h4 className="font-heading text-xl font-bold text-gray-900">
                      Dr. Rajneesh Kant
                    </h4>

                    <p className="text-gray-600 text-sm mt-2">
                      Chiropractor & Physiotherapist
                    </p>

                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-500">
                        Personalized treatment plans focused on pain relief,
                        mobility restoration, and long-term wellness.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Related Treatments */}
                {related.length > 0 && (
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-lg p-6">
                    <h3 className="font-heading text-xl font-bold text-gray-900 mb-5">
                      Other Treatments
                    </h3>

                    <ul className="space-y-2">
                      {related.map((item: any) => (
                        <li key={item.slug}>
                          <Link
                            href={`/${item.slug}`}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all group"
                          >
                            <span>{item.icon}</span>

                            <span className="text-gray-700 text-sm group-hover:text-brand-blue transition-colors">
                              {item.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/treatments"
                      className="inline-flex items-center gap-2 mt-5 text-brand-blue font-medium text-sm hover:gap-3 transition-all"
                    >
                      View all treatments
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}