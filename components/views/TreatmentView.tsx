import Link from "next/link";
import { CheckCircle, ArrowRight, Phone } from "lucide-react";
import { AppointmentCTA } from "@/components/sections/AppointmentCTA";

export function TreatmentView({ treatment, related }: { treatment: any; related: any[] }) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: treatment.name,
    description: treatment.shortDesc,
    possibleTreatment: {
      "@type": "MedicalTherapy",
      name: "Chiropractic Care & Physiotherapy",
      provider: { "@type": "Physician", name: "Dr. Rajneesh Kant", url: "https://drrajneeshkant.com" },
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
      <section className="overflow-x-hidden pt-28 pb-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-4xl mb-4 block">{treatment.icon}</span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4 break-words">{treatment.name}</h1>
            <p className="text-gray-600 text-lg mb-6 break-words">{treatment.shortDesc}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointment" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue-dark transition-colors">
                Book Appointment <ArrowRight size={18} />
              </Link>
              <a href="tel:9308511357" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-blue text-brand-blue font-semibold rounded-xl hover:bg-brand-blue hover:text-white transition-colors">
                <Phone size={18} /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding overflow-x-hidden bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* min-w-0 is essential: without it this grid column can grow past its
                track when the WP content has wide images/tables, overflowing the page. */}
            <div className="lg:col-span-2 min-w-0">
              {treatment.image && (
                <div className="mb-8 overflow-hidden rounded-3xl shadow-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={treatment.image} alt={treatment.name} className="w-full h-[240px] md:h-[380px] object-cover" />
                </div>
              )}
              {treatment.content ? (
                <div className="min-w-0 overflow-hidden">
                  <article
                    className="prose prose-blue max-w-none mb-8 break-words
                               prose-headings:break-words
                               prose-img:max-w-full prose-img:h-auto prose-img:rounded-xl
                               prose-pre:overflow-x-auto prose-pre:max-w-full
                               [&_*]:max-w-full
                               [&_img]:h-auto
                               [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto
                               [&_iframe]:max-w-full [&_video]:max-w-full
                               [&_figure]:mx-0"
                    dangerouslySetInnerHTML={{ __html: treatment.content }}
                  />
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">About {treatment.name}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{treatment.shortDesc}</p>
                </>
              )}
              {treatment.conditions?.length > 0 && (
                <>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-4">Conditions We Address</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {treatment.conditions.map((c: string) => (
                      <li key={c} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-brand-teal shrink-0" />
                        <span className="text-gray-700 text-sm break-words">{c}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="space-y-6 min-w-0">
              <div className="bg-brand-blue text-white rounded-2xl p-6">
                <h3 className="font-heading font-bold text-lg mb-3">Book a Consultation</h3>
                <p className="text-blue-200 text-sm mb-5">Get expert treatment for {treatment.name}. Schedule your appointment today.</p>
                <Link href="/appointment" className="block w-full text-center py-3 bg-white text-brand-blue font-bold rounded-xl hover:bg-gray-50 transition-colors text-sm">Book Appointment</Link>
                <a href="tel:9308511357" className="block w-full text-center py-3 mt-3 border border-white/30 text-white font-medium rounded-xl hover:bg-white/10 transition-colors text-sm">+91-9308511357</a>
              </div>
              {related.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-heading font-bold text-gray-900 mb-4">Other Treatments</h3>
                  <ul className="space-y-2">
                    {related.map((t: any) => (
                      <li key={t.slug}>
                        <Link href={`/${t.slug}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-blue transition-colors group">
                          <span>{t.icon}</span>
                          <span className="group-hover:underline break-words">{t.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/treatments" className="block mt-4 text-brand-blue text-sm font-medium hover:underline">View all treatments →</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <AppointmentCTA />
    </>
  );
}