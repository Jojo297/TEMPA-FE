import useGetDetailProgram from "@/hooks/hooksCampus/useGetDetailProgram";
import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertCircleIcon,
  SendHorizonal,
  Mail,
  Search,
  Lock,
  Sparkles,
  ArrowRight,
  HardHat,
  Award,
  Check,
  X,
  Minus,
  QrCode,
} from "lucide-react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import NotFounPages from "./NotFoundPages";
import CampusSendMessage from "./CampusSendMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import useSendBulkMessage from "@/hooks/hooksCampus/useSendBulkMessage";
import { ParticipantAnalytics } from "./ParticipantAnalytics";
import { jwtDecode } from "jwt-decode";
import { DialogGenerateCertificate } from "./DialogGenerateCertificate";
import { DialogGenerateQrCodePresensi } from "./DialogGenerateQrCodePresensi";
import { QRCodeSVG } from "qrcode.react";

const InDevelopmentDialog = ({ isOpen, onOpenChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-200 transform transition-all animate-in zoom-in-95">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-white/50">
          <HardHat className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Fitur Segera Hadir!
        </h3>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Fitur pembuatan sertifikat otomatis sedang dalam tahap pengembangan.
          Kami akan segera memberitahu Anda jika fitur ini sudah siap digunakan.
        </p>
        <Button
          onClick={() => onOpenChange(false)}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5"
        >
          Mengerti
        </Button>
      </div>
    </div>
  );
};

