import useGetAllCampus from "@/hooks/hooksAdmin/useGetAllCampus";
import DashboardAdminCampusSkeleton from "@/components/DashboardAdminCampusSkeleton";
import { Search, Plus, X, Trash2, AlertTriangleIcon, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useGetAllMentee from "@/hooks/hooksAdmin/useGetAllMentee";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

export default function DashboardAdminServices() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const [services, setServices] = useState([
    {
      id: 1,
      service_name: "Tempa Berkembang",
      benefit: [
        "Tambahkan 5 Program",
        "Tambahkan 5 Program",
        "Masukkan 5 Materi Per-Program",
      ],
      price: 2000000,
      duration: "6 Bulan",
    },
    {
      id: 2,
      service_name: "Tempa Dasar",
      benefit: [
        "Akses 3 Program Dasar",
        "Materi Pendahuluan",
        "Sertifikat Digital",
      ],
      price: 500000,
      duration: "3 Bulan",
    },
    {
      id: 3,
      service_name: "Tempa Menengah",
      benefit: ["Akses 10 Program", "Mentoring Mingguan", "Proyek Riil"],
      price: 1500000,
      duration: "6 Bulan",
    },
    {
      id: 4,
      service_name: "Tempa Profesional",
      benefit: [
        "Akses Semua Program",
        "Mentoring 1-on-1",
        "Jaminan Penyaluran Kerja",
      ],
      price: 5000000,
      duration: "12 Bulan",
    },
  ]);

  const filteredData = services.filter((item) =>
    item.service_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddService = (newServiceData) => {
    const newId =
      services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1;
    const newService = { ...newServiceData, id: newId };
    setServices((prev) => [...prev, newService]);
  };

  const handleUpdateService = (id, updatedData) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id ? { ...service, ...updatedData } : service
      )
    );
  };

  return (
    <div className="p-2 w-full">
      {/* breadcum */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-admin/beranda">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-primary">
            <BreadcrumbPage className="text-primary">Layanan</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className=" mb-8 text-center">
        <div className="bg-primary text-white rounded-xl p-6 shadow">
          <h1 className="text-2xl font-bold mb-2">Layanan</h1>
          <p className="text-sm max-w-2xl mx-auto">
            Kelola data layanan yang tersedia dalam sistem. Anda dapat menambah,
            melihat, mengubah, dan menghapus layanan.
          </p>
        </div>
      </div>
      {/* verivication campus */}
      <div className="bg-white text-gray-900 shadow-md rounded-xl border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-primary">Layanan</h2>
          <div className="flex gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Cari layanan..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <AddServiceDialog onAdd={handleAddService} />
          </div>
        </div>

        <div className="rounded-md border border-gray-200 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="hover:bg-gray-50 border-b border-gray-200">
                <TableHead className="text-gray-700  font-bold w-[50px]">
                  No
                </TableHead>
                <TableHead className="text-gray-700 font-bold">
                  Nama Layanan
                </TableHead>

                <TableHead className="text-gray-700  font-bold">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-gray-50 border-b border-gray-100 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-700">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-base truncate text-gray-900">
                            {item.service_name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="flex gap-4">
                      {/* lihat detail */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-secondary hover:bg-secondary hover:opacity-70 transition">
                            {<Eye size={16} />} Lihat Detail
                          </Button>
                        </DialogTrigger>
                        <ServiceDialogContent
                          item={item}
                          onUpdate={handleUpdateService}
                        />
                      </Dialog>

                      {/* delete sevive */}
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button
                            className={
                              "bg-red-500 hover:opacity-60 transition text-white px-4 py-2 text-sm rounded-lg shadow-md flex items-center gap-2"
                            }
                          >
                            {<Trash2 size={16} />}
                            Hapus Layanan
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader className="flex flex-col items-center gap-1">
                            <div className="bg-gray-200 p-2 rounded-sm">
                              {/* AlertTriangleIcon hanya muncul jika className kosong/null/undefined */}
                              <AlertTriangleIcon className="text-gray-400" />
                            </div>

                            <AlertDialogTitle className="text-xl font-semibold">
                              Hapus Layanan {item.service_name}?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-600 mb-4 text-center">
                              Apakah Anda yakin ingin menghapus layanan ini?
                              Mohon pertimbangkan kembali keputusan Anda karena
                              Anda tidak akan bisa mengembalikan (undo) tindakan
                              ini.
                            </AlertDialogDescription>
                          </AlertDialogHeader>

                          <AlertDialogFooter className="mt-6 flex justify-end gap-3">
                            {/* Tombol Batal */}
                            <AlertDialogCancel className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg">
                              Batal
                            </AlertDialogCancel>

                            {/* Tombol Hapus (Mengikuti Style Merah di Gambar) */}
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-1">
                              <Trash2 size={16} /> Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-gray-500"
                  >
                    Tidak ada data layanan yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

const formSchema = z.object({
  service_name: z.string().min(1, "Nama layanan harus diisi"),
  price: z.coerce.number().min(1, "Harga harus lebih dari 0"),
  duration: z.string().min(1, "Durasi harus diisi"),
  benefit: z.array(z.string()).min(1, "Minimal satu benefit harus diisi"),
});

// detail service component
function ServiceDialogContent({ item, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBenefit, setNewBenefit] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service_name: item.service_name,
      price: item.price,
      duration: item.duration,
      benefit: item.benefit,
    },
  });

  const benefits = watch("benefit");

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setValue("benefit", [...(benefits || []), newBenefit.trim()]);
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (index) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setValue("benefit", updatedBenefits);
  };

  const onSubmit = (data) => {
    onUpdate(item.id, data);
    toast.success("Layanan berhasil diperbarui!");
    setIsEditing(false);
  };

  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>
          {isEditing ? "Ubah Layanan" : "Detail Layanan"}
        </DialogTitle>
        <DialogDescription>
          {isEditing
            ? "Ubah informasi layanan di bawah ini."
            : "Informasi detail mengenai layanan."}
        </DialogDescription>
      </DialogHeader>

      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service_name">Nama Layanan</Label>
            <Input id="service_name" {...register("service_name")} />
            {errors.service_name && (
              <p className="text-red-500 text-xs">
                {errors.service_name.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Harga</Label>
              <Input id="price" type="number" {...register("price")} />
              {errors.price && (
                <p className="text-red-500 text-xs">{errors.price.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Durasi</Label>
              <Input id="duration" {...register("duration")} />
              {errors.duration && (
                <p className="text-red-500 text-xs">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Benefit</Label>
            <div className="space-y-2">
              {benefits?.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded-md border border-gray-200"
                >
                  <span className="text-sm text-gray-700">{benefit}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveBenefit(index)}
                    className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Tambah benefit..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddBenefit();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddBenefit}
                  className="bg-secondary hover:bg-secondary/80 shrink-0"
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {errors.benefit && (
              <p className="text-red-500 text-xs">{errors.benefit.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-primary hover:bg-primary/80">
              Simpan
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                reset();
              }}
            >
              Batal
            </Button>
          </DialogFooter>
        </form>
      ) : (
        <>
          <div className="py-4 space-y-4">
            <div>
              <Label className="text-xs text-gray-500">Nama Layanan</Label>
              <div className="font-medium text-gray-900">
                {item.service_name}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-gray-500">Harga</Label>
                <div className="font-medium text-gray-900">
                  Rp {item.price.toLocaleString("id-ID")}
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Durasi</Label>
                <div className="font-medium text-gray-900">{item.duration}</div>
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500 mb-2 block">
                Benefit
              </Label>
              <ul className="list-disc pl-4 space-y-1">
                {item.benefit.map((benefit, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-secondary hover:bg-secondary hover:opacity-70 transition"
              onClick={() => setIsEditing(true)}
            >
              Ubah Data
            </Button>
            <DialogClose asChild>
              <Button>Tutup</Button>
            </DialogClose>
          </DialogFooter>
        </>
      )}
    </DialogContent>
  );
}

function AddServiceDialog({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [newBenefit, setNewBenefit] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service_name: "",
      price: 0,
      duration: "",
      benefit: [],
    },
  });

  const benefits = watch("benefit");

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setValue("benefit", [...(benefits || []), newBenefit.trim()], {
        shouldValidate: true,
      });
      setNewBenefit("");
    }
  };

  const handleRemoveBenefit = (index) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setValue("benefit", updatedBenefits, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    onAdd(data);
    toast.success("Layanan berhasil ditambahkan!");
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      reset({
        service_name: "",
        price: 0,
        duration: "",
        benefit: [],
      });
      setNewBenefit("");
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Tambahkan Layanan</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tambahkan Layanan Baru</DialogTitle>
          <DialogDescription>
            Isi detail untuk layanan baru yang akan ditambahkan.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service_name_add">Nama Layanan</Label>
            <Input id="service_name_add" {...register("service_name")} />
            {errors.service_name && (
              <p className="text-red-500 text-xs">
                {errors.service_name.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price_add">Harga</Label>
              <Input id="price_add" type="number" {...register("price")} />
              <p className="text-gray-500 text-xs">
                *Masukkan harga tanpa titik (".") atau koma (",")
              </p>
              {errors.price && (
                <p className="text-red-500 text-xs">{errors.price.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration_add">Durasi</Label>
              <Input id="duration_add" {...register("duration")} />
              <p className="text-gray-500 text-xs">
                *Durasi dalam satuan bulan
              </p>
              {errors.duration && (
                <p className="text-red-500 text-xs">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Benefit</Label>
            <div className="space-y-2">
              {benefits?.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded-md border border-gray-200"
                >
                  <span className="text-sm text-gray-700">{benefit}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveBenefit(index)}
                    className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="Tambah benefit..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddBenefit();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddBenefit}
                  className="bg-secondary hover:bg-secondary/80 shrink-0"
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {errors.benefit && (
              <p className="text-red-500 text-xs">{errors.benefit.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/80">
              Tambahkan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
