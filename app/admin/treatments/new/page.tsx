"use client";

import TreatmentForm, { emptyTreatment } from "@/components/admin/TreatmentForm";

export default function NewTreatmentPage() {
  return <TreatmentForm mode="new" initial={emptyTreatment} />;
}
