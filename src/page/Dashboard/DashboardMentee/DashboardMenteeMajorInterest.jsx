import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Search,
  Cpu,
  Cog,
  Lightbulb,
  DollarSign,
  Scale,
  Palette,
  Brain,
  Plus,
  Waves,
  Cross,
  FileQuestionIcon,
  Check,
  Loader2,
} from "lucide-react";
import roboterror from "@/assets/robot-error.png";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useGetAllMajors from "@/hooks/hooksMentee/useGetAllMajors";
import MajorsListSkeleton from "@/components/MajorsListSkeleton";
import NotFounPages from "@/components/NotFoundPages";
import { Button } from "@/components/ui/button";

const interestSchema = z.object({
  selectedMajors: z
    .array(z.number())
    .min(1, "Pilih setidaknya satu jurusan yang Anda minati."),
});

const DashboardMenteeMajorInterest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const { majors, isLoading, error, fetchMajor } = useGetAllMajors();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      selectedMajors: [],
    },
  });

  const selectedMajors = watch("selectedMajors");

  const displayMajors = majors ?? [];

  // icon majors
  const majorIconMap = {
    Informatika: <Cpu size={48} />,
    Mesin: <Cog size={48} />,
    Elektronika: <Lightbulb size={48} />,
    Akuntansi: <DollarSign size={48} />,
    Hukum: <Scale size={48} />,
    "Desain Komunikasi Visual (DKV)": <Palette size={48} />,
    Psikologi: <Brain size={48} />,
    Matematika: <Plus size={48} />,
    Kelautan: <Waves size={48} />,
    Kedokteran: <Cross size={48} />,
  };

  // merge majors name to icon
  const mergedData = displayMajors.map((major) => ({
    ...major,
    icon: majorIconMap[major.major_name] || <FileQuestionIcon size={48} />,
  }));
  // console.log(mergedData);

  // handle search majors
  const filteredMajors = mergedData.filter((major) =>
    major.major_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleMajor = (id) => {
    if (selectedMajors.includes(id)) {
      setValue(
        "selectedMajors",
        selectedMajors.filter((majorId) => majorId !== id)
      );
    } else {
      setValue("selectedMajors", [...selectedMajors, id]);
    }
  };

  const onSubmit = (data) => {
    console.log("Selected Interests:", data);
    // Implementasi submit ke API di sini
  };

  // fetch data majors
  useEffect(() => {
    if (token) {
      fetchMajor(token);
    }
  }, []);

  // handling error
  if (error) {
    return (
      <p className="justify-center text-center" style={{ color: "red" }}>
        ❌ Error: {error}
      </p>
    );
  }

  // handle loading
  if (isLoading) {
    return <MajorsListSkeleton />;
  }

  return (
    <>
      <div className="min-h-screen  ">
        {/* all majors section */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Pilih Minat Jurusan
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Pilih jurusan yang sesuai dengan minatmu untuk mendapatkan
                rekomendasi terbaik.
              </p>
            </div>
            {/* input search */}
            <div className="relative w-full md:w-60">
              <Search
                size={16}
                className="absolute top-2.5 left-3 text-gray-400"
              />
              <input
                type="text"
                placeholder="Cari jurusan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2.5 w-full border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {errors.selectedMajors && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium">
              {errors.selectedMajors.message}
            </div>
          )}

          {/* card majors */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {/* majors not found */}
            {filteredMajors.length <= 0 ? (
              <NotFounPages message={"Jurusan tidak ditemukan"} />
            ) : (
              // card majors
              filteredMajors.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleToggleMajor(item.id)}
                  className={`
                    relative cursor-pointer group rounded-xl border-2 p-6 flex flex-col items-center justify-center transition-all duration-200
                    ${
                      selectedMajors.includes(item.id)
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-gray-100 bg-white hover:border-primary/30 hover:shadow-sm"
                    }
                  `}
                >
                  {selectedMajors.includes(item.id) && (
                    <div className="absolute top-3 right-3 bg-primary text-white rounded-full p-1 animate-in fade-in zoom-in duration-200">
                      <Check size={12} strokeWidth={3} />
                    </div>
                  )}
                  <div
                    className={`transition-colors duration-200 ${
                      selectedMajors.includes(item.id)
                        ? "text-primary"
                        : "text-gray-400 group-hover:text-primary/70"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <p
                    className={`mt-4 text-sm font-semibold text-center transition-colors duration-200 ${
                      selectedMajors.includes(item.id)
                        ? "text-primary"
                        : "text-gray-700 group-hover:text-gray-900"
                    }`}
                  >
                    {item.major_name}
                  </p>
                </div>
              ))
            )}

            {/* Submit Button */}
            <div className="col-span-full mt-8 flex justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/dashboard-mentee/beranda")}
                className="text-gray-500 hover:text-primary hover:bg-primary/5"
              >
                Lewati untuk sekarang
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-white  shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Check size={20} />
                )}
                Simpan Minat ({selectedMajors.length})
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default DashboardMenteeMajorInterest;
