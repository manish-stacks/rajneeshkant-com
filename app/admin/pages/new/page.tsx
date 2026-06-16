"use client";

import PageForm, { emptyPage } from "@/components/admin/PageForm";

export default function NewPagePage() {
  return <PageForm mode="new" initial={emptyPage} />;
}
