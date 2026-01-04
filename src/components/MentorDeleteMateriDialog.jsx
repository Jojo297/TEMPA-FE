import useDeleteMateri from "@/hooks/hooksMentor/useDeleteMateri";
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
import { useState } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { toast } from "sonner";

function MentorDeleteMateriDialog({
  idMateri,
  materiName,
  onDeleteSuccess,
  token,
}) {
  const [open, setOpen] = useState(false);
  const { isLoading, deleteMateri } = useDeleteMateri();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteMateri(token, idMateri);
      toast.success("Materi berhasil dihapus");
      setOpen(false);
      if (onDeleteSuccess) onDeleteSuccess();
    } catch (error) {
      toast.error(error.message || "Gagal menghapus materi");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="text-red-500 bg-transparent shadow-none hover:bg-red-100 hover:text-red-600">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Apakah Anda Yakin Ingin Menghapus Materi {materiName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan ini tidak dapat dibatalkan. Ini akan menghapus semua data
            materi <span className="font-bold">{materiName}</span> secara
            permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Spinner />
                Menghapus...
              </div>
            ) : (
              "Hapus"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default MentorDeleteMateriDialog;
