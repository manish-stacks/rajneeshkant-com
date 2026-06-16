"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, Pencil, Trash2, Eye, EyeOff, Search, Globe } from "lucide-react";
import api from "@/lib/axios";
import { Card, PageHeader, Button, Badge, EmptyState, LoadingState, inputCls, Pagination } from "@/components/admin/ui";
import { useToast } from "@/components/admin/useToast";

interface Page {
  _id: string;
  title: string;
  slug: string;
  active: boolean;
  robotsIndex: boolean;
  showInMenu: boolean;
  updatedAt: string;
}

export default function AdminPagesPage() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const { push, ToastContainer } = useToast();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const load = () => {
    setLoading(true);
    api
      .get("/pages")
      .then((res) => setPages(res.data.pages || []))
      .catch((err) => push((err as Error).message, "error"))
      .finally(() => setLoading(false));
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this page permanently?")) return;
    try {
      await api.delete(`/pages/${id}`);
      setPages((p) => p.filter((x) => x._id !== id));
      push("Page deleted");
    } catch (err) {
      push((err as Error).message, "error");
    }
  };

  const visible = useMemo(() => {
    const t = search.trim().toLowerCase();
    return pages.filter(
      (p) => p.title.toLowerCase().includes(t) || p.slug.toLowerCase().includes(t)
    );
  }, [pages, search]);
  const paged = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <PageHeader
        title="Content Pages"
        subtitle="Create, edit and delete standalone pages (Terms, Privacy, SEO landing pages)."
        action={
          <Button onClick={() => router.push("/admin/pages/new")}>
            <PlusCircle size={16} /> New Page
          </Button>
        }
      />

      <div className="relative mb-5 max-w-sm">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search pages..." className={`${inputCls} pl-10`} />
      </div>

      {loading ? (
        <LoadingState message="Loading pages..." />
      ) : visible.length === 0 ? (
        <EmptyState message={pages.length ? "No pages match your search." : "No pages yet. Create one or import seed-content.sql."} />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="px-6 py-3.5 text-left font-medium text-slate-500">Title</th>
                  <th className="hidden px-6 py-3.5 text-left font-medium text-slate-500 md:table-cell">Status</th>
                  <th className="hidden px-6 py-3.5 text-left font-medium text-slate-500 md:table-cell">Index</th>
                  <th className="hidden px-6 py-3.5 text-left font-medium text-slate-500 lg:table-cell">Updated</th>
                  <th className="px-6 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paged.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="line-clamp-1 font-medium text-slate-900">{p.title}</p>
                      <p className="mt-0.5 text-xs text-slate-400">/{p.slug}</p>
                    </td>
                    <td className="hidden px-6 py-4 md:table-cell">
                      {p.active ? <Badge color="green"><Eye size={11} /> Live</Badge> : <Badge color="slate"><EyeOff size={11} /> Hidden</Badge>}
                    </td>
                    <td className="hidden px-6 py-4 md:table-cell">
                      {p.robotsIndex ? <Badge color="blue">index</Badge> : <Badge color="rose">noindex</Badge>}
                    </td>
                    <td className="hidden px-6 py-4 text-xs text-slate-400 lg:table-cell">
                      {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link href={`/${p.slug}`} target="_blank" className="rounded-lg p-1.5 text-slate-400 hover:bg-sky-50 hover:text-sky-600" title="View on site"><Globe size={16} /></Link>
                        <Link href={`/admin/pages/${p._id}/edit`} className="rounded-lg p-1.5 text-slate-400 hover:bg-sky-50 hover:text-sky-600" title="Edit"><Pencil size={16} /></Link>
                        <button onClick={() => remove(p._id)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {!loading && visible.length > 0 && (
        <Pagination page={page} pageSize={PAGE_SIZE} total={visible.length} onPageChange={setPage} />
      )}

      <ToastContainer />
    </div>
  );
}
