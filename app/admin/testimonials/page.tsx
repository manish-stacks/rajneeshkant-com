"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Pencil, Trash2, Star, Eye, EyeOff } from "lucide-react";
import {
  Card,
  PageHeader,
  Button,
  Badge,
  EmptyState,
  LoadingState,
  Modal,
  Field,
  inputCls,
} from "@/components/admin/ui";
import { useToast } from "@/components/admin/useToast";
import api from "@/lib/axios";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  order: number;
  active: boolean;
}

const emptyForm = {
  name: "",
  role: "Patient",
  content: "",
  rating: 5,
  order: 0,
  active: true,
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const { push, ToastContainer } = useToast();

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    api
      .get("/testimonials?all=1")
      .then((res) => setItems(res.data.testimonials || []))
      .catch((err) => push((err as Error).message, "error"))
      .finally(() => setLoading(false));
  };

  const openNew = () => {
    setForm({ ...emptyForm, order: items.length });
    setEditId(null);
    setShowEditor(true);
  };

  const openEdit = (t: Testimonial) => {
    setForm({
      name: t.name,
      role: t.role,
      content: t.content,
      rating: t.rating,
      order: t.order,
      active: t.active,
    });
    setEditId(t._id);
    setShowEditor(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/testimonials/${editId}`, form);
      } else {
        await api.post("/testimonials", form);
      }
      setShowEditor(false);
      push(editId ? "Testimonial updated" : "Testimonial added");
      load();
    } catch (err) {
      push((err as Error).message, "error");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (t: Testimonial) => {
    try {
      await api.put(`/testimonials/${t._id}`, { active: !t.active });
      setItems((p) =>
        p.map((x) => (x._id === t._id ? { ...x, active: !x.active } : x))
      );
      push(t.active ? "Hidden from website" : "Now visible");
    } catch (err) {
      push((err as Error).message, "error");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await api.delete(`/testimonials/${id}`);
      setItems((p) => p.filter((x) => x._id !== id));
      push("Testimonial deleted");
    } catch (err) {
      push((err as Error).message, "error");
    }
  };

  return (
    <div>
      <PageHeader
        title="Testimonials"
        subtitle="Manage patient reviews displayed on the website."
        action={
          <Button onClick={openNew}>
            <PlusCircle size={16} /> Add Testimonial
          </Button>
        }
      />

      {loading ? (
        <LoadingState message="Loading testimonials..." />
      ) : items.length === 0 ? (
        <EmptyState message="No testimonials yet. Add your first review." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <Card key={t._id} className="flex flex-col p-5">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }
                    />
                  ))}
                </div>
                {t.active ? (
                  <Badge color="green">Live</Badge>
                ) : (
                  <Badge color="slate">Hidden</Badge>
                )}
              </div>
              <p className="flex-1 text-sm italic leading-6 text-slate-600">
                &ldquo;{t.content}&rdquo;
              </p>
              <div className="mt-3 border-t border-slate-100 pt-3">
                <p className="text-sm font-bold text-slate-900">{t.name}</p>
                <p className="text-xs text-slate-400">{t.role}</p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <button
                    onClick={() => openEdit(t)}
                    className="flex items-center gap-1 rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 hover:bg-sky-100"
                  >
                    <Pencil size={13} /> Edit
                  </button>
                  <button
                    onClick={() => toggleActive(t)}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50"
                  >
                    {t.active ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                  <button
                    onClick={() => remove(t._id)}
                    className="ml-auto rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={showEditor}
        onClose={() => setShowEditor(false)}
        title={editId ? "Edit Testimonial" : "Add Testimonial"}
      >
        <form onSubmit={save} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Patient Name *">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
                required
              />
            </Field>
            <Field label="Role / Label">
              <input
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className={inputCls}
                placeholder="Patient"
              />
            </Field>
          </div>

          <Field label="Review Content *">
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={4}
              className={`${inputCls} resize-y`}
              required
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Rating">
              <select
                value={form.rating}
                onChange={(e) =>
                  setForm({ ...form, rating: Number(e.target.value) })
                }
                className={inputCls}
              >
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>
                    {r} Star{r > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Display Order">
              <input
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: Number(e.target.value) })
                }
                className={inputCls}
              />
            </Field>
          </div>

          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => setForm({ ...form, active: e.target.checked })}
              className="h-4 w-4 accent-sky-500"
            />
            <span className="text-sm font-medium text-slate-700">
              Active (visible on website)
            </span>
          </label>

          <div className="flex gap-3 pt-1">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : editId ? "Update" : "Add"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowEditor(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      <ToastContainer />
    </div>
  );
}