const PremiumFeatureDialog = ({ isOpen, onOpenChange, token }) => {
  const navigate = useNavigate();
  const decode = jwtDecode(token);
  const role = decode.role;
  // console.log(decode.role);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in-50">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-200 transform transition-all animate-in zoom-in-95">
        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-white/50">
          <Sparkles className="w-10 h-10 text-amber-600" strokeWidth={1.5} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Fitur Premium Terkunci
        </h3>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Akses database email peserta dan kirim pesan langsung dengan
          berlangganan paket premium kami.
        </p>
        <div className="flex flex-col gap-3">
          {!role === "mentor" && (
            <Button
              onClick={() => {
                navigate("/dashboard-campus/berlangganan");
                onOpenChange(false);
              }}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              Lihat Paket Berlangganan
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            Nanti Saja
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ========================== COMPONENT INFO ========================== */
function Info({ label, value }) {
  return (
    <div>
      <p className="font-medium text-gray-600">{label}</p>
      <p className="text-gray-900">{value || "-"}</p>
    </div>
  );
}

const MessageSchema = z.object({
  subject: z.string().min(5, "Subjek wajib diisi minimal 5 karakter."),
  message: z.string().min(10, "Pesan wajib diisi minimal 10 karakter."),
});

export default function ParticipantProgramCampus({
  menteeList,
  statusSubscription,
  idCampus,
  token,
  sendMail,
  startProgram,
  endProgram,
}) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const { isLoading, error, successMessage, sendBulkMessage } =
    useSendBulkMessage();
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [isPremiumDialogOpen, setIsPremiumDialogOpen] = useState(false);
  const [isInDevelopmentDialogOpen, setIsInDevelopmentDialogOpen] =
    useState(false);

  // console.log(startProgram, endProgram);

  // Form for bulk message
  const formBulkMessage = useForm({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const getDayProgram = (startDate, endDate) => {
    if (!startDate || !endDate) return "-";
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // console.log(diffDays);
    return diffDays;
  };

  // console.log(menteeList);

  // Columns definition
  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      // number
      {
        id: "no",
        header: "No",
        cell: ({ row }) => row.index + 1,
      },
      // username
      {
        accessorKey: "username",
        header: "Nama Mentee",
      },
      // email
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
          const email = row.getValue("email");
          if (email === null) {
            return (
              <div className="relative blur-sm select-none pointer-events-none">
                <span className="">xxxxx@example.com</span>
                <div className="absolute inset-0 flex items-center justify-center bg-white/20"></div>
              </div>
            );
          }
          return (
            <a href={`mailto:${email}`} className="hover:underline">
              {email}
            </a>
          );
        },
      },
      // completion status
      {
        accessorKey: "completion_status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("completion_status");
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {status === "completed" ? "Selesai" : "Sedang Berjalan"}
            </span>
          );
        },
      },
      // presensi
      {
        header: "Presensi",
        id: "presensi",
        cell: ({ row }) => {
          // get duration program
          const totalDays = getDayProgram(startProgram, endProgram);

          const rawAttendance = ["pending"];

          // Transform so that the length is exactly the same as totalDays
          const attendanceData = Array.from({ length: totalDays }, (_, i) => {
            return rawAttendance[i] ?? "pending";
          });

          return (
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-[120px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1">
              {attendanceData.map((status, index) => {
                if (status === "present") {
                  return (
                    <div
                      key={index}
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm transition-transform hover:scale-110"
                    >
                      <Check className="h-2 w-2 stroke-[4px]" />
                    </div>
                  );
                }

                if (status === "absent") {
                  return (
                    <div
                      key={index}
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition-transform hover:scale-110"
                    >
                      <X className="h-2 w-2 stroke-[4px]" />
                    </div>
                  );
                }

                // Status 'pending' atau belum saatnya (Abu-abu)
                return (
                  <div
                    key={index}
                    className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-400 text-white/80 shadow-sm transition-opacity hover:opacity-80"
                  >
                    <Minus className="h-2 w-2 stroke-[4px]" />
                  </div>
                );
              })}
            </div>
          );
        },
      },
      // send email
      {
        id: "actions",
        header: "Kirim Pesan",
        cell: ({ row }) => {
          if (sendMail) {
            return (
              <CampusSendMessage
                idCampus={idCampus}
                idMentee={row.original.id}
                menteeName={row.original.username}
                token={token}
              />
            );
          }
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => setIsPremiumDialogOpen(true)}
                  >
                    <SendHorizonal size={16} className="text-gray-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrade untuk mengirim pesan</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        },
      },
    ],
    [idCampus, token, statusSubscription],
  );

  const table = useReactTable({
    data: menteeList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    state: {
      rowSelection,
      columnFilters,
    },
  });

  const selectedMentees = table
    .getFilteredSelectedRowModel()
    .rows.map((row) => row.original);

  const onSendBulkMessage = async (data) => {
    if (selectedMentees.length === 0) {
      toast.error("Pilih setidaknya satu mentee.");
      return;
    }
    data.idCampus = idCampus;
    data.idMentee = selectedMentees.map((mentee) => mentee.id);
    // console.log(data);

    const result = await sendBulkMessage(token, data);

    if (result) {
      toast.success(
        `Pesan berhasil dikirim ke ${selectedMentees.length} mentee`,
      );
      setIsBulkDialogOpen(false);
      setRowSelection({}); // Reset selection
      formBulkMessage.reset();
    } else {
      toast.error("Gagal mengirim pesan ke semua mentee yang dipilih.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mb-10">
      <PremiumFeatureDialog
        isOpen={isPremiumDialogOpen}
        token={token}
        onOpenChange={setIsPremiumDialogOpen}
      />

      <DialogGenerateCertificate
        isOpen={isInDevelopmentDialogOpen}
        onOpenChange={setIsInDevelopmentDialogOpen}
        menteeList={selectedMentees}
      />
      <ParticipantAnalytics
        menteeList={menteeList}
        statusSubscription={statusSubscription}
      />
      <div className="bg-white shadow-md rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary">
            Peserta yang mendaftar
          </h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500"
                aria-hidden="true"
              />
              <Input
                placeholder="Cari nama mentee..."
                value={table.getColumn("username")?.getFilterValue() ?? ""}
                onChange={(event) =>
                  table
                    .getColumn("username")
                    ?.setFilterValue(event.target.value)
                }
                className="pl-9 max-w-sm"
              />
            </div>

            {/* button generate certificate */}
            {!statusSubscription ? (
              // if not subscription
              <Button
                variant="outline"
                onClick={() => setIsPremiumDialogOpen(true)}
                className="border-primary text-primary hover:bg-primary/5 hover:text-primary flex items-center gap-2"
              >
                <Award size={16} />
                Generate Sertifikat ({selectedMentees.length})
              </Button>
            ) : (
              // if subscription
              <Button
                variant="outline"
                onClick={() => setIsInDevelopmentDialogOpen(true)}
                className="border-primary text-primary hover:bg-primary/5 hover:text-primary flex items-center gap-2"
              >
                <Award size={16} />
                Generate Sertifikat ({selectedMentees.length})
              </Button>
            )}
            {/* button send bulk message */}
            {selectedMentees.length > 0 && (
              <>
                {/* Tombol Kirim Pesan */}
                {sendMail ? (
                  <Dialog
                    open={isBulkDialogOpen}
                    onOpenChange={setIsBulkDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-primary text-white hover:bg-[#013B35]/90 flex items-center gap-2">
                        <Mail size={16} />
                        Kirim Pesan ({selectedMentees.length})
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>
                          Kirim Pesan ke {selectedMentees.length} Mentee
                        </DialogTitle>
                        <DialogDescription>
                          Pesan ini akan dikirimkan ke semua mentee yang Anda
                          pilih.
                        </DialogDescription>
                      </DialogHeader>

                      <Alert className="relative overflow-hidden border-none bg-blue-50/50 px-4 py-3 shadow-sm ring-1 ring-blue-100">
                        <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />
                        <div className="flex items-start gap-3">
                          <AlertCircleIcon className="mt-0.5 h-5 w-5 text-blue-600" />
                          <div className="grid gap-1">
                            <AlertTitle className="text-sm font-bold leading-none tracking-tight text-blue-900">
                              Informasi Pengiriman Masal
                            </AlertTitle>
                            <AlertDescription className="text-sm leading-relaxed text-blue-700/90">
                              Pastikan pesan Anda bersifat umum dan relevan
                              untuk semua penerima yang dipilih.
                            </AlertDescription>
                          </div>
                        </div>
                      </Alert>

                      <Form {...formBulkMessage}>
                        <form
                          onSubmit={formBulkMessage.handleSubmit(
                            onSendBulkMessage,
                          )}
                          className="space-y-4"
                        >
                          <FormField
                            control={formBulkMessage.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subjek</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Masukkan subjek pesan..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={formBulkMessage.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Pesan</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Tulis pesan Anda di sini..."
                                    className="min-h-[100px]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button type="button" variant="outline">
                                Batal
                              </Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading}>
                              {isLoading ? (
                                <div className="flex items-center gap-2">
                                  <Spinner /> Mengirim...
                                </div>
                              ) : (
                                "Kirim Pesan"
                              )}
                            </Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <Button
                    onClick={() => setIsPremiumDialogOpen(true)}
                    className="bg-primary text-white hover:bg-[#013B35]/90 flex items-center gap-2"
                  >
                    <Mail size={16} />
                    Kirim Pesan ({selectedMentees.length})
                  </Button>
                )}
              </>
            )}
            {/* button generate qr-code */}
            <Dialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 hover:text-primary flex items-center gap-2"
                >
                  <QrCode size={16} />
                  Presensi
                </Button>
              </DialogTrigger>
              <DialogGenerateQrCodePresensi />
            </Dialog>
          </div>
        </div>

        <div className="w-full gap-4">
          {menteeList.length <= 0 ? (
            <NotFounPages message="Belum Ada Mentee yang Mendaftar" />
          ) : (
            <div className="rounded-md border">
              {/* table */}
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        Tidak ada data.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
          {/* Pagination if needed */}
          {menteeList.length > 10 && (
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
