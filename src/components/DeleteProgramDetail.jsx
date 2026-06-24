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
import useUpdateProgram from "@/hooks/hooksCampus/useUpdateProgram";
import { AlertTriangle, AlertTriangleIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { useState } from "react";

// this component is inside detail program
export default function DeleteProgramDetail({ idProgram, programName, token }) {
  const navigate = useNavigate();
  const { deleteProgram, isLoading, error, data } = useUpdateProgram();
  const [isOpend, setIsOpen] = useState(false);
  // console.log(programName);

  const handleDeleteProgram = async (idProgram) => {
    try {
      await deleteProgram(token, idProgram);
      toast.success("Program berhasil dihapus!");
      setIsOpen(false);

      navigate("/dashboard-campus/program");
    } catch (error) {
      toast.error(error.message || "Gagal menghapus program.");
      console.error(error);
    }
  };

  return (
    <AlertDialog open={isOpend} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className="bg-red-500 hover:opacity-60 transition text-white px-4 py-2 text-sm rounded-lg shadow-md flex items-center gap-2">
          {<Trash2 size={16} />}
          Hapus Program
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-col items-center gap-1">
          <div className="bg-gray-200 p-2 rounded-sm">
            {/* AlertTriangleIcon hanya muncul jika className kosong/null/undefined */}
            <AlertTriangleIcon className="text-gray-400" />
          </div>

          <AlertDialogTitle className="text-xl font-semibold">
            Hapus Program {programName}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 mb-4 text-center">
            Apakah Anda yakin ingin menghapus program ini? Mohon pertimbangkan
            kembali keputusan Anda karena Anda tidak akan bisa mengembalikan
            (undo) tindakan ini.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-6 flex justify-end gap-3">
          {/* Button Cancel */}
          <AlertDialogCancel className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg">
            Batal
          </AlertDialogCancel>

          {/* Button Confirm */}
          <Button
            onClick={() => handleDeleteProgram(idProgram)}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-1"
          >
            {isLoading ? (
              "Loading..."
            ) : (
              <>
                <Trash2 size={16} /> Hapus
              </>
            )}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
