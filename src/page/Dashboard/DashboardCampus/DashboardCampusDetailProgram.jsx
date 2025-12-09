import React, { useEffect, useState } from "react";
import { X, Pencil, Calendar, Trash2 } from "lucide-react";
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
import useGetDetailProgram from "@/hooks/hooksCampus/useGetDetailProgram";
import DescriptionProgramCampus from "@/components/DescriptionProgramCampus";
import ParticipantProgramCampus from "@/components/ParticipantProgramCampus";
import ProgramEditForm from "@/components/ProgramEditForm"; // Import the new edit form
import MentorProgramCampus from "@/components/MentorProgramCampus";
import MateriProgramCampus from "@/components/MateriProgramCampus";
import DeleteProgram from "@/components/DeleteProgram";
import DashboardCampusDetailProgramSkeleton from "@/components/DashboardCampusDetailProgramSkeleton";

/* ========================== COMPONENT INFO ========================== */
function Info({ label, value }) {
  return (
    <div>
      <p className="font-medium text-gray-600">{label}</p>
      <p className="text-gray-900">{value || "-"}</p>
    </div>
  );
}

export default function DashboardCampusDetailProgram() {
  // get id program from url
  const { id } = useParams();
  const idProgram = parseInt(id);
  const token = localStorage.getItem("userJwt");
  const { detailProgram, isLoading, error, fetchDetailProgram } =
    useGetDetailProgram();

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

  if (isLoading) {
    return <DashboardCampusDetailProgramSkeleton />;
  }

  return (
    <>
      {/* if edit button klik */}
      {editMode ? (
        <ProgramEditForm
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
              <DeleteProgram
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
                {/* start date */}
                <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
                  <Calendar size={16} />
                  <span>
                    {new Date(program.start_regis_date).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                  <span>-</span>
                  <span>
                    {new Date(program.end_regis_date).toLocaleDateString(
                      "id-ID",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
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

                {/* mentor */}
                <TabsTrigger
                  value="mentor"
                  className="px-6 py-2 border border-[#013B35] bg-white text-[#013B35] rounded-full font-semibold 
                                 hover:bg-[#013B35] hover:text-white transition 
                                 data-[state=active]:bg-[#013B35] data-[state=active]:text-white"
                >
                  Mentor
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
              </TabsList>

              {/* content Tabs */}
              <TabsContent value="deskripsi">
                <DescriptionProgramCampus program={program} />
              </TabsContent>

              <TabsContent value="peserta">
                <ParticipantProgramCampus menteeList={program.mentee_list} />
              </TabsContent>

              <TabsContent value="mentor">
                <MentorProgramCampus mentorList={program.mentor} />
              </TabsContent>

              <TabsContent value="materi">
                <MateriProgramCampus materiList={program.materi_list} />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      )}
    </>
  );
}

/* ========================== POPUP EDIT MENTOR ========================== */

function MentorEditPopup({ initialData, onClose, onSave }) {
  const [form, setForm] = useState(initialData);

  const handleInput = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl p-8 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">Edit Informasi Mentor</h2>

        <div className="grid grid-cols-1 gap-4">
          <Field
            label="Nama Mentor"
            name="mentorName"
            value={form.mentorName}
            onChange={handleInput}
          />
          <Field
            label="Email Mentor"
            name="mentorEmail"
            value={form.mentorEmail}
            onChange={handleInput}
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => onSave(form)}
            className="bg-[#013B35] text-white px-10 py-3 rounded-full font-semibold"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
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
