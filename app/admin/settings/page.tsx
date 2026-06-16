"use client";

import { useEffect, useState } from "react";
import { Save, Phone, Search, Share2, Code2 } from "lucide-react";
import api from "@/lib/axios";
import {
  Card,
  PageHeader,
  Button,
  LoadingState,
  Field,
  inputCls,
} from "@/components/admin/ui";
import { useToast } from "@/components/admin/useToast";

interface Settings {
  clinicName: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  facebook: string;
  instagram: string;
  youtube: string;
  openingHours: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  headerCode: string;
  footerCode: string;
  robotsTxt: string;
}

const empty: Settings = {
  clinicName: "",
  phone: "",
  email: "",
  whatsapp: "",
  address: "",
  facebook: "",
  instagram: "",
  youtube: "",
  openingHours: "",
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  headerCode: "",
  footerCode: "",
  robotsTxt: "",
};

export default function AdminSettingsPage() {
  const [form, setForm] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { push, ToastContainer } = useToast();

  useEffect(() => {
    api
      .get("/settings")
      .then((res) => {
        const s = res.data.settings || {};
        setForm({ ...empty, ...s });
      })
      .catch((err) => push((err as Error).message, "error"))
      .finally(() => setLoading(false));
  }, []);

  const set = (k: keyof Settings, v: string) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    try {
      await api.put("/settings", form);
      push("Settings saved successfully");
    } catch (err) {
      push((err as Error).message, "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <LoadingState message="Loading settings..." />;

  return (
    <div>
      <PageHeader
        title="Site Settings"
        subtitle="Update clinic contact details, social links, SEO and custom code."
      />

      <form onSubmit={save} className="space-y-6">
        {/* Contact info */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Phone size={17} />
            </div>
            <h3 className="font-bold text-slate-900">Clinic Contact Details</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Clinic Name">
              <input
                value={form.clinicName}
                onChange={(e) => set("clinicName", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Opening Hours">
              <input
                value={form.openingHours}
                onChange={(e) => set("openingHours", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Phone">
              <input
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="WhatsApp">
              <input
                value={form.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Email">
              <input
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Address">
              <input
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
        </Card>

        {/* Social links */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <Share2 size={17} />
            </div>
            <h3 className="font-bold text-slate-900">Social Media Links</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Facebook URL">
              <input
                value={form.facebook}
                onChange={(e) => set("facebook", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Instagram URL">
              <input
                value={form.instagram}
                onChange={(e) => set("instagram", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="YouTube URL">
              <input
                value={form.youtube}
                onChange={(e) => set("youtube", e.target.value)}
                className={inputCls}
              />
            </Field>
          </div>
        </Card>

        {/* SEO */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Search size={17} />
            </div>
            <h3 className="font-bold text-slate-900">SEO Settings</h3>
          </div>
          <div className="space-y-4">
            <Field
              label="Homepage SEO Title"
              hint="Shown in Google search results and browser tab"
            >
              <input
                value={form.seoTitle}
                onChange={(e) => set("seoTitle", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field
              label="Meta Description"
              hint="150-160 characters recommended"
            >
              <textarea
                value={form.seoDescription}
                onChange={(e) => set("seoDescription", e.target.value)}
                rows={3}
                className={`${inputCls} resize-none`}
              />
            </Field>
            <Field label="Keywords" hint="Comma separated">
              <textarea
                value={form.seoKeywords}
                onChange={(e) => set("seoKeywords", e.target.value)}
                rows={2}
                className={`${inputCls} resize-none`}
              />
            </Field>
          </div>
        </Card>

        {/* Sitemap & robots.txt */}
        <Card className="p-6">
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Search size={17} />
            </div>
            <h3 className="font-bold text-slate-900">Sitemap & robots.txt</h3>
          </div>
          <p className="mb-4 text-sm text-slate-500">
            The XML sitemap is generated automatically and always lists every
            indexable treatment, blog post and page — nothing to maintain by hand.
          </p>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="text-sm font-medium text-slate-700">Live sitemap:</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-sky-600 hover:underline"
              >
                /sitemap.xml
              </a>
              <span className="text-xs text-slate-400">(auto-updates)</span>
            </div>
            <Field
              label="robots.txt content"
              hint="Leave blank to use the default. Saved here is served live at /robots.txt"
            >
              <textarea
                value={form.robotsTxt}
                onChange={(e) => set("robotsTxt", e.target.value)}
                rows={7}
                className={`${inputCls} resize-y font-mono text-xs`}
                placeholder={"User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://drrajneeshkant.com/sitemap.xml"}
              />
            </Field>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-sky-600 hover:underline"
            >
              View current /robots.txt →
            </a>
          </div>
        </Card>

        {/* Custom code injection */}
        <Card className="p-6">
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Code2 size={17} />
            </div>
            <h3 className="font-bold text-slate-900">Custom Code</h3>
          </div>
          <p className="mb-4 text-sm text-slate-500">
            Paste analytics, verification or pixel scripts. Header code loads
            inside <code className="text-xs">&lt;head&gt;</code>; footer code
            loads before the closing <code className="text-xs">&lt;/body&gt;</code>.
          </p>
          <div className="space-y-4">
            <Field
              label="Header Code"
              hint="e.g. Google Analytics, Search Console verification, meta pixel"
            >
              <textarea
                value={form.headerCode}
                onChange={(e) => set("headerCode", e.target.value)}
                rows={6}
                className={`${inputCls} resize-y font-mono text-xs`}
                placeholder="<!-- Google tag (gtag.js) -->"
              />
            </Field>
            <Field
              label="Footer Code"
              hint="e.g. chat widgets, conversion scripts"
            >
              <textarea
                value={form.footerCode}
                onChange={(e) => set("footerCode", e.target.value)}
                rows={6}
                className={`${inputCls} resize-y font-mono text-xs`}
                placeholder="<!-- footer scripts -->"
              />
            </Field>
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            <Save size={16} />
            {saving ? "Saving..." : "Save All Settings"}
          </Button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}
