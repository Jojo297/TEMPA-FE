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
  CogIcon,
  AlertCircleIcon,
  Copy,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import roboterror from "@/assets/robot-error.png";
import useGetAllMajors from "@/hooks/hooksMentee/useGetAllMajors";
import MajorsListSkeleton from "@/components/MajorsListSkeleton";
import NotFounPages from "@/components/NotFoundPages";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import useSaveMajorInterest from "@/hooks/hooksMentee/useSaveMajorInterest";
import useCheckVerifyStatus from "@/hooks/hooksMentee/useCheckVerifyStatus";
import useGetMajorInterest from "@/hooks/hooksMentee/useGetMajorInterest";
import DynamicIcon from "@/components/DynamicIcon";
import MajorsInterestSkeleton from "@/components/MajorsInterestSkeleton";

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
  const { saveMajorInterest, isLoadingMajorInterest, errorMajorInterest } =
    useSaveMajorInterest();
  const { verifyStatus, checkVerifyStatus } = useCheckVerifyStatus();
  const { majorInterest, fetchMajorInterest } = useGetMajorInterest();

  const verifyMentee = verifyStatus ?? {};
  const majorsMentee = majorInterest ?? [];
  // console.log(majorsMentee);

  const {
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(interestSchema),
    defaultValues: {
      selectedMajors: [],
    },
  });

  const selectedMajors = watch("selectedMajors");

  const displayMajors = majors ?? [];
  // console.log(displayMajors);

  // handle search majors
  const filteredMajors = displayMajors.filter((major) =>
    major.major_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleMajor = (id) => {
    if (selectedMajors.includes(id)) {
      setValue(
        "selectedMajors",
        selectedMajors.filter((majorId) => majorId !== id),
        { shouldDirty: true, shouldValidate: true }
      );
    } else {
      setValue("selectedMajors", [...selectedMajors, id], {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  // set default value if user already verified
  useEffect(() => {
    if (verifyMentee === true && majorsMentee.length > 0) {
      reset({ selectedMajors: majorsMentee });
    }
  }, [verifyMentee, majorsMentee, reset]);

  const onSubmit = async (data) => {
    try {
      await saveMajorInterest(token, data.selectedMajors);
      toast.success("Minat jurusan berhasil disimpan!");
      navigate("/dashboard-mentee/beranda");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Gagal menyimpan minat jurusan."
      );
    }
  };

  // fetch data majors
  useEffect(() => {
    if (token) {
      fetchMajor(token);
    }
  }, []);

  // fetch status acc
  useEffect(() => {
    if (token) {
      checkVerifyStatus(token);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchMajorInterest(token);
    }
  }, [token]);

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
    return <MajorsInterestSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto w-full min-w-0">
      <div className="min-h-screen  ">
        {/* all majors section */}
        <section className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-primary">
                {majorsMentee.length <= 0
                  ? "Pilih Minat Jurusan"
                  : "Minat Jurusan Anda"}
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
                className="pl-8 pr-3 py-2 w-full border rounded-lg text-sm focus:outline-none focus:ring focus:ring-[#004D40]/40"
              />
            </div>
          </div>

          {/* informasi redirect test jurusan */}
          {selectedMajors.length === 0 && (
            <Alert className="mb-4 bg-indigo-50/50 border-indigo-100 shadow-sm py-3 px-4">
              <div className="flex flex-col md:flex-row items-start md:items-center w-full justify-between gap-4">
                <div className="flex items-start gap-3">
                  {/* Gunakan warna indigo/violet untuk kesan AI yang modern */}
                  <div className="bg-indigo-100 p-2 rounded-full shrink-0">
                    <Sparkles className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-indigo-900 leading-tight mb-1">
                      Rekomendasi Jurusan Berbasis AI
                    </p>
                    <p className="text-xs text-indigo-700/80 leading-relaxed">
                      Masih ragu? Biarkan sistem cerdas kami menganalisis minat
                      dan bakatmu secara akurat.
                    </p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate("/dashboard-mentee/test-jurusan")}
                  className="w-full md:w-auto bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white transition-all shadow-sm shrink-0 px-4"
                >
                  Mulai Analisis
                  <ChevronRight size={14} className="ml-1" />
                </Button>
              </div>
            </Alert>
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
                    <DynamicIcon name={item.logo_name} size={48} />
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
                onClick={() => navigate("/dashboard-mentee/test-jurusan")}
                className="text-gray-500 hover:text-primary hover:bg-primary/5"
              >
                Dapatkan Rekomendasi AI
              </Button>

              {isDirty && (
                <Button
                  type="submit"
                  disabled={isLoadingMajorInterest}
                  className="bg-primary text-white  shadow-md transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingMajorInterest ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <Check size={20} />
                  )}
                  Simpan Minat ({selectedMajors.length})
                </Button>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default DashboardMenteeMajorInterest;
