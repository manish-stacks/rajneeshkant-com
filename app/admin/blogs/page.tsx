"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PlusCircle, Pencil, Trash2, Eye, EyeOff, Search } from "lucide-react";
import api from "@/lib/axios";
import {
  Card,
  PageHeader,
  Button,
  Badge,
  EmptyState,
  LoadingState,
  inputCls,
  Pagination,
} from "@/components/admin/ui";
import { useToast } from "@/components/admin/useToast";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  published: boolean;
  createdAt: string;
  tags: string[];
}

export default function AdminBlogsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const { push, ToastContainer } = useToast();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const load = () => {
    setLoading(true);
    api
      .get("/blogs?admin=1")
      .then((res) => setPosts(res.data.posts || []))
      .catch((err) => push((err as Error).message, "error"))
      .finally(() => setLoading(false));
  };

  const remove = async (slug: string) => {
    if (!confirm("Delete this post permanently?")) return;
    try {
      await api.delete(`/blogs/${slug}`);
      setPosts((p) => p.filter((x) => x.slug !== slug));
      push("Post deleted");
    } catch (err) {
      push((err as Error).message, "error");
    }
  };

  const visible = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );
  const paged = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <PageHeader
        title="Blog Posts"
        subtitle="Create and manage articles shown on the website blog."
        action={
          <Button onClick={() => router.push("/admin/blogs/new")}>
            <PlusCircle size={16} /> New Post
          </Button>
        }
      />

      <div className="relative mb-5 max-w-sm">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className={`${inputCls} pl-10`}
        />
      </div>

      {loading ? (
        <LoadingState message="Loading posts..." />
      ) : visible.length === 0 ? (
        <EmptyState message="No posts found. Create your first blog post." />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="px-6 py-3.5 text-left font-medium text-slate-500">
                    Title
                  </th>
                  <th className="hidden px-6 py-3.5 text-left font-medium text-slate-500 md:table-cell">
                    Category
                  </th>
                  <th className="hidden px-6 py-3.5 text-left font-medium text-slate-500 md:table-cell">
                    Status
                  </th>
                  <th className="hidden px-6 py-3.5 text-left font-medium text-slate-500 lg:table-cell">
                    Created
                  </th>
                  <th className="px-6 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paged.map((post) => (
                  <tr key={post._id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="line-clamp-1 font-medium text-slate-900">
                        {post.title}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        /{post.slug}
                      </p>
                    </td>
                    <td className="hidden px-6 py-4 md:table-cell">
                      <Badge color="cyan">{post.category}</Badge>
                    </td>
                    <td className="hidden px-6 py-4 md:table-cell">
                      {post.published ? (
                        <Badge color="green">
                          <Eye size={11} /> Published
                        </Badge>
                      ) : (
                        <Badge color="slate">
                          <EyeOff size={11} /> Draft
                        </Badge>
                      )}
                    </td>
                    <td className="hidden px-6 py-4 text-xs text-slate-400 lg:table-cell">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/${post.slug}`}
                          target="_blank"
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-sky-50 hover:text-sky-600"
                          title="View on site"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          href={`/admin/blogs/${post.slug}/edit`}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-sky-50 hover:text-sky-600"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>
                        <button
                          onClick={() => remove(post.slug)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {!loading && visible.length > 0 && (
        <Pagination page={page} pageSize={PAGE_SIZE} total={visible.length} onPageChange={setPage} />
      )}

      <ToastContainer />
    </div>
  );
}
