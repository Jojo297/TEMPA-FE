import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router";

export default function DialogProgramCompleted({ isOpen, startDate }) {
  const navigate = useNavigate();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Program Sudah Selesai</AlertDialogTitle>
          <AlertDialogDescription>
            Program sudah anda selesaikan{" "}
            <span className="font-semibold">
              {startDate &&
                new Date(startDate).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
            </span>
            . Silakan Kembali atau cari program lain.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => navigate("/dashboard-mentee/beranda")}
            className="bg-[#013B35] hover:bg-[#013B35]/90"
          >
            Kembali ke Beranda
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
