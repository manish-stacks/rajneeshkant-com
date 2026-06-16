import Link from "next/link";

export function PageView({ page }: { page: any }) {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-white to-blue-100 pt-28 pb-14">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-blue-200 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sky-200 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 break-words">{page.title}</h1>
          {page.updatedAt && (
            <p className="mt-3 text-sm text-gray-500">
              Last updated:{" "}
              {new Date(page.updatedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}
        </div>
      </section>
      <section className="overflow-x-hidden py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl min-w-0 overflow-hidden">
            {page.content && page.content.trim() ? (
              <article
                className="prose prose-blue prose-headings:font-bold max-w-none break-words
                           prose-headings:break-words
                           prose-img:max-w-full prose-img:h-auto prose-img:rounded-xl
                           prose-pre:overflow-x-auto prose-pre:max-w-full
                           [&_*]:max-w-full
                           [&_img]:h-auto
                           [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto
                           [&_iframe]:max-w-full [&_video]:max-w-full
                           [&_figure]:mx-0"
                dangerouslySetInnerHTML={{ __html: page.content }}
              />
            ) : (
              <p className="text-gray-500">This page has no content yet.</p>
            )}
            <div className="mt-12 rounded-2xl border border-blue-100 bg-blue-50/60 p-6 text-center">
              <p className="text-gray-600">Have a question? We&apos;re happy to help.</p>
              <Link href="/contact" className="mt-3 inline-block rounded-xl bg-brand-blue px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-dark">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}