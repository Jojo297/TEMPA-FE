import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, AlertCircleIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useBlocker, useNavigate } from "react-router";
import useRecomendationMajors from "@/hooks/hooksMentee/useRecomendationMajors";
import RecomendationMajors from "@/components/RecomendationMajors";
import LoadingAiRecomendationMajors from "@/components/LoadingAiRecomendationMajors";
import LoadingSkeletonFetchRecomendationMajors from "@/components/LoadingSkeletonFetchRecomendationMajors";
import LoadingRedirect from "@/components/loadingRedirect";

// validation
const formSchema = z.object({
  1: z
    .string()
    .min(5, { message: "Wajib diisi dan minimal 5 karakter." })
    .trim(),
  2: z
    .string()
    .min(5, { message: "Wajib diisi dan minimal 5 karakter." })
    .trim(),
  3: z
    .string()
    .min(5, { message: "Wajib diisi." })
    .max(300, { message: "Maksimal 300 karakter." })
    .trim(),
  5: z
    .string()
    .min(5, { message: "Wajib diisi dan minimal 5 karakter." })
    .trim(),

  9: z.string().min(5, { message: "Wajib diisi." }).trim(),

  4: z.enum(["a", "b", "c", "d"], {
    message: "Anda harus memilih salah satu opsi.",
  }),
  6: z.enum(["a", "b", "c", "d"], {
    message: "Anda harus memilih salah satu opsi.",
  }),

  7: z.enum(["a", "b"], { message: "Anda harus memilih salah satu opsi." }),
  10: z.enum(["a", "b"], { message: "Anda harus memilih salah satu opsi." }),

  8: z
    .union([z.number().int().min(1).max(5), z.string().regex(/^[1-5]$/)])
    .pipe(z.coerce.number({ invalid_type_error: "Wajib diisi." })),
});

// question data
const newQuestionsData = [
  // ... (Data pertanyaan 1-10) ...
  {
    id: 1,
    type: "text_short",
    focus: "Minat Akademik Inti",
    text: "Dalam mata pelajaran sekolah (IPA, IPS, Bahasa, Komputer, dll.), sebutkan 2 hingga 3 mata pelajaran yang paling Anda kuasai DAN paling Anda nikmati.",
    placeholder: "Contoh: Matematika, Sosiologi, Bahasa Inggris",
  },
  {
    id: 2,
    type: "text_short",
    focus: "Aktivitas Pilihan",
    text: "Ketika Anda memiliki waktu luang total selama seminggu penuh, apa dua jenis kegiatan yang paling mungkin Anda lakukan? (Contoh: Menulis novel, memperbaiki motor, mengikuti seminar, merancang poster)",
    placeholder: "Contoh: Menulis novel, merancang poster",
  },
  {
    id: 3,
    type: "text_long",
    focus: "Motivasi Karir",
    text: "Jika Anda bisa memilih profesi apa pun, apa satu dampak terbesar yang ingin Anda berikan kepada masyarakat atau dunia kerja? (Maks. 50 kata)",
    placeholder: "Saya ingin...",
  },
  {
    id: 4,
    type: "radio",
    focus: "Preferensi Lingkungan Kerja",
    text: "Bagaimana Anda membayangkan lingkungan kerja yang paling ideal setelah lulus?",
    options: [
      {
        value: "a",
        label: "Bekerja di lapangan/proyek fisik, di luar ruangan.",
      },
      {
        value: "b",
        label:
          "Bekerja di laboratorium/studio kreatif, fokus pada penelitian/desain.",
      },
      {
        value: "c",
        label:
          "Bekerja di kantor/institusi, berinteraksi langsung dengan banyak orang/klien.",
      },
      {
        value: "d",
        label:
          "Bekerja secara mandiri di balik meja, fokus pada data/komputer.",
      },
    ],
  },
  {
    id: 5,
    type: "text_short",
    focus: "Kekuatan Diri",
    text: "Jelaskan satu kekuatan utama yang menurut teman atau guru Anda paling menonjol dari diri Anda. (Contoh: Daya analisis yang tajam, kemampuan bernegosiasi, empati tinggi, keterampilan teknis)",
    placeholder: "Contoh: Daya analisis yang tajam",
  },
  {
    id: 6,
    type: "radio",
    focus: "Tantangan yang Disukai",
    text: "Masalah seperti apa yang paling menarik perhatian Anda untuk dipecahkan?",
    options: [
      {
        value: "a",
        label: "Masalah teknis/mekanis (membuat sistem bekerja lebih baik).",
      },
      {
        value: "b",
        label: "Masalah sosial/komunal (mengatasi ketidaksetaraan/kemiskinan).",
      },
      {
        value: "c",
        label:
          "Masalah bisnis/pasar (meningkatkan penjualan atau efisiensi perusahaan).",
      },
      {
        value: "d",
        label: "Masalah ilmiah/abstrak (mencari tahu penyebab suatu fenomena).",
      },
    ],
  },
  {
    id: 7,
    type: "radio",
    focus: "Toleransi Risiko & Aturan",
    text: "Anda lebih suka bekerja dalam situasi yang mana?",
    options: [
      {
        value: "a",
        label: "Lingkungan terstruktur dengan aturan dan prosedur yang jelas.",
      },
      {
        value: "b",
        label: "Lingkungan fleksibel yang menuntut improvisasi dan ide baru.",
      },
    ],
  },
  {
    id: 8,
    type: "likert",
    focus: "Pentingnya Gaji",
    text: "Seberapa penting gaji/penghasilan yang tinggi bagi keputusan karir Anda?",
    scaleLabels: { 1: "Tidak penting", 5: "Sangat penting" },
  },
  {
    id: 9,
    type: "text_short",
    focus: "Jurusan yang Sudah Ada di Pikiran",
    text: "Apakah ada satu atau dua jurusan yang sudah pernah Anda pertimbangkan sebelumnya? (Tuliskan meski Anda masih ragu).",
    placeholder: "Contoh: Kedokteran, Belum ada",
  },
  {
    id: 10,
    type: "radio",
    focus: "Data Kuantitatif/Kualitatif",
    text: "Saat mengambil keputusan, Anda cenderung mengandalkan yang mana?",
    options: [
      {
        value: "a",
        label: "Data, angka, dan fakta yang teruji (pendekatan Kuantitatif).",
      },
      {
        value: "b",
        label:
          "Intuisi, emosi, dan penilaian orang lain (pendekatan Kualitatif).",
      },
    ],
  },
];

