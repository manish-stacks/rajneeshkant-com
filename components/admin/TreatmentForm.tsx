"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import api from "@/lib/axios";
import {
  Card,
  Button,
  Field,
  inputCls,
} from "@/components/admin/ui";
import { useToast } from "@/components/admin/useToast";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUpload from "@/components/admin/ImageUpload";

export interface TreatmentFormValues {
  name: string;
  slug: string;
  shortDesc: string;
  content: string;
  image: string;
  icon: string;
  conditions: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  robotsIndex: boolean;
  showInMenu: boolean;
  order: number;
  active: boolean;
}

export const emptyTreatment: TreatmentFormValues = {
  name: "",
  slug: "",
  shortDesc: "",
  content: "",
  image: "",
  icon: "🦴",
  conditions: "",
  metaTitle: "",
  metaDescription: "",
  canonical: "",
  robotsIndex: true,
  showInMenu: true,
  order: 0,
  active: true,
};

interface Props {
  mode: "new" | "edit";
  initial: TreatmentFormValues;
  treatmentId?: string;
}

export default function TreatmentForm({ mode, initial, treatmentId }: Props) {
  const router = useRouter();
  const { push, ToastContainer } = useToast();
  const [form, setForm] = useState<TreatmentFormValues>(initial);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof TreatmentFormValues>(
    key: K,
    value: TreatmentFormValues[K]
  ) => setForm((f) => ({ ...f, [key]: value }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.shortDesc) {
      push("Name and short description are required", "error");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      conditions: form.conditions
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    };

    try {
      if (mode === "edit" && treatmentId) {
        await api.put(`/treatments/${treatmentId}`, payload);
        push("Treatment updated");
      } else {
        await api.post("/treatments", payload);
        push("Treatment created");
      }
      setTimeout(() => {
        router.push("/admin/treatments");
        router.refresh();
      }, 600);
    } catch (err) {
      push((err as Error).message, "error");
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-8xl">
      <Link
        href="/admin/treatments"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-sky-600"
      >
        <ArrowLeft size={16} /> Back to Treatments
      </Link>

      <h2 className="mb-6 text-xl font-bold text-slate-900">
        {mode === "edit" ? "Edit Treatment" : "Add New Treatment"}
      </h2>

      <form onSubmit={save} className="grid gap-6 lg:grid-cols-10">
        <div className="space-y-6 lg:col-span-7">
          {/* Basic info */}
          <Card className="p-6">
            <h3 className="mb-4 font-bold text-slate-900">Basic Information</h3>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-[1fr,110px]">
                <Field label="Treatment Name *">
                  <input
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputCls}
                    placeholder="Back Pain Physiotherapy in Mumbai"
                    required
                  />
                </Field>
                <Field label="Icon (emoji)">
                  <input
                    value={form.icon}
                    onChange={(e) => set("icon", e.target.value)}
                    className={`${inputCls} text-center text-lg`}
                  />
                </Field>
              </div>

              <Field
                label="Slug"
                hint="URL part — leave blank to auto-generate from the name"
              >
                <input
                  value={form.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  className={inputCls}
                  placeholder="back-pain"
                />
              </Field>

              <Field
                label="Featured Image"
                hint="Shown on the detail page hero — upload or paste a link"
              >
                <ImageUpload
                  value={form.image}
                  onChange={(url) => set("image", url)}
                  label="Treatment image"
                />
              </Field>

              <Field
                label="Short Description *"
                hint="Used on cards, listings and the home page"
              >
                <textarea
                  value={form.shortDesc}
                  onChange={(e) => set("shortDesc", e.target.value)}
                  rows={2}
                  className={`${inputCls} resize-none`}
                  required
                />
              </Field>

              <Field
                label="Conditions Treated"
                hint="Comma separated — shown as a checklist on the detail page"
              >
                <input
                  value={form.conditions}
                  onChange={(e) => set("conditions", e.target.value)}
                  className={inputCls}
                  placeholder="Lower back pain, Herniated discs, Muscle strain"
                />
              </Field>
            </div>
          </Card>

          {/* Rich content */}
          <Card className="p-6">
            <h3 className="mb-1 font-bold text-slate-900">Detailed Content</h3>
            <p className="mb-4 text-sm text-slate-500">
              This rich text appears in the main body of the treatment detail
              page.
            </p>
            <RichTextEditor
              value={form.content}
              onChange={(html) => set("content", html)}
              placeholder="Describe the treatment, causes, approach…"
            />
          </Card>
        </div>
        <div className="space-y-6 lg:col-span-3">
          {/* SEO */}
          <Card className="sticky top-6 p-6">
            <h3 className="mb-4 font-bold text-slate-900">SEO Settings</h3>
            <div className="space-y-4">
              <Field label="Meta Title" hint="Defaults to the treatment name">
                <input
                  value={form.metaTitle}
                  onChange={(e) => set("metaTitle", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field
                label="Meta Description"
                hint="150-160 characters recommended"
              >
                <textarea
                  value={form.metaDescription}
                  onChange={(e) => set("metaDescription", e.target.value)}
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
              </Field>
              <Field
                label="Canonical URL"
                hint="Leave blank to auto-use https://drrajneeshkant.com/{slug}/"
              >
                <input
                  value={form.canonical}
                  onChange={(e) => set("canonical", e.target.value)}
                  className={inputCls}
                  placeholder="https://drrajneeshkant.com/back-pain/"
                />
              </Field>
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-sm font-medium text-slate-700">
                  Search engine indexing
                  <span className="block text-xs font-normal text-slate-400">
                    ON = index, follow · OFF = noindex, nofollow
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={form.robotsIndex}
                  onChange={(e) => set("robotsIndex", e.target.checked)}
                  className="h-5 w-5 accent-sky-500"
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Display Order" hint="Lower number shows first">
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => set("order", Number(e.target.value))}
                    className={inputCls}
                  />
                </Field>
                <div className="flex flex-col justify-end gap-3 pb-1">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) => set("active", e.target.checked)}
                      className="h-4 w-4 accent-sky-500"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Active (visible on website)
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.showInMenu}
                      onChange={(e) => set("showInMenu", e.target.checked)}
                      className="h-4 w-4 accent-sky-500"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Show in header Treatments menu
                    </span>
                  </label>
                </div>
              </div>
            </div>


            <div className="mt-6 space-y-3 border-t pt-6">
              <Button type="submit" disabled={saving}>
                <Save size={16} />
                {saving
                  ? "Saving…"
                  : mode === "edit"
                    ? "Update Treatment"
                    : "Create Treatment"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/treatments")}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}
