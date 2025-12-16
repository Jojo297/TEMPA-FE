import roboterror from "@/assets/robot-error.png";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <>
      {" "}
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Robot illustration */}
          <div className="mb-8 ml-8 justify-center">
            <img src={roboterror} className="w-40" alt="" srcset="" />
          </div>

          {/* 404 text */}
          <h1 className="text-7xl text-primary font-bold mb-6">404</h1>

          {/* Main message */}
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Halaman tidak ditemukan.
          </h2>

          {/* Description */}
          <p className="text-muted-foreground max-w-md mb-8 text-sm leading-relaxed">
            Halaman yang Anda cari tampaknya tidak ada. Tapi jangan khawatir,
            kami punya banyak templat menarik lainnya untuk Anda!
          </p>

          {/* Support text */}
          <p className="text-xs text-muted-foreground">
            Butuh Bantuan?{" "}
            <a
              href="mailto:tempapbl503@gmail.com"
              className="underline hover:text-primary transition-colors"
              target="_blank"
            >
              Hubungi kami
            </a>{" "}
            tempapbl503@gmail.com
          </p>
        </div>
      </div>
    </>
  );
}
