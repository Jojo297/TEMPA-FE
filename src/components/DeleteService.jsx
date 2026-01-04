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
import useDeleteSubscriptionPackage from "@/hooks/hooksAdmin/useDeleteSubscriptionPackage";
import { AlertTriangleIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";
import { useState } from "react";
import { Button } from "./ui/button";

export default function DeleteService({ id, refetch, item }) {
  const token = localStorage.getItem("userJwt");
  const [isOpend, setIsOpend] = useState(false);
  const { isLoading, error, deletePackage } = useDeleteSubscriptionPackage();

  const handleDelete = async (id) => {
    try {
      await deletePackage(token, id);
      toast.success("Layanan berhasil dihapus!");
      refetch();
    } catch (error) {
      toast.error(error.message || "Gagal menghapus layanan.");
      console.error(error);
    }
  };
  return (
    <AlertDialog open={isOpend} onOpenChange={setIsOpend}>
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
            Hapus Layanan {item.package_name}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 mb-4 text-center">
            Apakah Anda yakin ingin menghapus layanan ini? Mohon pertimbangkan
            kembali keputusan Anda karena Anda tidak akan bisa mengembalikan
            (undo) tindakan ini.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex justify-end gap-3">
          {/* Tombol Batal */}
          <AlertDialogCancel className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg">
            Batal
          </AlertDialogCancel>

          {/* Tombol Hapus (Mengikuti Style Merah di Gambar) */}
          <Button
            onClick={() => handleDelete(id)}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-1"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Spinner size={16} /> Memprosess...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Trash2 size={16} /> Hapus
              </div>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
