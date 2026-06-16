"use client";

import { useEffect, useState, use } from "react";
import api from "@/lib/axios";
import PageForm, { PageFormValues, emptyPage } from "@/components/admin/PageForm";
import { LoadingState, EmptyState } from "@/components/admin/ui";

export default function EditPagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [initial, setInitial] = useState<PageFormValues | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get(`/pages/${id}`)
      .then((res) => {
        const p = res.data.page;
        setInitial({
          ...emptyPage,
          title: p.title || "",
          slug: p.slug || "",
          content: p.content || "",
          metaTitle: p.metaTitle || "",
          metaDescription: p.metaDescription || "",
          canonical: p.canonical || "",
          robotsIndex: p.robotsIndex !== false,
          showInMenu: p.showInMenu === true,
          active: p.active !== false,
        });
      })
      .catch(() => setError(true));
  }, [id]);

  if (error) return <EmptyState message="Page not found." />;
  if (!initial) return <LoadingState message="Loading page…" />;
  return <PageForm mode="edit" initial={initial} pageId={id} />;
}
