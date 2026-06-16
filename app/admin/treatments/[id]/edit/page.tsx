"use client";

import { useEffect, useState, use } from "react";
import api from "@/lib/axios";
import TreatmentForm, {
  TreatmentFormValues,
  emptyTreatment,
} from "@/components/admin/TreatmentForm";
import { LoadingState, EmptyState } from "@/components/admin/ui";

export default function EditTreatmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [initial, setInitial] = useState<TreatmentFormValues | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get(`/treatments/${id}`)
      .then((res) => {
        const t = res.data.treatment;
        setInitial({
          ...emptyTreatment,
          name: t.name || "",
          slug: t.slug || "",
          shortDesc: t.shortDesc || "",
          content: t.content || t.longDesc || "",
          image: t.image || "",
          icon: t.icon || "🦴",
          conditions: (t.conditions || []).join(", "),
          metaTitle: t.metaTitle || "",
          metaDescription: t.metaDescription || "",
          canonical: t.canonical || "",
          robotsIndex: t.robotsIndex !== false,
          showInMenu: t.showInMenu !== false,
          order: t.order ?? 0,
          active: t.active ?? true,
        });
      })
      .catch(() => setError(true));
  }, [id]);

  if (error)
    return <EmptyState message="Treatment not found." />;
  if (!initial) return <LoadingState message="Loading treatment…" />;

  return (
    <TreatmentForm mode="edit" initial={initial} treatmentId={id} />
  );
}
