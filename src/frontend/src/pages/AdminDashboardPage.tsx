import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Loader2,
  LogOut,
  MapPin,
  Phone,
  RefreshCw,
  Trash2,
  Users,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Booking } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useDeleteBooking,
  useGetAllBookings,
  useIsCallerAdmin,
  useUpdateBookingStatus,
} from "../hooks/useQueries";

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  Completed: "bg-green-100 text-green-800 border-green-200",
  Cancelled: "bg-red-100 text-red-800 border-red-200",
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const { clear, identity, isInitializing } = useInternetIdentity();
  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    refetch,
  } = useGetAllBookings();
  const updateStatus = useUpdateBookingStatus();
  const deleteBooking = useDeleteBooking();

  const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null);

  // Auth guard — redirect if not logged in or not admin
  useEffect(() => {
    if (!isInitializing && !identity) {
      void router.navigate({ to: "/admin" });
    }
  }, [isInitializing, identity, router]);

  useEffect(() => {
    if (!adminLoading && isAdmin === false) {
      void router.navigate({ to: "/admin" });
    }
  }, [adminLoading, isAdmin, router]);

  const handleLogout = () => {
    clear();
    void router.navigate({ to: "/admin" });
  };

  const handleStatusChange = async (id: bigint, status: string) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await deleteBooking.mutateAsync(deleteTarget.id);
      toast.success("Booking deleted successfully");
      setDeleteTarget(null);
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    confirmed: bookings.filter((b) => b.status === "Confirmed").length,
    completed: bookings.filter((b) => b.status === "Completed").length,
    cancelled: bookings.filter((b) => b.status === "Cancelled").length,
  };

  const formatDateTime = (dt: string) => {
    try {
      return new Date(dt).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dt;
    }
  };

  if (isInitializing || adminLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center hero-gradient">
        <div className="flex items-center gap-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="font-medium">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading text-lg font-black text-foreground">
                Shruan Admin
              </h1>
              <p className="text-xs text-muted-foreground">
                Booking Management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={bookingsLoading}
              className="gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${bookingsLoading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              data-ocid="admin.logout_button"
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              label: "Total Bookings",
              val: stats.total,
              icon: Users,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Pending",
              val: stats.pending,
              icon: Clock,
              color: "text-yellow-600",
              bg: "bg-yellow-50",
            },
            {
              label: "Confirmed",
              val: stats.confirmed,
              icon: CheckCircle2,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Completed",
              val: stats.completed,
              icon: CheckCircle2,
              color: "text-green-600",
              bg: "bg-green-50",
            },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <div
                  className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}
                >
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <p className="font-heading text-2xl font-black text-foreground">
                  {stat.val}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bookings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border bg-card overflow-hidden"
        >
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-heading text-xl font-bold text-foreground">
              All Bookings
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {stats.total} total booking{stats.total !== 1 ? "s" : ""}
            </p>
          </div>

          {bookingsLoading ? (
            <div
              data-ocid="admin.bookings_table"
              className="flex items-center justify-center py-16"
            >
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Loading bookings...</span>
              </div>
            </div>
          ) : bookings.length === 0 ? (
            <div
              data-ocid="admin.bookings_table"
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <Calendar className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground">
                No bookings yet
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                New bookings will appear here once customers submit the form.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <Table data-ocid="admin.bookings_table">
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="font-semibold text-foreground">
                        Customer
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Service
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Address
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Date & Time
                      </TableHead>
                      <TableHead className="font-semibold text-foreground">
                        Status
                      </TableHead>
                      <TableHead className="font-semibold text-foreground text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking, index) => (
                      <TableRow
                        key={String(booking.id)}
                        className="border-border hover:bg-secondary/50"
                      >
                        <TableCell>
                          <div>
                            <p className="font-semibold text-foreground">
                              {booking.customerName}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <Phone className="h-3 w-3" />
                              {booking.phone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <Wrench className="h-3.5 w-3.5 text-primary" />
                            <span className="text-sm text-foreground">
                              {booking.service}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[160px] flex items-start gap-1">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                            <span className="text-xs text-muted-foreground line-clamp-2">
                              {booking.address}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-foreground whitespace-nowrap">
                            {formatDateTime(booking.dateTime)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={booking.status}
                            onValueChange={(val) =>
                              handleStatusChange(booking.id, val)
                            }
                          >
                            <SelectTrigger
                              data-ocid={`admin.status_select.${index + 1}`}
                              className="h-8 w-[130px] text-xs"
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "Pending",
                                "Confirmed",
                                "Completed",
                                "Cancelled",
                              ].map((s) => (
                                <SelectItem
                                  key={s}
                                  value={s}
                                  className="text-xs"
                                >
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            data-ocid={`admin.delete_button.${index + 1}`}
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeleteTarget(booking)}
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-border">
                {bookings.map((booking, index) => (
                  <div key={String(booking.id)} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-foreground">
                          {booking.customerName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {booking.phone}
                        </p>
                      </div>
                      <Badge
                        className={`text-xs border ${STATUS_COLORS[booking.status] || "bg-gray-100"}`}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Wrench className="h-3.5 w-3.5" />
                        <span>{booking.service}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDateTime(booking.dateTime)}</span>
                      </div>
                      <div className="flex items-start gap-2 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                        <span className="text-xs">{booking.address}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={booking.status}
                        onValueChange={(val) =>
                          handleStatusChange(booking.id, val)
                        }
                      >
                        <SelectTrigger
                          data-ocid={`admin.status_select.${index + 1}`}
                          className="h-8 flex-1 text-xs"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Pending",
                            "Confirmed",
                            "Completed",
                            "Cancelled",
                          ].map((s) => (
                            <SelectItem key={s} value={s} className="text-xs">
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        data-ocid={`admin.delete_button.${index + 1}`}
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteTarget(booking)}
                        className="shrink-0 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Delete Booking
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the booking for{" "}
              <strong>{deleteTarget?.customerName}</strong>? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          {deleteTarget && (
            <div className="rounded-lg bg-secondary p-3 text-sm space-y-1">
              <p className="font-medium text-foreground">
                {deleteTarget.customerName}
              </p>
              <p className="text-muted-foreground">{deleteTarget.service}</p>
              <p className="text-muted-foreground">
                {formatDateTime(deleteTarget.dateTime)}
              </p>
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              data-ocid="admin.cancel_button"
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={deleteBooking.isPending}
            >
              Cancel
            </Button>
            <Button
              data-ocid="admin.confirm_button"
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteBooking.isPending}
              className="gap-2"
            >
              {deleteBooking.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" /> Delete Booking
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
