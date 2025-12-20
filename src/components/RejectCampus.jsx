import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import useRejectCampus from "@/hooks/hooksAdmin/useRejectCampus";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { X } from "lucide-react";

const RejectSchema = z.object({
  reason: z
    .string()
    .min(10, "Alasan penolakan wajib diisi minimal 10 karakter."),
});

export default function RejectCampus({ token, idCampus }) {
  const { isLoadingReject, rejectCampus } = useRejectCampus();

  const formReject = useForm({
    resolver: zodResolver(RejectSchema),
    defaultValues: {
      reason: "",
    },
  });

  const onRejectSubmit = async (data) => {
    // console.log(data);
    if (token) {
      const result = await rejectCampus(token, idCampus, data.reason);
      if (result.success) {
        toast.success(result.message || "Kampus berhasil ditolak");
        navigate("/dashboard-admin");
      } else {
        toast.error(result.message || "Gagal menolak kampus");
      }
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-red-500 hover:bg-red-500 hover:opacity-60 transition text-white px-4 py-2 text-sm rounded-lg shadow-md flex items-center gap-2">
            <X size={16} />
            Tolak Kampus
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Tolak Verifikasi Kampus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menolak verifikasi kampus ini? Berikan
              alasan penolakan di bawah ini.
            </DialogDescription>
          </DialogHeader>
          <Form {...formReject}>
            <form
              onSubmit={formReject.handleSubmit(onRejectSubmit)}
              className="space-y-4"
            >
              <FormField
                control={formReject.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alasan Penolakan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Contoh: Dokumen legalitas tidak lengkap atau tidak valid..."
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
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={isLoadingReject}
                >
                  {isLoadingReject ? (
                    <div className="flex items-center gap-2">
                      <Spinner /> Memproses...
                    </div>
                  ) : (
                    "Tolak Kampus"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
