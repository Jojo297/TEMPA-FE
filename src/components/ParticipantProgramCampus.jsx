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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, SendHorizonal, Mail, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import NotFounPages from "./NotFoundPages";
import CampusSendMessage from "./CampusSendMessage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useSendMessage from "@/hooks/hooksCampus/useSendMessage";
import { toast } from "sonner";
import useSendBulkMessage from "@/hooks/hooksCampus/useSendBulkMessage";
import { ParticipantAnalytics } from "./ParticipantAnalytics";

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
  idCampus,
  token,
}) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const { isLoading, error, successMessage, sendBulkMessage } =
    useSendBulkMessage();
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);

  // Form for bulk message
  const formBulkMessage = useForm({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

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
      {
        id: "no",
        header: "No",
        cell: ({ row }) => row.index + 1,
      },
      {
        accessorKey: "username",
        header: "Nama Mentee",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
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
      {
        id: "actions",
        header: "Kirim Pesan",
        cell: ({ row }) => {
          return (
            <CampusSendMessage
              idCampus={idCampus}
              idMentee={row.original.id}
              menteeName={row.original.username}
              token={token}
            />
          );
        },
      },
    ],
    [idCampus, token]
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
        `Pesan berhasil dikirim ke ${selectedMentees.length} mentee`
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
      <ParticipantAnalytics menteeList={menteeList} />
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
            {/* button send bulk message */}
            {selectedMentees.length > 0 && (
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
                      Pesan ini akan dikirimkan ke semua mentee yang Anda pilih.
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
                          Pastikan pesan Anda bersifat umum dan relevan untuk
                          semua penerima yang dipilih.
                        </AlertDescription>
                      </div>
                    </div>
                  </Alert>

                  <Form {...formBulkMessage}>
                    <form
                      onSubmit={formBulkMessage.handleSubmit(onSendBulkMessage)}
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
            )}
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
                                  header.getContext()
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
                              cell.getContext()
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
