"use client";

import { useEffect, useState, use } from "react";
import api from "@/lib/axios";
import BlogForm, { BlogFormValues, emptyBlog } from "@/components/admin/BlogForm";
import { LoadingState, EmptyState } from "@/components/admin/ui";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [initial, setInitial] = useState<BlogFormValues | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .get(`/blogs/${slug}?admin=1`)
      .then((res) => {
        const p = res.data.post;
        setInitial({
          ...emptyBlog,
          title: p.title || "",
          excerpt: p.excerpt || "",
          content: p.content || "",
          coverImage: p.coverImage || "",
          category: p.category || "General",
          tags: (p.tags || []).join(", "),
          readTime: p.readTime || "5 min read",
          metaTitle: p.metaTitle || "",
          metaDescription: p.metaDescription || "",
          canonical: p.canonical || "",
          robotsIndex: p.robotsIndex !== false,
          published: p.published || false,
        });
      })
      .catch(() => setError(true));
  }, [slug]);

  if (error) return <EmptyState message="Blog post not found." />;
  if (!initial) return <LoadingState message="Loading post…" />;

  return <BlogForm mode="edit" initial={initial} slug={slug} />;
}
