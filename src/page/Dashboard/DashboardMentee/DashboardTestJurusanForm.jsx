import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, AlertCircleIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useBlocker } from "react-router";
import useRecomendationMajors from "@/hooks/useRecomendationMajors";

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
  // ... (CircleButton tetap sama, tidak perlu diubah) ...
  <div className="flex flex-col items-center mr-4">
    {showLabel && <span className="text-gray-400 text-sm mb-1">{value}</span>}
    <button
      type="button"
      onClick={onClick}
      className={`
        w-6 h-6 rounded-full border-2 
        transition-colors duration-200 ease-in-out
        ${
          isSelected
            ? "bg-[#18A0FB] border-[#18A0FB] ring-4 ring-[#18A0FB]/50"
            : "bg-transparent border-gray-400 hover:border-gray-300"
        }
      `}
      aria-label={showLabel ? `Pilihan ${value}` : "Pilihan"}
    />
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
      w-full p-3 rounded-lg bg-[#013B35] text-white placeholder-gray-400
      ${
        error
          ? "border-red-500 focus-visible:ring-red-500"
          : "border-gray-600 focus-visible:ring-[#18A0FB] focus-visible:border-[#18A0FB]"
      }
      ${isLong ? "h-28 resize-none" : "h-10"}
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
          className="flex items-start text-white cursor-pointer hover:bg-[#013B35]/50 p-2 rounded-lg transition-colors"
        >
          <CircleButton
            isSelected={field.value === option.value}
            onClick={() => field.onChange(option.value)} // Memperbarui RHF Field Value
            showLabel={false}
          />
          <span className="text-sm font-normal flex-1 pt-0.5">
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
      <div className="px-2 sm:px-4">
        <div className="flex justify-between items-end mb-3">
          <span className="text-sm font-medium text-gray-200">
            {scaleLabels[1]}
          </span>
          <div className="flex space-x-4 sm:space-x-8">
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
          <span className="text-sm font-medium text-gray-200">
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
    <div className="p-4 sm:p-6 bg-[#004D47] rounded-lg shadow-lg mb-4 text-white">
      <p className="text-base font-normal mb-3">
        <span className="font-semibold">{id}.</span> {text}
      </p>
      {renderInput()}
      {/* Tampilkan Error Validasi */}
      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error.message}
        </p>
      )}
    </div>
  );
};

export default function DashboardTestJurusanForm() {
  const token = localStorage.getItem("userJwt");
  const { recomendationMajors, isLoading, error, getMajors } =
    useRecomendationMajors();
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

  // handle submit
  const onSubmit = (data) => {
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
      getMajors(token, finalDataForBackend);
    }
  };

  // store response to displayResponse
  const displayResponse = recomendationMajors ?? [];

  const isFormComplete = answeredCount === totalQuestions;

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

  if (isLoading) {
    return <p className="flex justify-center">AI sedang berpikir 🤔...</p>;
  }

  // if (recomendationMajors.length <= 0) {
  //   return (
  //     <>
  //       <div>Ini hasil response IA</div>
  //       {displayResponse.map((item) => (
  //         <li>item</li>
  //       ))}
  //     </>
  //   );
  // }

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
      <section className="bg-primary text-center text-white rounded-2xl py-10 px-6 shadow-md">
        <h1 className="text-2xl font-semibold mb-2">Tes Jurusan</h1>
        <p className="text-gray-200 max-w-2xl mx-auto mb-6">
          Tes ini dirancang untuk{" "}
          <span className="font-semibold">
            menganalisis minat, motivasi, dan kecenderungan akademik
          </span>{" "}
          Anda. Jawablah setiap pertanyaan dengan sejujur-jujurnya untuk
          mendapatkan rekomendasi jurusan yang paling sesuai dengan potensi diri
          Anda.
        </p>
      </section>

      {/* alert */}
      <div className="mt-4">
        <Alert variant="warning" className="bg-white shadow-sm">
          <AlertCircleIcon />
          <AlertTitle>PENTING: Tes Hanya Bisa Diisi Sekali!</AlertTitle>
          <AlertDescription>
            <p>
              Hasil tes ini akan menjadi{" "}
              <span className="font-semibold">
                dasar utama rekomendasi jurusan
              </span>{" "}
              Anda. Mohon isi setiap pertanyaan dengan serius dan tanpa
              ragu-ragu. Setelah tombol{" "}
              <span className="font-semibold">Kirim</span> ditekan, jawaban
              tidak dapat diubah lagi.
            </p>
          </AlertDescription>
        </Alert>
      </div>

      {/* Form and question */}
      <section className="">
        <div className="flex items-center gap-2 mb-4 mt-6">
          <h2 className="text-xl font-medium">Soal Terjawab:</h2>
          <span className="text-xl font-semibold text-[#013B35]">
            {answeredCount}/{totalQuestions}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-[#96CCEC] h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressValue}%` }}
          ></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
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
                bg-[#18A0FB] text-white font-semibold py-3 px-12 rounded-lg 
                hover:bg-[#18A0FB]/90 transition-colors duration-200 shadow-lg 
                ${
                  !isFormComplete || isSubmitting
                    ? "opacity-60 cursor-not-allowed"
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
