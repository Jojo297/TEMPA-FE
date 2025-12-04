import useGetDetailProgram from "@/hooks/hooksCampus/useGetDetailProgram";
import { useEffect } from "react";
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
import { Pencil } from "lucide-react";

/* ========================== COMPONENT INFO ========================== */
function Info({ label, value }) {
  return (
    <div>
      <p className="font-medium text-gray-600">{label}</p>
      <p className="text-gray-900">{value || "-"}</p>
    </div>
  );
}

export default function MentorProgramCampus({ mentorList }) {
  return (
    <div className="max-w-6xl mx-auto mb-10">
      <div className="bg-white shadow-md rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#013B35]">Mentor</h2>
          <button
            onClick={() => setEditType("program")}
            className="flex items-center gap-2 bg-[#013B35] text-white px-4 py-2 rounded-full text-sm"
          >
            <Pencil size={14} /> Tambahkan Mentor
          </button>
        </div>

        <div className="w-full gap-4">
          <Table>
            {mentorList.length <= 0 ? (
              <TableCaption>Belum Ada Mentor yang Ditambahkan</TableCaption>
            ) : (
              <TableCaption>Daftar Mentor diprogram ini</TableCaption>
            )}

            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>Nama Mentor</TableHead>
                <TableHead>NIK</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">{1}</TableCell>
                <TableCell>{mentorList.name}</TableCell>
                <TableCell>{mentorList.nik}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
