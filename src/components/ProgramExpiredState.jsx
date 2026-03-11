import { CalendarX, ArrowLeft, RefreshCw } from "lucide-react"; // Opsional: Gunakan lucide-react untuk icon

const ProgramExpiredState = ({ onBack, onRefresh }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center animate-fadeIn">
      {/* Icon Section */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl transform scale-150"></div>
        <div className="relative bg-white border-2 border-primary/20 p-5 rounded-full shadow-sm">
          <CalendarX className="w-12 h-12 text-primary" />
        </div>
      </div>

      {/* Text Content */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Program Telah Berakhir
      </h2>
      <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
        Maaf, sesi presensi untuk program ini sudah ditutup. Kamu tidak dapat
        lagi mengakses halaman ini.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <button
          onClick={onRefresh}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          <RefreshCw className="w-4 h-4" />
          Coba Lagi
        </button>

        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-primary border border-primary/20 rounded-lg font-medium hover:bg-gray-50 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>
      </div>

      {/* Footer Info */}
      <p className="mt-8 text-xs text-gray-400 font-light">
        ID Error: 410 • Periode Program Selesai
      </p>
    </div>
  );
};

export default ProgramExpiredState;
