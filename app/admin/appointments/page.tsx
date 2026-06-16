"use client";

import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Trash2,
} from "lucide-react";
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

interface Appointment {
  _id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  treatment?: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
}

const statusColor: Record<string, "amber" | "blue" | "green" | "rose"> = {
  pending: "amber",
  confirmed: "blue",
  completed: "green",
  cancelled: "rose",
};

const FILTERS = ["all", "pending", "confirmed", "completed", "cancelled"];

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;
  const { push, ToastContainer } = useToast();

  useEffect(() => {
    api
      .get("/appointments")
      .then((res) => setAppointments(res.data.appointments || []))
      .catch((err) => push((err as Error).message, "error"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.patch(`/appointments/${id}`, { status });
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status: status as Appointment["status"] } : a
        )
      );
      push(`Appointment marked ${status}`);
    } catch (err) {
      push((err as Error).message, "error");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this appointment permanently?")) return;
    try {
      await api.delete(`/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
      push("Appointment deleted");
    } catch (err) {
      push((err as Error).message, "error");
    }
  };

  const filtered =
    filter === "all"
      ? appointments
      : appointments.filter((a) => a.status === filter);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <PageHeader
        title="Appointments"
        subtitle="Review, confirm and manage patient booking requests."
      />

      {/* Filters */}
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((s) => {
          const count =
            s === "all"
              ? appointments.length
              : appointments.filter((a) => a.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                filter === s
                  ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-sky-300"
              }`}
            >
              {s} ({count})
            </button>
          );
        })}
      </div>

      {loading ? (
        <LoadingState message="Loading appointments..." />
      ) : filtered.length === 0 ? (
        <EmptyState message="No appointments in this category." />
      ) : (
        <div className="grid gap-4">
          {paged.map((appt) => (
            <Card key={appt._id} className="p-5">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2.5">
                    <h3 className="font-semibold text-slate-900">{appt.name}</h3>
                    <Badge color={statusColor[appt.status]}>{appt.status}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <Phone size={13} />
                      {appt.phone}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail size={13} />
                      {appt.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {new Date(appt.date).toDateString()}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} />
                      Booked {new Date(appt.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {appt.treatment && (
                    <p className="mt-2 text-sm font-medium text-sky-600">
                      Treatment: {appt.treatment}
                    </p>
                  )}
                  {appt.message && (
                    <p className="mt-1 text-sm italic text-slate-500">
                      &ldquo;{appt.message}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  {appt.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(appt._id, "confirmed")}
                        className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
                      >
                        <CheckCircle size={14} /> Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(appt._id, "cancelled")}
                        className="flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-100"
                      >
                        <XCircle size={14} /> Cancel
                      </button>
                    </>
                  )}
                  {appt.status === "confirmed" && (
                    <button
                      onClick={() => updateStatus(appt._id, "completed")}
                      className="flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
                    >
                      <CheckCircle size={14} /> Mark Complete
                    </button>
                  )}
                  <button
                    onClick={() => remove(appt._id)}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <Pagination page={page} pageSize={PAGE_SIZE} total={filtered.length} onPageChange={setPage} />
      )}

      <ToastContainer />
    </div>
  );
}
