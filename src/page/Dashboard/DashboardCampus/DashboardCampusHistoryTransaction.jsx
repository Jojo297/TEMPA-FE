import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Wallet,
  ReceiptText,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useGetHistoryTransaction from "@/hooks/hooksCampus/useGetHistoryTransaction";
import { useEffect } from "react";
import { Link } from "react-router";
import HeaderPage from "@/components/HeaderPage";

export default function DashboardCampusHistoryTransaction() {
  const token = localStorage.getItem("userJwt");
  const { data, isLoading, error, getHistoryTransaction } =
    useGetHistoryTransaction();

  useEffect(() => {
    if (token) {
      getHistoryTransaction(token);
    }
  }, [token, getHistoryTransaction]);

  const displayHistoryTransaction = data ?? [];
  console.log(displayHistoryTransaction);

  // Helper format Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Math.abs(amount));
  };

  return (
    <>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          {/* Breadcrumb */}
          <div className="mb-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-primary">
                    <Link to="/dashboard-campus/beranda">Beranda</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-primary">
                    <Link to="/dashboard-campus/berlangganan">
                      Berlangganan
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="text-primary">
                  <BreadcrumbPage className="text-primary">
                    Riwayat Transaksi
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header */}
          <HeaderPage
            title={"Riwayat Transaksi"}
            description={
              "Pantau arus kas masuk dan keluar dari dompet kampus Anda secara transparan."
            }
            badge={"Manage Transaction"}
          />

          {/* Datatable Section */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-100 p-2 rounded-lg">
                  <ReceiptText className="h-5 w-5 text-[#013D3A]" />
                </div>
                <h3 className="text-lg font-bold text-[#013D3A]">
                  Daftar Transaksi
                </h3>
              </div>
              <Badge variant="outline" className="font-medium text-slate-500">
                Total {displayHistoryTransaction.length} Transaksi
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="w-[200px] font-bold text-slate-700">
                      Tanggal & Waktu
                    </TableHead>
                    <TableHead className="font-bold text-slate-700">
                      Tipe
                    </TableHead>
                    <TableHead className="font-bold text-slate-700 text-right">
                      Nominal
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center py-20 text-slate-400"
                      >
                        Memuat data transaksi...
                      </TableCell>
                    </TableRow>
                  ) : displayHistoryTransaction.length > 0 ? (
                    displayHistoryTransaction.map((log) => (
                      <TableRow
                        key={log.id}
                        className="hover:bg-slate-50/80 transition-colors"
                      >
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-900">
                              {format(
                                new Date(log.created_at),
                                "dd MMMM yyyy",
                                { locale: id },
                              )}
                            </span>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(log.created_at), "HH:mm", {
                                locale: id,
                              })}{" "}
                              WIB
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {log.is_money_out ? (
                              <div className="bg-rose-100 p-1.5 rounded-full">
                                <ArrowUpRight className="h-4 w-4 text-rose-600" />
                              </div>
                            ) : (
                              <div className="bg-emerald-100 p-1.5 rounded-full">
                                <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-slate-800 capitalize">
                                {log.type === "usage"
                                  ? "Pendaftaran Mentee"
                                  : log.type}
                              </p>
                              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                                ID: #{log.id}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <span
                            className={`text-base font-bold ${log.is_money_out ? "text-rose-600" : "text-emerald-600"}`}
                          >
                            {log.is_money_out ? "-" : "+"}{" "}
                            {formatRupiah(log.amount)}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-20">
                        <div className="flex flex-col items-center gap-2">
                          <Wallet className="h-10 w-10 text-slate-200" />
                          <p className="text-slate-400 font-medium">
                            Belum ada riwayat transaksi.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
