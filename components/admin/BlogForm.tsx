"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import api from "@/lib/axios";
import { Card, Button, Field, inputCls } from "@/components/admin/ui";
import { useToast } from "@/components/admin/useToast";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ImageUpload from "@/components/admin/ImageUpload";

export interface BlogFormValues {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string;
  readTime: string;
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  robotsIndex: boolean;
  published: boolean;
}

export const emptyBlog: BlogFormValues = {
  title: "",
  excerpt: "",
  content: "",
  coverImage: "",
  category: "General",
  tags: "",
  readTime: "5 min read",
  metaTitle: "",
  metaDescription: "",
  canonical: "",
  robotsIndex: true,
  published: false,
};

const CATEGORIES = [
  "General",
  "Back Pain",
  "Neck Pain",
  "Sciatica",
  "Shoulder",
  "Sports",
  "Chiropractic",
  "Headache",
  "Wellness",
];

interface Props {
  mode: "new" | "edit";
  initial: BlogFormValues;
  slug?: string;
}

export default function BlogForm({ mode, initial, slug }: Props) {
  const router = useRouter();
  const { push, ToastContainer } = useToast();
  const [form, setForm] = useState<BlogFormValues>(initial);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof BlogFormValues>(
    key: K,
    value: BlogFormValues[K]
  ) => setForm((f) => ({ ...f, [key]: value }));

  const submit = async (publish: boolean) => {
    if (!form.title || !form.excerpt || !form.content) {
      push("Title, excerpt and content are required", "error");
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      published: publish,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      if (mode === "edit" && slug) {
        await api.put(`/blogs/${slug}`, payload);
        push("Post updated");
      } else {
        await api.post("/blogs", payload);
        push("Post created");
      }
      setTimeout(() => {
        router.push("/admin/blogs");
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
        href="/admin/blogs"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-sky-600"
      >
        <ArrowLeft size={16} /> Back to Blog Posts
      </Link>

      <h2 className="mb-6 text-xl font-bold text-slate-900">
        {mode === "edit" ? "Edit Blog Post" : "Write New Blog Post"}
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(form.published);
        }}
        className="grid gap-6 lg:grid-cols-10"
      >
        <div className="space-y-6 lg:col-span-7">
          {/* Main */}
          <Card className="p-6">
            <h3 className="mb-4 font-bold text-slate-900">Post Details</h3>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Title *">
                  <input
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    className={inputCls}
                    placeholder="Post title"
                    required
                  />
                </Field>
                <Field label="Category">
                  <select
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    className={inputCls}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field
                label="Cover Image"
                hint="Upload from your device or paste a link"
              >
                <ImageUpload
                  value={form.coverImage}
                  onChange={(url) => set("coverImage", url)}
                  label="Cover image"
                />
              </Field>

              <Field
                label="Excerpt *"
                hint="Short summary shown on listing pages"
              >
                <textarea
                  value={form.excerpt}
                  onChange={(e) => set("excerpt", e.target.value)}
                  rows={2}
                  className={`${inputCls} resize-none`}
                  required
                />
              </Field>
            </div>
          </Card>

          {/* Content */}
          <Card className="p-6">
            <h3 className="mb-1 font-bold text-slate-900">Article Content</h3>
            <p className="mb-4 text-sm text-slate-500">
              Write the full article using the editor below.
            </p>
            <RichTextEditor
              value={form.content}
              onChange={(html) => set("content", html)}
              placeholder="Write your article…"
            />
          </Card>
        </div>
        <div className="space-y-6 lg:col-span-3">
          {/* Meta + SEO */}
          <Card className="sticky top-6 p-6">
            <h3 className="mb-4 font-bold text-slate-900">
              SEO & Meta
            </h3>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Tags" hint="Comma separated">
                  <input
                    value={form.tags}
                    onChange={(e) => set("tags", e.target.value)}
                    className={inputCls}
                    placeholder="back pain, chiropractic"
                  />
                </Field>
                <Field label="Read Time">
                  <input
                    value={form.readTime}
                    onChange={(e) => set("readTime", e.target.value)}
                    className={inputCls}
                    placeholder="5 min read"
                  />
                </Field>
              </div>
              <Field label="Meta Title" hint="Defaults to the post title">
                <input
                  value={form.metaTitle}
                  onChange={(e) => set("metaTitle", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field
                label="Meta Description"
                hint="Defaults to the excerpt (150-160 chars ideal)"
              >
                <textarea
                  value={form.metaDescription}
                  onChange={(e) => set("metaDescription", e.target.value)}
                  rows={4}
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
                  placeholder="https://drrajneeshkant.com/my-post/"
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
            </div>


            <div className="mt-6 space-y-3 border-t pt-6">
              <Button
                type="button"
                onClick={() => submit(true)}
                disabled={saving}
                className="w-full"
              >
                <Save size={16} />
                {saving ? "Saving…" : "Publish"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => submit(false)}
                disabled={saving}
                className="w-full"
              >
                Save as Draft
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => router.push("/admin/blogs")}
                className="w-full"
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
