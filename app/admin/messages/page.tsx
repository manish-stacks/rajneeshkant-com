"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Trash2, MailOpen, Circle } from "lucide-react";
import {
  Card,
  PageHeader,
  Badge,
  EmptyState,
  LoadingState,
  Pagination,
} from "@/components/admin/ui";
import { useToast } from "@/components/admin/useToast";
import api from "@/lib/axios";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const { push, ToastContainer } = useToast();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const load = () => {
    api
      .get("/contact")
      .then((res) => setMessages(res.data.messages || []))
      .catch((err) => push((err as Error).message, "error"))
      .finally(() => setLoading(false));
  };

  const markRead = async (id: string, read: boolean) => {
    try {
      await api.patch(`/contact/${id}`, { read });
      setMessages((p) => p.map((m) => (m._id === id ? { ...m, read } : m)));
    } catch (err) {
      push((err as Error).message, "error");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await api.delete(`/contact/${id}`);
      setMessages((p) => p.filter((m) => m._id !== id));
      push("Message deleted");
    } catch (err) {
      push((err as Error).message, "error");
    }
  };

  const visible =
    filter === "unread" ? messages.filter((m) => !m.read) : messages;
  const unreadCount = messages.filter((m) => !m.read).length;
  const paged = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <PageHeader
        title="Messages"
        subtitle="Contact form enquiries submitted from the website."
      />

      <div className="mb-5 flex gap-2">
        {(["all", "unread"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === f
                ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300"
            }`}
          >
            {f === "all" ? `All (${messages.length})` : `Unread (${unreadCount})`}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingState message="Loading messages..." />
      ) : visible.length === 0 ? (
        <EmptyState message="No messages here." />
      ) : (
        <div className="grid gap-4">
          {paged.map((m) => (
            <Card
              key={m._id}
              className={`p-5 ${!m.read ? "border-sky-200 bg-sky-50/40" : ""}`}
            >
              <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                <div className="min-w-0">
                  <div className="mb-1.5 flex flex-wrap items-center gap-2.5">
                    {!m.read && (
                      <Circle size={8} className="fill-sky-500 text-sky-500" />
                    )}
                    <h3 className="font-semibold text-slate-900">{m.name}</h3>
                    <Badge color={m.read ? "slate" : "blue"}>
                      {m.read ? "Read" : "New"}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-slate-700">
                    {m.subject}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{m.message}</p>
                  <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-500">
                    <a
                      href={`mailto:${m.email}`}
                      className="flex items-center gap-1.5 hover:text-sky-600"
                    >
                      <Mail size={13} />
                      {m.email}
                    </a>
                    {m.phone && (
                      <a
                        href={`tel:${m.phone}`}
                        className="flex items-center gap-1.5 hover:text-sky-600"
                      >
                        <Phone size={13} />
                        {m.phone}
                      </a>
                    )}
                    <span className="text-xs text-slate-400">
                      {new Date(m.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => markRead(m._id, !m.read)}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                  >
                    <MailOpen size={13} />
                    {m.read ? "Mark unread" : "Mark read"}
                  </button>
                  <button
                    onClick={() => remove(m._id)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && visible.length > 0 && (
        <Pagination page={page} pageSize={PAGE_SIZE} total={visible.length} onPageChange={setPage} />
      )}

      <ToastContainer />
    </div>
  );
}
