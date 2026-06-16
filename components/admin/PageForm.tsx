"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import api from "@/lib/axios";
import { Card, Button, Field, inputCls } from "@/components/admin/ui";
import { useToast } from "@/components/admin/useToast";
import RichTextEditor from "@/components/admin/RichTextEditor";

export interface PageFormValues {
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  robotsIndex: boolean;
  showInMenu: boolean;
  active: boolean;
}

export const emptyPage: PageFormValues = {
  title: "",
  slug: "",
  content: "",
  metaTitle: "",
  metaDescription: "",
  canonical: "",
  robotsIndex: true,
  showInMenu: false,
  active: true,
};

interface Props {
  mode: "new" | "edit";
  initial: PageFormValues;
  pageId?: string;
}

export default function PageForm({ mode, initial, pageId }: Props) {
  const router = useRouter();
  const { push, ToastContainer } = useToast();
  const [form, setForm] = useState<PageFormValues>(initial);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof PageFormValues>(key: K, value: PageFormValues[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) {
      push("Title is required", "error");
      return;
    }
    setSaving(true);
    try {
      if (mode === "edit" && pageId) {
        await api.put(`/pages/${pageId}`, form);
        push("Page updated");
      } else {
        await api.post("/pages", form);
        push("Page created");
      }
      setTimeout(() => {
        router.push("/admin/pages");
        router.refresh();
      }, 600);
    } catch (err) {
      push((err as Error).message, "error");
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-8xl">
      <Link href="/admin/pages" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-sky-600">
        <ArrowLeft size={16} /> Back to Pages
      </Link>
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        {mode === "edit" ? "Edit Page" : "Create New Page"}
      </h2>

      <form onSubmit={save} className="grid gap-6 lg:grid-cols-10">
        <div className="space-y-6 lg:col-span-7">
          <Card className="p-6">
            <h3 className="mb-4 font-bold text-slate-900">Page Details</h3>
            <div className="space-y-4">
              <Field label="Title *">
                <input value={form.title} onChange={(e) => set("title", e.target.value)} className={inputCls} placeholder="Terms & Conditions" required />
              </Field>
              <Field label="Slug" hint="URL part — e.g. 'terms' → /terms. Leave blank to auto-generate.">
                <input value={form.slug} onChange={(e) => set("slug", e.target.value)} className={inputCls} placeholder="terms" />
              </Field>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-1 font-bold text-slate-900">Page Content</h3>
            <p className="mb-4 text-sm text-slate-500">Full content rendered on the page.</p>
            <RichTextEditor value={form.content} onChange={(html) => set("content", html)} placeholder="Write page content…" />
          </Card>
        </div>
        <div className="space-y-6 lg:col-span-3">
          <Card className="sticky top-6 p-6">
            <h3 className="mb-4 font-bold text-slate-900">SEO Settings</h3>
            <div className="space-y-4">
              <Field label="Meta Title" hint="Defaults to the page title">
                <input value={form.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} className={inputCls} />
              </Field>
              <Field label="Meta Description" hint="150-160 characters recommended">
                <textarea value={form.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} rows={3} className={`${inputCls} resize-none`} />
              </Field>
              <Field label="Canonical URL" hint="Leave blank to auto-use https://drrajneeshkant.com/{slug}/">
                <input value={form.canonical} onChange={(e) => set("canonical", e.target.value)} className={inputCls} placeholder="https://drrajneeshkant.com/terms" />
              </Field>
              <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="text-sm font-medium text-slate-700">
                  Search engine indexing
                  <span className="block text-xs font-normal text-slate-400">ON = index, follow · OFF = noindex, nofollow</span>
                </span>
                <input type="checkbox" checked={form.robotsIndex} onChange={(e) => set("robotsIndex", e.target.checked)} className="h-5 w-5 accent-sky-500" />
              </label>
              <div className="flex flex-col gap-3">
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="h-4 w-4 accent-sky-500" />
                  <span className="text-sm font-medium text-slate-700">Active (page is live)</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" checked={form.showInMenu} onChange={(e) => set("showInMenu", e.target.checked)} className="h-4 w-4 accent-sky-500" />
                  <span className="text-sm font-medium text-slate-700">Show in footer menu</span>
                </label>
              </div>
            </div>


            <div className="mt-6 space-y-3 border-t pt-6">
              <Button type="submit" disabled={saving}>
                <Save size={16} />
                {saving ? "Saving…" : mode === "edit" ? "Update Page" : "Create Page"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.push("/admin/pages")}>Cancel</Button>
            </div>
          </Card>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