// custom radio component
const CircleButton = ({ value, isSelected, onClick, showLabel = true }) => (
  <div className="flex flex-col items-center mr-4 last:mr-0">
    {showLabel && (
      <span
        className={`text-xs font-medium mb-2 ${
          isSelected ? "text-[#013B35]" : "text-gray-400"
        }`}
      >
        {value}
      </span>
    )}
    <button
      type="button"
      onClick={onClick}
      className={`
        w-6 h-6 md:w-8 md:h-8 rounded-full border-2 flex items-center justify-center
        transition-all duration-200 ease-in-out
        ${
          isSelected
            ? "bg-[#013B35] border-[#013B35] ring-4 ring-[#013B35]/20 scale-110"
            : "bg-white border-gray-300 hover:border-[#013B35]/60"
        }
      `}
      aria-label={showLabel ? `Pilihan ${value}` : "Pilihan"}
    >
      {isSelected && (
        <div className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full" />
      )}
    </button>
  </div>
);

// Input Wrapper Components for RHF and Error Display
const QuestionRenderer = ({ question, field, error }) => {
  const { id, type, text, placeholder, options, scaleLabels } = question;

  // Render Input/Textarea menggunakan komponen shadcn + RHF
  const renderTextInput = () => {
    const isLong = type === "text_long";
    const Component = isLong ? Textarea : Input;
    const customClasses = `
      w-full p-4 rounded-xl bg-gray-50 text-gray-900 placeholder:text-gray-400
      border transition-all duration-200
      ${
        error
          ? "border-red-500 focus-visible:ring-red-500 bg-red-50"
          : "border-gray-200 focus-visible:ring-[#013B35] focus-visible:border-[#013B35] hover:border-gray-300 focus:bg-white"
      }
      ${isLong ? "h-32 resize-none" : "h-12"}
      text-sm md:text-base
    `;

    return (
      <Component
        id={`q-${id}`}
        placeholder={placeholder}
        // Prop RHF
        {...field}
        // Menggabungkan class bawaan shadcn dengan class kustom Anda
        className={customClasses}
      />
    );
  };

  // Render Pilihan Ganda (Radio)
  const renderRadioInput = () => (
    <div className="space-y-3">
      {options.map((option) => (
        <div
          key={option.value}
          onClick={() => field.onChange(option.value)} // Memperbarui RHF Field Value
          className={`
            flex items-start cursor-pointer p-4 rounded-xl border transition-all duration-200
            ${
              field.value === option.value
                ? "bg-[#013B35]/5 border-[#013B35] shadow-sm"
                : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }
          `}
        >
          <div className="mt-0.5">
            <CircleButton
              isSelected={field.value === option.value}
              onClick={() => field.onChange(option.value)} // Memperbarui RHF Field Value
              showLabel={false}
            />
          </div>
          <span
            className={`text-sm md:text-base font-medium flex-1 ml-2 ${
              field.value === option.value ? "text-[#013B35]" : "text-gray-700"
            }`}
          >
            {option.label}
          </span>
        </div>
      ))}
      <input type="hidden" {...field} /> {/* Input tersembunyi untuk RHF */}
    </div>
  );

  // Render Skala Likert
  const renderLikertScale = () => {
    const scaleOptions = [1, 2, 3, 4, 5];

    return (
      <div className="px-2 py-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-500 order-2 sm:order-1">
            {scaleLabels[1]}
          </span>
          <div className="flex justify-between w-full sm:w-auto sm:space-x-6 order-1 sm:order-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
            {scaleOptions.map((value) => (
              <CircleButton
                key={value}
                value={value}
                isSelected={Number(field.value) === value} // Konversi ke Number
                onClick={() => field.onChange(value)} // Memperbarui RHF Field Value
                showLabel={true}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-500 text-right order-3">
            {scaleLabels[5]}
          </span>
        </div>
        <input type="hidden" {...field} /> {/* Input tersembunyi untuk RHF */}
      </div>
    );
  };

  const renderInput = () => {
    switch (type) {
      case "text_short":
      case "text_long":
        return renderTextInput();
      case "radio":
        return renderRadioInput();
      case "likert":
        return renderLikertScale();
      default:
        return <p className="text-red-400">Tipe pertanyaan tidak dikenal.</p>;
    }
  };

  return (
    <div className="p-5 md:p-8 bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex gap-4 mb-6">
        <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#013B35] text-white flex items-center justify-center font-bold text-sm md:text-base shadow-md">
          {id}
        </span>
        <p className="text-base md:text-lg font-semibold text-gray-800 pt-1 leading-relaxed">
          {text}
        </p>
      </div>

      <div className="pl-0 md:pl-14">
        {renderInput()}
        {/* Tampilkan Error Validasi */}
        {error && (
          <p className="mt-3 text-sm text-red-500 flex items-center font-medium animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="h-4 w-4 mr-1.5" />
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default function DashboardTestJurusanForm() {
  const token = localStorage.getItem("userJwt");
  const {
    recomendationMajors,
    isLoadingSubmit,
    isLoadingFetch,
    error,
    getMajors,
    fetchResponseAi,
  } = useRecomendationMajors();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      1: "",
      2: "",
      3: "",
      4: "",
      5: "",
      6: "",
      7: "",
      8: 0,
      9: "",
      10: "",
    },
    mode: "onBlur",
  });

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = form;

  const answers = watch();

  // count answer
  const answeredCount = useMemo(() => {
    return Object.keys(answers).filter((key) => {
      const value = answers[key];
      // Validasi untuk string (teks, radio yang belum diubah)
      if (typeof value === "string") return value.trim() !== "";
      // Validasi untuk number (likert)
      if (typeof value === "number") return value !== 0;
      return false;
    }).length;
  }, [answers]);

  const totalQuestions = newQuestionsData.length;
  const progressValue = (answeredCount / totalQuestions) * 100;

  // handle if the user suddenly exits the form (reload or close tab)
  const shouldBlockNavigation = isDirty && !isSubmitting;
  const leaveMessage =
    "Anda memiliki perubahan yang belum disimpan. Yakin ingin meninggalkan halaman?";
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty && !isSubmitting) {
        event.preventDefault();
        event.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, isSubmitting, shouldBlockNavigation]);

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      shouldBlockNavigation &&
      currentLocation.pathname !== nextLocation.pathname
  );

  // handle if the user suddenly exits the form (navigate client side)
  useEffect(() => {
    if (blocker.state === "blocked") {
      if (window.confirm(leaveMessage)) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker, leaveMessage]);

  // response ai
  useEffect(() => {
    if (token) {
      fetchResponseAi(token);
    }
  }, [token, fetchResponseAi]);
  // store response to displayResponse
  const displayResponse = recomendationMajors ?? [];
  console.log(displayResponse);

  // if mentee already assign form
  if (displayResponse.length > 0) {
    return <RecomendationMajors responseAI={displayResponse} />;
  }

  // handle submit
  const onSubmit = async (data) => {
    const processedData = { ...data };

    // filter to get question type radio
    const radioQuestions = newQuestionsData.filter(
      (item) => item.type === "radio"
    );

    // change from key to label in radio question
    radioQuestions.forEach((question) => {
      const questionId = String(question.id);
      const selectedValue = processedData[questionId];

      if (selectedValue) {
        // search object where id
        const selectedOption = question.options.find(
          (opt) => opt.value === selectedValue
        );

        if (selectedOption) {
          // change the value in processedData and the label
          processedData[questionId] = selectedOption.label;
        }
      }
    });

    // new object for format key
    const finalDataForBackend = {};

    for (let i = 1; i <= 10; i++) {
      const oldKey = String(i);
      const newKey = `q${i}`; // ( "q1", "q2")

      if (oldKey in processedData) {
        finalDataForBackend[newKey] = processedData[oldKey];
      }
    }

    // console.log("Data Final (Key q1, q2, dst.):", finalDataForBackend);

    // send answer
    if (token) {
      await getMajors(token, finalDataForBackend);
      await fetchResponseAi(token);
    }
  };

  const isFormComplete = answeredCount === totalQuestions;

  // loading submit
  if (isLoadingSubmit) {
    return <LoadingAiRecomendationMajors />;
  }

  // loading fetch
  if (isLoadingFetch) {
    return <LoadingSkeletonFetchRecomendationMajors />;
  }

  // error handling
  if (error) {
    return (
      <>
        <div className="flex justify-center">{error}</div>
      </>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-primary text-center text-white rounded-xl md:rounded-2xl py-8 md:py-12 px-6 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          Rekomendasi Jurusan Cerdas
        </h1>
        <p className="text-sm md:text-base text-white/90 max-w-2xl mx-auto leading-relaxed">
          Tes ini dirancang untuk{" "}
          <span className="font-bold text-white">
            menganalisis minat, motivasi, dan kecenderungan akademik
          </span>{" "}
          Anda. Jawablah setiap pertanyaan dengan sejujur-jujurnya untuk
          mendapatkan rekomendasi jurusan yang paling sesuai dengan potensi diri
          Anda.
        </p>
      </section>

      {/* alert */}
      <div className="mt-6 max-w-7xl mx-auto">
        <Alert className="bg-red-50/50 border-red-100 shadow-sm py-4 px-5">
          <div className="flex items-start gap-4">
            <div className="shrink-0 bg-red-100 p-2 rounded-full">
              <AlertCircleIcon className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-red-900 mb-1 leading-none">
                PENTING: Tes Hanya Bisa Diisi Sekali!
              </p>
              <div className="text-sm text-red-800/90 leading-relaxed mt-1">
                <p>
                  Hasil tes ini akan menjadi{" "}
                  <span className="font-bold">
                    dasar utama rekomendasi jurusan
                  </span>{" "}
                  Anda. Mohon isi setiap pertanyaan dengan serius dan tanpa
                  ragu-ragu. Setelah tombol{" "}
                  <span className="font-bold">Kirim</span> ditekan, jawaban
                  tidak dapat diubah lagi.
                </p>
              </div>
            </div>
          </div>
        </Alert>
      </div>

      {/* Form and question */}
      <section className="max-w-7xl mx-auto pb-10">
        <div className="flex items-center justify-between gap-2 mb-3 mt-8 px-1">
          <h2 className="text-sm md:text-base font-medium text-gray-600">
            Progress Pengerjaan
          </h2>
          <span className="text-sm md:text-base font-bold text-[#013B35]">
            {answeredCount}/{totalQuestions}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-3 mb-8 overflow-hidden shadow-inner">
          <div
            className="bg-gradient-to-r from-[#013B35] to-[#007F7F] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressValue}%` }}
          ></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          {newQuestionsData.map((question) => (
            <Controller
              key={question.id}
              name={String(question.id)}
              control={control}
              render={({ field }) => (
                <QuestionRenderer
                  question={question}
                  field={field}
                  error={errors[question.id]}
                />
              )}
            />
          ))}

          {/* Submit Button */}
          <div className="text-center mt-8 pb-12">
            <button
              type="submit"
              className={`
                w-full md:w-auto bg-[#013B35] text-white font-bold py-4 px-16 rounded-xl
                hover:bg-[#014d45] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0
                transition-all duration-200 shadow-lg text-base md:text-lg
                ${
                  !isFormComplete || isSubmitting
                    ? "opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none"
                    : ""
                }
              `}
              disabled={!isFormComplete || isSubmitting}
            >
              {isSubmitting ? "Memproses..." : "Kirim"}
            </button>
            {Object.keys(errors).length > 0 && (
              <p className="mt-4 text-sm text-red-500 font-medium">
                Ada {Object.keys(errors).length} kesalahan validasi. Mohon
                periksa kembali jawaban Anda.
              </p>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
