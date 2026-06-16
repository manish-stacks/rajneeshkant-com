"use client";

import { useEffect, useState } from "react";
import { PlusCircle, Trash2, Eye, EyeOff, Pencil } from "lucide-react";
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
import ImageUpload from "@/components/admin/ImageUpload";

interface GalleryImage {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  order: number;
  active: boolean;
}

const emptyForm = {
  title: "",
  imageUrl: "",
  category: "Clinic",
  order: 0,
  active: true,
};

const CATEGORIES = ["Clinic", "Treatment", "Equipment", "Team", "Patients"];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryImage[]>([]);
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
      .get("/gallery?all=1")
      .then((res) => setItems(res.data.images || []))
      .catch((err) => push((err as Error).message, "error"))
      .finally(() => setLoading(false));
  };

  const openNew = () => {
    setForm({ ...emptyForm, order: items.length });
    setEditId(null);
    setShowEditor(true);
  };

  const openEdit = (g: GalleryImage) => {
    setForm({
      title: g.title,
      imageUrl: g.imageUrl,
      category: g.category,
      order: g.order,
      active: g.active,
    });
    setEditId(g._id);
    setShowEditor(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await api.put(`/gallery/${editId}`, form);
      } else {
        await api.post("/gallery", form);
      }
      setShowEditor(false);
      push(editId ? "Image updated" : "Image added");
      load();
    } catch (err) {
      push((err as Error).message, "error");
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (g: GalleryImage) => {
    try {
      await api.put(`/gallery/${g._id}`, { active: !g.active });
      setItems((p) =>
        p.map((x) => (x._id === g._id ? { ...x, active: !x.active } : x))
      );
      push(g.active ? "Hidden from website" : "Now visible");
    } catch (err) {
      push((err as Error).message, "error");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    try {
      await api.delete(`/gallery/${id}`);
      setItems((p) => p.filter((x) => x._id !== id));
      push("Image deleted");
    } catch (err) {
      push((err as Error).message, "error");
    }
  };

  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle="Manage photos shown on the website gallery page."
        action={
          <Button onClick={openNew}>
            <PlusCircle size={16} /> Add Image
          </Button>
        }
      />

      {loading ? (
        <LoadingState message="Loading gallery..." />
      ) : items.length === 0 ? (
        <EmptyState message="No images yet. Add your first photo." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((g) => (
            <Card key={g._id} className="group overflow-hidden">
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={g.imageUrl}
                  alt={g.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute right-2 top-2">
                  {g.active ? (
                    <Badge color="green">Live</Badge>
                  ) : (
                    <Badge color="slate">Hidden</Badge>
                  )}
                </div>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-slate-800">
                  {g.title}
                </p>
                <p className="text-xs text-slate-400">{g.category}</p>
                <div className="mt-2.5 flex items-center gap-1.5">
                  <button
                    onClick={() => openEdit(g)}
                    className="flex items-center gap-1 rounded-lg bg-sky-50 px-2 py-1 text-xs font-medium text-sky-700 hover:bg-sky-100"
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    onClick={() => toggleActive(g)}
                    className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50"
                    title={g.active ? "Hide" : "Show"}
                  >
                    {g.active ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                  <button
                    onClick={() => remove(g._id)}
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
        title={editId ? "Edit Image" : "Add Image"}
      >
        <form onSubmit={save} className="space-y-4">
          <Field
            label="Image *"
            hint="Upload an image from your device, or paste a link"
          >
            <ImageUpload
              value={form.imageUrl}
              onChange={(url) => setForm({ ...form, imageUrl: url })}
              label="Gallery image"
            />
          </Field>

          <Field label="Title">
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={inputCls}
              placeholder="Clinic reception"
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Category">
              <select
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className={inputCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
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
              {saving ? "Saving..." : editId ? "Update" : "Add Image"}
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
