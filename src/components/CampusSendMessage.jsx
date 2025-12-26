import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { AlertCircleIcon, SendHorizonal } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useRejectCampus from "@/hooks/hooksAdmin/useRejectCampus";
import { Spinner } from "./ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useSendMessage from "@/hooks/hooksCampus/useSendMessage";
import { toast } from "sonner";

const MessageSchema = z.object({
  subject: z.string().min(5, "Subjek wajib diisi minimal 5 karakter."),
  message: z.string().min(10, "Pesan wajib diisi minimal 10 karakter."),
});

export default function CampusSendMessage({
  idMentee,
  idCampus,
  token,
  menteeName,
}) {
  const {
    isLoadingSendMessage,
    errorSendMessage,
    successMessage,
    sendMessage,
  } = useSendMessage();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const formSendMessage = useForm({
    resolver: zodResolver(MessageSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const onSendMessage = async (data) => {
    data.idCampus = idCampus;
    data.idMentee = idMentee;
    // console.log(data);
    if (token) {
      const result = await sendMessage(token, data);
      if (result.success) {
        toast.success(result.message || "Pesan berhasil dikirim");
        setIsDialogOpen(false);
      } else {
        setIsDialogOpen(false);
        toast.error(result.message || "Gagal mengirim pesan");
      }
    }
  };
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-transparent text-primary hover:bg-transparent shadow-none">
            <SendHorizonal />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Kirim Pesan ke {menteeName}</DialogTitle>
            <DialogDescription>
              Kirim pesan untuk kebutuhan follow-up pendaftaran atau informasi
              penting lainnya kepada mentee.
            </DialogDescription>
          </DialogHeader>
          {/* Informasi Pengiriman Pesan */}
          <Alert className="relative overflow-hidden border-none bg-blue-50/50 px-4 py-3 shadow-sm ring-1 ring-blue-100">
            {/* Aksen garis di samping */}
            <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />

            <div className="flex items-start gap-3">
              <AlertCircleIcon className="mt-0.5 h-5 w-5 text-blue-600" />
              <div className="grid gap-1">
                <AlertTitle className="text-sm font-bold leading-none tracking-tight text-blue-900">
                  Informasi Pengiriman Pesan
                </AlertTitle>
                <AlertDescription className="text-sm leading-relaxed text-blue-700/90">
                  Pesan ini akan dikirimkan langsung ke alamat email mentee
                  sebagai notifikasi resmi.
                </AlertDescription>
              </div>
            </div>
          </Alert>

          <Form {...formSendMessage}>
            <form
              onSubmit={formSendMessage.handleSubmit(onSendMessage)}
              className="space-y-4"
            >
              <FormField
                control={formSendMessage.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subjek</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Masukkan subjek pesan..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formSendMessage.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pesan</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tulis pesan Anda di sini..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Batal
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isLoadingSendMessage}>
                  {isLoadingSendMessage ? (
                    <div className="flex items-center gap-2">
                      <Spinner /> Mengirim...
                    </div>
                  ) : (
                    "Kirim Pesan"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
