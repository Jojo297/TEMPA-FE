import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate, useParams } from "react-router-dom"; // Atau 'next/navigation' jika pakai Next.js
import { CheckCircle2, MapPin, CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";
import useGetPresensi from "@/hooks/hooksMentee/useGetPresensi";
import { Skeleton } from "@/components/ui/skeleton";
import ProgramExpiredState from "@/components/ProgramExpiredState";
import NotFoundPage from "@/components/NotFoundPage";

// Schema Validasi
const formSchema = z.object({
  status: z.enum(["present", "absent"], {
    required_error: "Silakan pilih status kehadiran.",
  }),
  keterangan: z.string().max(200).optional(),
});

export default function PresensiMentee() {
  const token = localStorage.getItem("userJwt");
  const { programId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { res, isLoadingFetch, error, getPresensi, statusCode } =
    useGetPresensi();

  // fetch data to get data program
  useEffect(() => {
    getPresensi(token, programId);
  }, [token, programId, getPresensi]);

  // console.log(res);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "hadir",
    },
  });

  function onSubmit(values) {
    setIsLoading(true);

    console.log({ ...values, programId });
    toast.success("Presensi berhasil dikirim!");
    setIsLoading(false);
  }

  // get location
  const getLocation = (type_sesi, res) => {
    switch (type_sesi) {
      case "online":
        return "Online";
      case "onsite":
        return res?.onsiteLocationName;
    }
  };

  // if program is end/presensi is expired
  if (statusCode === 410) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgramExpiredState
          onBack={() => navigate("/dashboard-mentee/")}
          onRefresh={() => getPresensi(token, programId)}
        />
      </div>
    );
  }

  // if not found
  if (statusCode === 404) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md border-t-4 border-t-primary shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2 text-primary mb-2">
            <CheckCircle2 className="w-6 h-6" />
            <span className="font-bold tracking-tight">ATTENDANCE SYSTEM</span>
          </div>
          <CardTitle className="text-2xl">Presensi Mentee</CardTitle>
          <CardDescription>
            Silakan isi detail kehadiran Anda untuk program:
            {isLoadingFetch ? (
              <Skeleton className="h-4 w-[180px]" />
            ) : (
              <span className="font-semibold text-foreground ml-1">
                {res?.program_name}
              </span>
            )}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="mr-2 h-4 w-4" />

                  {isLoadingFetch ? (
                    <Skeleton className="h-4 w-[95px]" />
                  ) : (
                    new Date().toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "short",
                    })
                  )}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {isLoadingFetch ? (
                    <Skeleton className="h-4 w-[95px]" />
                  ) : (
                    getLocation(res?.type_sesi, res)
                  )}
                </div>
              </div>

              {/* konfirmastion present */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-semibold">
                      Konfirmasi Kehadiran
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 gap-4"
                      >
                        {/* Pilihan Hadir */}
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem
                              value="present"
                              className="sr-only"
                            />
                          </FormControl>
                          <FormLabel
                            className={`flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-all ${
                              field.value === "present"
                                ? "border-primary bg-primary/5"
                                : ""
                            }`}
                          >
                            <Check
                              className={`mb-2 h-6 w-6 ${field.value === "present" ? "text-primary" : "text-muted-foreground"}`}
                            />
                            <span
                              className={`font-medium ${field.value === "present" ? "text-primary" : ""}`}
                            >
                              Hadir
                            </span>
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* button submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 transition-all font-semibold py-6"
              >
                {isLoading ? <Spinner /> : "Kirim Presensi"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
