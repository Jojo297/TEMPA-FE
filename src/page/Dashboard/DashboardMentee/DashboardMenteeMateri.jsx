import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronDown,
  FileText,
  ClipboardList,
  CheckCircle,
  Video,
} from "lucide-react";
import useGetProgramMateri from "@/hooks/hooksMentee/useGetProgramMateri";
import { useEffect, useState } from "react";
import NotFounPages from "@/components/NotFoundPages";
import FeedbackProgram from "@/components/FeedbackProgram";
import ProgramNotStartedDialog from "@/components/ProgramNotStartedDialog";
import DashboardMenteeMateriSkeleton from "@/components/DashboardMenteeMateriSkeleton";
import ReactLinkify from "react-linkify";
import renderLink from "@/utils/RenderLink";
import DialogProgramCompleted from "@/components/DialogProgramCompleted";
import { Helmet } from "react-helmet-async";
import preview from "@/../public/web-preview.png";
import HeaderPage from "@/components/HeaderPage";

export default function DashboardMenteeMateri() {
  const { id } = useParams();
  const idProgram = parseInt(id);
  const token = localStorage.getItem("userJwt");
  const { materi, fetchMateri, isLoading, error, statusCode } =
    useGetProgramMateri();
  let program_name = "Nama Program Tidak Ditemukan";
  let program_description = "Deskripsi Program Tidak Ditemukan";
  let endProgramDate = null;
  let completion_status = null;
  let startProgramDate = null;

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isNotStartedDialogOpen, setIsNotStartedDialogOpen] = useState(false);
  const [isDialogProgramCompleted, setIsDialogProgramCompleted] =
    useState(false);

  useEffect(() => {
    if (token) {
      fetchMateri(token, idProgram);
    }
  }, [token, fetchMateri]);

  const displayMateri = materi ?? [];

  if (displayMateri && displayMateri.length > 0) {
    const firstMateriItem = displayMateri[0];

    // 2. Assign nilai ke variabel yang sudah dideklarasikan (tanpa 'const' atau 'let')
    program_name = firstMateriItem.program_name;
    program_description = firstMateriItem.program_description;
    endProgramDate = firstMateriItem.end_program_date;
    completion_status = firstMateriItem.completion_status;
    startProgramDate = firstMateriItem.start_program_date;
  }
  // console.log(displayMateri.resources);

  // Fungsi utilitas untuk mendapatkan nama file dari URL
  const getFileNameFromUrl = (url) => {
    if (!url) return "File tidak tersedia";

    // 1. Dapatkan bagian path URL (setelah domain)
    // Contoh: /public/program_materi/Materi-1.pdf
    const pathname = new URL(url).pathname;

    // 2. Pisahkan path berdasarkan karakter slash (/)
    const parts = pathname.split("/");

    // 3. Ambil elemen terakhir dari array (nama file)
    return parts[parts.length - 1];
  };

  const isMateriNotAdded =
    displayMateri.length === 1 && displayMateri[0].resources.length === 0;

  if (statusCode == 404) {
    return <NotFounPages message={"Materi Program Tidak ditemukan"} />;
  }

  // console.log(endProgramDate);
  useEffect(() => {
    if (
      endProgramDate &&
      new Date(endProgramDate).getTime() <= new Date().setHours(0, 0, 0, 0)
    ) {
      if (completion_status === "completed") {
        setIsOpenDialog(false);
      } else {
        setIsOpenDialog(true);
      }
    }
  }, [endProgramDate, completion_status]);

  useEffect(() => {
    if (completion_status === "completed") {
      setIsDialogProgramCompleted(true);
    } else {
      setIsDialogProgramCompleted(false);
    }
  }, [completion_status]);

  // Cek apakah program belum dimulai
  useEffect(() => {
    const startDate = new Date(startProgramDate).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    if (startDate > today) {
      setIsNotStartedDialogOpen(true);
    } else {
      setIsNotStartedDialogOpen(false);
    }
  }, [startProgramDate]);

  if (isLoading) {
    return <DashboardMenteeMateriSkeleton />;
  }

  if (!displayMateri || !program_name) {
    return <div className="text-center p-10">Loading...</div>;
  }

  // let program_name = program_name.toString();

  return (
    <div className="max-w-7xl mx-auto">
      {/* header html */}
      <Helmet>
        <title>{`${program_name} | Tempa`}</title>
        <meta
          name="description"
          content="TEMPA adalah platform pengembangan diri untuk menemukan potensi, mencoba simulasi perkuliahan, dan memilih jurusan terbaik seperti Informatika, Hukum, dan Kedokteran."
        />
        <meta
          name="keywords"
          content=" cobain kuliah, trial kuliah, rekomendasi jurusan, eksplorasi jurusan, simulasi kuliah, pengembangan diri, politeknik negeri batam, edukasi digital"
        />
        <link rel="canonical" href="https://tempaa.ddns.net" />
        {/* Open Graph / Facebook (Untuk tampilan saat share link) */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Eksplorasi Masa Depanmu Bersama TEMPA"
        />
        <meta
          property="og:description"
          content="Temukan potensi dan persiapkan kariermu melalui program coba kelas di berbagai jurusan populer."
        />
        <meta property="og:image" content={preview} />
        <meta
          name="twitter:title"
          content="TEMPA - Bangun Masa Depan Bersama"
        />
        <meta
          name="twitter:description"
          content="Platform edukasi digital untuk persiapan karier dan pemilihan jurusan mahasiswa."
        />
      </Helmet>
      {/* breadcum */}
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className="hover:text-primary">
              <Link to="/dashboard-mentee">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-primary">
            <BreadcrumbPage className="text-primary max-w-[150px] truncate md:max-w-none inline-block align-bottom">
              {program_name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="min-h-screen  ">
        {/* header Section */}
        <HeaderPage
          title={program_name}
          description={program_description}
          badge={"Explore Materi"}
        />

        <div className="container">
          {/* Accordion Materi, Quiz, Link Meeting */}
          <Accordion type="single" collapsible className="w-full">
            {/* Accordion Materi */}
            {isMateriNotAdded ? (
              <NotFounPages message={"Materi Belum Ditambahkan"} />
            ) : (
              displayMateri.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={`materi-${item.id}`}
                  className="border-b-0 p-4 rounded-lg bg-white shadow-md mb-3"
                >
                  <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline">
                    <div className="flex items-center">
                      <ChevronDown className="w-5 h-5 mr-3 transition-transform duration-300 data-[state=open]:rotate-180" />
                      {item.title}
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="pt-2 pl-8 space-y-2">
                    {/* deskripsi */}
                    <div className="py-3 text-gray-700">
                      {
                        <div
                          className="whitespace-pre-wrap  [&_ol]:list-decimal [&_ol]:ml-5
      [&_ul]:list-disc [&_ul]:ml-5
      [&_li]:mb-1
      [&_p]:mb-4
      [&_a]:text-blue-600 [&_a]:underline"
                          dangerouslySetInnerHTML={{
                            __html: item.description,
                          }}
                        />
                      }
                    </div>
                    <hr />
                    {/* end deskripsi */}

                    {/* Tautan File/Resource (Nested Mapping) */}
                    {item.resources && item.resources.length > 0 ? (
                      item.resources.map((resource) => {
                        // 1. Tentukan Ikon dan Warna
                        const isVideo = resource.type === "video";
                        const isKuis = resource.type === "kuis";

                        let IconComponent = FileText;
                        let iconClassName = "text-green-600";

                        if (isKuis) {
                          IconComponent = ClipboardList;
                          iconClassName = "text-orange-500";
                        } else if (isVideo) {
                          IconComponent = Video;
                          iconClassName = "text-red-500";
                        }

                        // 2. Tentukan URL Tujuan (Kuis/Video pakai path_file, File pakai file_url)
                        const targetUrl =
                          isKuis || isVideo
                            ? resource.path_file
                            : resource.file_url;

                        // 3. Tentukan Teks Tautan
                        let linkText;
                        if (isKuis) {
                          linkText = `Mulai Kuis: ${item.title}`;
                        } else if (isVideo) {
                          linkText = "Lihat Video Materi"; // Atau bisa ambil dari judul jika ada
                        } else {
                          linkText = getFileNameFromUrl(resource.file_url);
                        }

                        return (
                          <div
                            key={resource.id}
                            className="flex items-center text-gray-600 mt-3"
                          >
                            {/* 3. Render Komponen Ikon yang dipilih */}
                            <IconComponent
                              className={`w-5 h-5 mr-3 ${iconClassName}`}
                            />

                            {/* 4. Gunakan resource.file_url sebagai href */}
                            <a
                              target="_blank"
                              href={targetUrl}
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline font-medium break-all"
                            >
                              {linkText || "Buka Tautan"}
                            </a>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-gray-500 mt-3 italic">
                        Tidak ada sumber daya yang tersedia.
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))
            )}
            {/* end Accordion Materi */}
          </Accordion>
        </div>
        {/* Feedback Program */}
        <FeedbackProgram isDialogOpen={isOpenDialog} idProgram={idProgram} />
        {/* Program Not Started Dialog */}
        <ProgramNotStartedDialog
          isOpen={isNotStartedDialogOpen}
          startDate={startProgramDate}
        />
        {/* Program completed */}
        <DialogProgramCompleted
          isOpen={isDialogProgramCompleted}
          startDate={startProgramDate}
        />
      </div>
    </div>
  );
}
