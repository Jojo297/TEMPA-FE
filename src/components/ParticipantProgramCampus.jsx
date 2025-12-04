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

/* ========================== COMPONENT INFO ========================== */
function Info({ label, value }) {
  return (
    <div>
      <p className="font-medium text-gray-600">{label}</p>
      <p className="text-gray-900">{value || "-"}</p>
    </div>
  );
}

export default function ParticipantProgramCampus({ menteeList }) {
  return (
    <div className="max-w-6xl mx-auto mb-10">
      <div className="bg-white shadow-md rounded-xl p-6 border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-[#013B35]">
            Peserta yang mendaftar
          </h2>
        </div>

        <div className="w-full gap-4">
          <Table>
            {menteeList.count <= 0 ? (
              <TableCaption>Belum Ada Mentee yang Mendaftar</TableCaption>
            ) : (
              <TableCaption>Daftar Mentee yang Terdaftar</TableCaption>
            )}

            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">No</TableHead>
                <TableHead>Nama Mentee</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menteeList.map((item, index) => (
                <TableRow key="">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
