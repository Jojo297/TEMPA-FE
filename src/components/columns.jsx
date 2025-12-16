"use client";

import { Trash2 } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import EditMentorForm from "./EditMentorForm";

export const getColumns = (handleDelete, onMentorUpdate, showEdit = true) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-gray-400 data-[state=checked]:bg-[#013D3A] data-[state=checked]:text-white"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-gray-400 data-[state=checked]:bg-[#013D3A] data-[state=checked]:text-white"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Nama Mentor", // Header tetap sama
    // Gunakan 'cell' untuk kustomisasi tampilan
    cell: ({ row }) => {
      const mentor = row.original;
      return (
        <div className="flex items-center gap-2">
          <span>{mentor.name}</span>
          {mentor.mentor_type === "super_mentor" && (
            <Badge
              variant="secondary"
              className="bg-blue-500 text-white rounded-full"
            >
              Super Mentor
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "nik",
    header: "NIK",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mentor = row.original;

      return (
        <div className="flex justify-end gap-2">
          {/* delete button */}
          {showEdit ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 text-red-500 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apakah Anda yakin ingin menghapus mentor ini?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data
                    mentor <span className="font-bold">{mentor.name}</span>{" "}
                    secara permanen.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(mentor)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 text-red-500 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Apakah Anda yakin ingin menghapus mentor dari program ini?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data
                    mentor <span className="font-bold">{mentor.name}</span>{" "}
                    secara permanen.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(mentor)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Hapus
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {showEdit && (
            <EditMentorForm mentor={mentor} onUpdated={onMentorUpdate} />
          )}
        </div>
      );
    },
  },
];
