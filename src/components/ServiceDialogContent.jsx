import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Plus, X, icons } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  package_name: z.string().min(1, "Nama layanan harus diisi"),
  logo_name: z.string().min(1, "Nama ikon wajib diisi"),
  price: z.coerce.number().min(1, "Harga harus lebih dari 0"),
  duration_month: z.coerce.number().min(1, "Durasi harus diisi"),
  description: z.string().min(1, "Deskripsi harus diisi"),
  sub_heading: z.string().min(1, "Sub heading harus diisi"),
  isPopular: z.boolean().default(false),
  free_trial: z.boolean().default(false),
  benefit: z
    .array(
      z.object({
        title: z.string().min(1, "Judul benefit harus diisi"),
        desc: z.string().min(1, "Deskripsi benefit harus diisi"),
      })
    )
    .min(1, "Minimal satu benefit harus diisi"),
});

export default function ServiceDialogContent({ item, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newBenefit, setNewBenefit] = useState({ title: "", desc: "" });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      package_name: item.package_name,
      logo_name: item.logo_name || "",
      price: item.price,
      duration_month: item.duration_month,
      description: item.description,
      sub_heading: item.sub_heading,
      isPopular: item.isPopular || false,
      free_trial: item.free_trial || false,
      benefit: item.benefit,
    },
  });

  const { register, handleSubmit, formState, reset, setValue, watch } = form;
  const { errors } = formState;

  const benefits = watch("benefit");
  const iconName = watch("logo_name");
  const SelectedIcon = icons[iconName];

  const handleAddBenefit = () => {
    if (newBenefit.title.trim() && newBenefit.desc.trim()) {
      setValue("benefit", [...(benefits || []), newBenefit]);
      setNewBenefit({ title: "", desc: "" });
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

  // get status color
  const getStatusColor = (status) => {
    if (status) {
      return "text-amber-600 border-amber-200 bg-amber-50";
    } else {
      return "text-green-600 border-green-200 bg-green-50";
    }
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
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="max-h-[60vh] overflow-y-auto py-4 px-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="package_name">Nama Layanan</Label>
                <Input id="package_name" {...register("package_name")} />
                {errors.package_name && (
                  <p className="text-red-500 text-xs">
                    {errors.package_name.message}
                  </p>
                )}
              </div>
              {/* Input Nama Ikon */}
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="logo_name">Nama Ikon Lucide</Label>
                  {/* Preview Ikon secara Real-time */}
                  {SelectedIcon && (
                    <SelectedIcon size={20} className="text-primary" />
                  )}
                </div>

                <Input
                  id="logo_name"
                  placeholder="Contoh: Cpu, Database, Monitor"
                  {...register("logo_name")}
                  className={errors.logo_name ? "border-red-500" : ""}
                />

                <div className="bg-slate-50 p-2 rounded-md border border-dashed border-slate-300">
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    <strong>Instruksi:</strong> Buka{" "}
                    <a
                      href="https://lucide.dev/icons"
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline"
                    >
                      lucide.dev
                    </a>
                    , cari ikon, lalu copy nama komponennya (PascalCase).
                  </p>
                </div>
                {errors.logo_name && (
                  <p className="text-red-500 text-xs">
                    {errors.logo_name.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Harga</Label>
                  <Input id="price" type="number" {...register("price")} />
                  {errors.price && (
                    <p className="text-red-500 text-xs">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration_month">Durasi (Bulan)</Label>
                  <Input id="duration_month" {...register("duration_month")} />
                  {errors.duration_month && (
                    <p className="text-red-500 text-xs">
                      {errors.duration_month.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sub_heading">Sub Heading</Label>
                <Input id="sub_heading" {...register("sub_heading")} />
                {errors.sub_heading && (
                  <p className="text-red-500 text-xs">
                    {errors.sub_heading.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea id="description" {...register("description")} />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <FormField
                control={form.control}
                name="isPopular"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Jadikan Populer</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="free_trial"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Gratis Uji Coba</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Label>Benefit</Label>
                <div className="space-y-2">
                  {benefits?.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-md border border-gray-200"
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">
                          {benefit.title}
                        </span>
                        <span className="text-xs text-gray-600">
                          {benefit.desc}
                        </span>
                      </div>
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
                  <div className="flex flex-col gap-2 border p-2 rounded-md">
                    <Input
                      value={newBenefit.title}
                      onChange={(e) =>
                        setNewBenefit({ ...newBenefit, title: e.target.value })
                      }
                      placeholder="Judul Benefit"
                    />
                    <Input
                      value={newBenefit.desc}
                      onChange={(e) =>
                        setNewBenefit({ ...newBenefit, desc: e.target.value })
                      }
                      placeholder="Deskripsi Benefit"
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
                      className="bg-secondary hover:bg-secondary/80 w-full"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Tambah Benefit
                    </Button>
                  </div>
                </div>
                {errors.benefit && (
                  <p className="text-red-500 text-xs">
                    {errors.benefit.message}
                  </p>
                )}
              </div>
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
        </Form>
      ) : (
        <>
          <div className="max-h-[60vh] overflow-y-auto py-4 space-y-4 px-1">
            <div>
              <Label className="text-xs text-gray-500">Nama Layanan</Label>
              <div className="font-medium text-gray-900">
                {item.package_name}
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Sub Heading</Label>
              <div className="font-medium text-gray-900">
                {item.sub_heading}
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500">Deskripsi</Label>
              <div className="font-medium text-gray-900">
                {item.description}
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
                <div className="font-medium text-gray-900">
                  {item.duration_month} Bulan
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Jadikan Populer</Label>
                <div className="font-medium text-gray-900">
                  <span
                    className={`px-3 py-1 text-xs rounded-md border ${getStatusColor(
                      item.isPopular
                    )} font-semibold whitespace-nowrap`}
                  >
                    {item.isPopular ? "Paket Populer" : "Paket Biasa"}
                  </span>
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-500">Gratis Uji Coba</Label>
                <div className="font-medium text-gray-900">
                  <span
                    className={`px-3 py-1 text-xs rounded-md border ${getStatusColor(
                      item.free_trial
                    )} font-semibold whitespace-nowrap`}
                  >
                    {item.free_trial ? "Gratis Uji Coba" : "Biasa"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-xs text-gray-500 mb-2 block">
                Benefit
              </Label>
              <ul className="list-disc pl-4 space-y-1">
                {item.benefit.map((benefit, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    <span className="font-semibold">{benefit.title}:</span>{" "}
                    {benefit.desc}
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
