import React, { useEffect, useState, useCallback } from "react";
import { X, Pencil, Calendar } from "lucide-react";
import { ProgramDummy } from "@/lib/ProgramDummy";
import { Link, useParams } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetDetailProgram from "@/hooks/hooksMentor/useGetDetailProgram";
import DescriptionProgramCampus from "@/components/DescriptionProgramCampus";
import ParticipantProgramCampus from "@/components/ParticipantProgramCampus";
import ProgramEditForm from "@/components/ProgramEditForm"; // Import the new edit form
import MentorProgramCampus from "@/components/MentorProgramCampus";
import MateriProgramCampus from "@/components/MateriProgramCampus";
import DeleteProgram from "@/components/DeleteProgram";
import DashboardCampusDetailProgramSkeleton from "@/components/DashboardCampusDetailProgramSkeleton";
import useDeleteMentorFromProgram from "../../../hooks/hooksCampus/useDeleteMentorFromProgram";
import { toast } from "sonner";
import FeedbackProgram from "@/components/FeedbackProgram";
import FeedbackProgramCampus from "@/components/FeedbackProgramCampus";
import MentorProgramEditForm from "@/components/MentorProgramEditForm";
import MentorDeleteProgram from "@/components/MentorDeleteProgram";

export default function DashboardMentorProgramDetail() {
  const { id } = useParams();
  const idProgram = parseInt(id);
  console.log(idProgram);
  const token = localStorage.getItem("userJwt");
  const { detailProgram, isLoading, error, fetchDetailProgram } =
    useGetDetailProgram();
  const { deleteMentorFromProgram } = useDeleteMentorFromProgram();

  const program = detailProgram ?? {};
  // console.log(program);

  useEffect(() => {
    if (token) {
      fetchDetailProgram(token, idProgram);
    }
  }, [token, idProgram]);

  const [editMode, setEditMode] = useState(false); // Gunakan boolean untuk mode edit

  const handleSaveEdit = () => {
    fetchDetailProgram(token, idProgram); // Ambil ulang data setelah disimpan
    setEditMode(false); // Keluar dari mode edit
    window.scrollTo(0, 0); // Scroll ke atas halaman
  };

  // Fungsi untuk menghapus mentor dari program
  const handleRemoveMentorFromProgram = useCallback(
    async (mentor) => {
      // Menggunakan hook baru untuk menghapus mentor
      const result = await deleteMentorFromProgram(token, mentor.id);

      if (result.success) {
        toast.success(
          result.message || "Mentor berhasil dihapus dari program."
        );
        fetchDetailProgram(token, idProgram); // Muat ulang data program
      } else {
        toast.error(result.error || "Gagal menghapus mentor.");
      }
    },
    [token, idProgram, fetchDetailProgram, deleteMentorFromProgram]
  );

  if (isLoading) {
    return <DashboardCampusDetailProgramSkeleton />;
  }

  return (
    <>
      {/* if edit button klik */}
      {editMode ? (
        <MentorProgramEditForm
          initialData={program}
          onClose={() => setEditMode(false)}
          onSave={handleSaveEdit}
        />
      ) : (
        <div>
          {/* Wrapper untuk Breadcrumb dan Tombol */}
          <div className="flex justify-between items-center mb-4">
            {/* Breadcrumb */}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-primary">
                    <Link to="/dashboard-campus">Beranda</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild className="hover:text-primary">
                    <Link to="/dashboard-campus/program">Program</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem className="text-primary">
                  <BreadcrumbPage className="text-primary">
                    {program.program_name}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Grup Tombol */}
            <div className="flex gap-3">
              <MentorDeleteProgram
                idProgram={program.id}
                programName={program.program_name}
                token={token}
              />
              <button
                onClick={() => setEditMode(true)}
                className="bg-secondary text-white px-4 py-2 text-sm hover:opacity-60 transition rounded-lg shadow-md flex items-center gap-2"
              >
                <Pencil size={16} /> Edit Program
              </button>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-md mb-10">
            <div className="relative">
              <img
                src={program.image_url}
                alt="Program"
                className="w-full h-72 object-cover"
              />
            </div>
            {/* Overlay konten di bawah gambar */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#0E3B3D]/90 text-white p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold">
                  {program.program_name}
                </h1>
              </div>
            </div>
          </div>

          <section className="mt-7 max-w-7xl bg-[#F8FAFB] mx-auto mb-20 flex flex-col items-start">
            <Tabs defaultValue="deskripsi" className="w-full">
              {/* Navigation button */}
              <TabsList className="flex flex-wrap gap-4 mb-5 justify-start h-auto bg-transparent">
                {/* description */}
                <TabsTrigger
                  value="deskripsi"
                  className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                                 hover:bg-[#013B35] hover:text-white transition 
                                 data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
                >
                  Deskripsi
                </TabsTrigger>

                {/* peserta */}
                <TabsTrigger
                  value="peserta"
                  className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                                 hover:bg-[#013B35] hover:text-white transition 
                                 data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
                >
                  Peserta
                </TabsTrigger>

                {/* materi */}
                <TabsTrigger
                  value="materi"
                  className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                                 hover:bg-[#013B35] hover:text-white transition 
                                 data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
                >
                  Materi
                </TabsTrigger>

                {/* feedback */}
                <TabsTrigger
                  value="feedback"
                  className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                                 hover:bg-[#013B35] hover:text-white transition 
                                 data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
                >
                  Feedback
                </TabsTrigger>
              </TabsList>

              {/* content Tabs */}
              <TabsContent value="deskripsi">
                <DescriptionProgramCampus program={program} />
              </TabsContent>

              <TabsContent value="peserta">
                <ParticipantProgramCampus menteeList={program.mentee_list} />
              </TabsContent>

              <TabsContent value="materi">
                <MateriProgramCampus
                  materiList={program.materi_list}
                  idProgram={program.id}
                  onUpdateSuccess={() => fetchDetailProgram(token, idProgram)}
                />
              </TabsContent>

              <TabsContent value="feedback">
                <FeedbackProgramCampus idProgram={idProgram} token={token} />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      )}
    </>
  );
}

/* ========================== INPUT COMPONENT ========================== */

function Field({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-full p-3 px-5"
      />
    </div>
  );
}
