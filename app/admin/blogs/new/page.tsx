"use client";

import BlogForm, { emptyBlog } from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return <BlogForm mode="new" initial={emptyBlog} />;
}
