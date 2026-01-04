"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertDialog,
  // AlertDialogAction, // Replaced with Button to handle validation
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import usePostFeedback from "@/hooks/hooksMentee/usePostFeedback";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const feedbackSchema = z.object({
  rating: z.number().min(1, "Silakan pilih penilaian (rating)"),
  feedback: z.string().min(10, "Umpan balik harus diisi minimal 10 karakter"),
});

export default function FeedbackProgram({ isDialogOpen, idProgram }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("userJwt");
  const { postFeedback, isLoading } = usePostFeedback();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      feedback: "",
    },
  });

  const selectedRating = watch("rating");

  const onSubmit = async (data) => {
    try {
      await postFeedback(token, idProgram, data);
      toast.success("Umpan balik berhasil dikirim!"); // Reload untuk memperbarui status kelulusan
      navigate("/dashboard-mentee/beranda");
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  const ratings = [
    { value: 1, label: "Terrible", emoji: "😞" },
    { value: 2, label: "Bad", emoji: "😕" },
    { value: 3, label: "Okay", emoji: "😐" },
    { value: 4, label: "Good", emoji: "🙂" },
    { value: 5, label: "Amazing", emoji: "😄" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <AlertDialog open={isDialogOpen}>
        <AlertDialogContent className="sm:max-w-[500px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">
              Berikan Umpan Balik (Feedback)
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-foreground pt-2 space-y-2">
              <p>
                Bagaimana pendapat Anda tentang pengalaman trial kuliah ini?
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-6 py-4">
            {/* Rating buttons */}
            <div className="flex gap-2 justify-between">
              {ratings.map((rating) => (
                <button
                  key={rating.value}
                  type="button"
                  onClick={() =>
                    setValue("rating", rating.value, { shouldValidate: true })
                  }
                  className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors hover:border-primary/50 ${
                    selectedRating === rating.value
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <span className="text-3xl">{rating.emoji}</span>
                  <span className="text-sm font-medium">{rating.label}</span>
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-sm text-red-500">{errors.rating.message}</p>
            )}

            {/* Feedback textarea */}
            <div className="space-y-2">
              <Label htmlFor="feedback" className="text-sm font-medium">
                Apa alasan utama untuk penilaian yang Anda berikan?
              </Label>
              <Textarea
                id="feedback"
                {...register("feedback")}
                placeholder="Tulis umpan balik Anda di sini..."
                className="min-h-[100px] resize-none"
              />
              {errors.feedback && (
                <p className="text-sm text-red-500">
                  {errors.feedback.message}
                </p>
              )}
            </div>
            {/* Pesan penting mengenai kelulusan program */}
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">
              Perhatian: Jika Anda tidak mengisi umpan balik ini, Anda tidak
              akan dinyatakan lulus dalam program ini.
            </p>
          </div>

          <AlertDialogFooter className="flex-row justify-end gap-2 sm:gap-2">
            <Button
              onClick={handleSubmit(onSubmit)}
              className="m-0"
              disabled={isLoading}
            >
              {isLoading ? "Mengirim..." : "Kirim"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
