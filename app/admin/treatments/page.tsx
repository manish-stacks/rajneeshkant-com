"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle, Pencil, Trash2, Eye, EyeOff, Search } from "lucide-react";
import api from "@/lib/axios";
import {
  Card,
  PageHeader,
  Button,
  Badge,
  EmptyState,
  LoadingState,
  inputCls,
} from "@/components/admin/ui";
import { useToast } from "@/components/admin/useToast";

interface Treatment {
  _id: string;
  name: string;
  slug: string;
  shortDesc: string;
  icon: string;
  conditions: string[];
  order: number;
  active: boolean;
  showInMenu?: boolean;
}

type Filter = "all" | "live" | "hidden" | "menu";

export default function AdminTreatmentsPage() {
  const router = useRouter();
  const [items, setItems] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const { push, ToastContainer } = useToast();

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    setLoading(true);
    api
      .get("/treatments?all=1")
      .then((res) => setItems(res.data.treatments || []))
      .catch((err) => push((err as Error).message, "error"))
      .finally(() => setLoading(false));
  };

  const toggleActive = async (t: Treatment) => {
    try {
      await api.put(`/treatments/${t._id}`, { active: !t.active });
      setItems((p) => p.map((x) => (x._id === t._id ? { ...x, active: !x.active } : x)));
      push(t.active ? "Hidden from website" : "Now visible on website");
    } catch (err) {
      push((err as Error).message, "error");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this treatment permanently?")) return;
    try {
      await api.delete(`/treatments/${id}`);
      setItems((p) => p.filter((x) => x._id !== id));
      push("Treatment deleted");
    } catch (err) {
      push((err as Error).message, "error");
    }
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter((t) => {
      if (filter === "live" && !t.active) return false;
      if (filter === "hidden" && t.active) return false;
      if (filter === "menu" && !t.showInMenu) return false;
      if (!term) return true;
      return (
        t.name.toLowerCase().includes(term) ||
        t.slug.toLowerCase().includes(term) ||
        t.shortDesc.toLowerCase().includes(term) ||
        (t.conditions || []).some((c) => c.toLowerCase().includes(term))
      );
    });
  }, [items, q, filter]);

  const FILTERS: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "live", label: "Live" },
    { key: "hidden", label: "Hidden" },
    { key: "menu", label: "In Menu" },
  ];

  return (
    <div>
      <PageHeader
        title="Treatments"
        subtitle="Manage the treatment services shown across the website."
        action={
          <Button onClick={() => router.push("/admin/treatments/new")}>
            <PlusCircle size={16} /> Add Treatment
          </Button>
        }
      />

      {/* Search + filter toolbar */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search treatments…"
            className={`${inputCls} pl-9`}
          />
        </div>
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                filter === f.key
                  ? "bg-sky-500 text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <LoadingState message="Loading treatments..." />
      ) : filtered.length === 0 ? (
        <EmptyState message={items.length ? "No treatments match your search." : "No treatments yet. Click 'Add Treatment', or import seed-content.sql."} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((t) => (
            <Card key={t._id} className="flex flex-col p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-50 to-sky-50 text-2xl">
                  {t.icon}
                </div>
                <div className="flex flex-col items-end gap-1">
                  {t.active ? (
                    <Badge color="green"><Eye size={11} /> Live</Badge>
                  ) : (
                    <Badge color="slate"><EyeOff size={11} /> Hidden</Badge>
                  )}
                  {t.showInMenu && <Badge color="cyan">In Menu</Badge>}
                </div>
              </div>
              <h3 className="font-bold text-slate-900">{t.name}</h3>
              <p className="mt-0.5 text-xs text-slate-400">/{t.slug}</p>
              <p className="mt-1 line-clamp-2 flex-1 text-sm text-slate-500">{t.shortDesc}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(t.conditions || []).slice(0, 3).map((c) => (
                  <span key={c} className="rounded-full bg-cyan-50 px-2 py-0.5 text-[11px] font-medium text-cyan-700">{c}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3">
                <button onClick={() => router.push(`/admin/treatments/${t._id}/edit`)} className="flex items-center gap-1 rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 hover:bg-sky-100">
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => toggleActive(t)} className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
                  {t.active ? <EyeOff size={13} /> : <Eye size={13} />}
                  {t.active ? "Hide" : "Show"}
                </button>
                <button onClick={() => remove(t._id)} className="ml-auto flex items-center gap-1 rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600">
                  <Trash2 size={15} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
