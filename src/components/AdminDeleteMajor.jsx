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
import useDeleteStandardMajor from "@/hooks/hooksAdmin/useDeleteStandardMajor";
import { AlertTriangle, AlertTriangleIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

export default function AdminDeleteMajor({
  idMajor,
  majorName,
  token,
  refetch,
}) {
  const navigate = useNavigate();
  const { isLoading, error, deleteMajor } = useDeleteStandardMajor();

  const handleDeleteMajor = async (id) => {
    const result = await deleteMajor(token, id);

    if (result.success) {
      toast.success(result.message || "Jurusan berhasil dihapus!");
      navigate("/dashboard-admin/jurusan");
    } else {
      toast.error(result.error || "Gagal menghapus jurusan.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className={
            "bg-red-500 hover:opacity-60 transition text-white px-4 py-2 text-sm rounded-lg shadow-md flex items-center gap-2"
          }
        >
          {<Trash2 size={16} />}
          Hapus Jurusan
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col items-center gap-1">
          <div className="bg-gray-200 p-2 rounded-sm">
            {/* AlertTriangleIcon hanya muncul jika className kosong/null/undefined */}
            <AlertTriangleIcon className="text-gray-400" />
          </div>

          <AlertDialogTitle className="text-xl font-semibold">
            Hapus Jurusan {majorName}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 mb-4 text-center">
            Apakah Anda yakin ingin menghapus jurusan ini? Mohon pertimbangkan
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
          <AlertDialogAction
            onClick={() => handleDeleteMajor(idMajor)}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-1"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Spinner />
                Loading...
              </div>
            ) : (
              ((<Trash2 size={16} />), "Hapus")
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
