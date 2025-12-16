import React, { useState } from "react";
import { TrendingUp, Handshake } from "lucide-react";
import QRCode from "react-qr-code";

export default function DashboardCampusBerlangganan() {
  const mainColor = "#003631";
  const secondaryColor = "#96CCEC";

  const [page, setPage] = useState("list");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const packages = [
    {
      title: "TEMPA Berkembang",
      icon: <TrendingUp size={55} className="text-[#101112]" />,
      price: "RP 2.000.000 / 6 bulan",
      amount: 2000000,
      features: [
        "Tambahkan 5 Program",
        "Tambahkan 5 Mentor",
        "Masukkan 5 Materi per Program",
      ],
    },
    {
      title: "TEMPA Eksklusif",
      icon: <Handshake size={55} className="text-[#101112]" />,
      price: "RP 3.000.000 / 6 bulan",
      amount: 3000000,
      features: [
        "Tambahkan Program tanpa batas",
        "Tambahkan Mentor tanpa batas",
        "Masukkan Materi tanpa batas",
      ],
    },
    {
      title: "TEMPA Berkembang",
      icon: <TrendingUp size={55} className="text-[#101112]" />,
      price: "RP 4.000.000 / 12 bulan",
      amount: 4000000,
      features: [
        "Tambahkan 5 Program",
        "Tambahkan 5 Mentor",
        "Masukkan 5 Materi per Program",
      ],
    },
    {
      title: "TEMPA Eksklusif",
      icon: <Handshake size={55} className="text-[#101112]" />,
      price: "RP 5.000.000 / 12 bulan",
      amount: 5000000,
      features: [
        "Tambahkan Program tanpa batas",
        "Tambahkan Mentor tanpa batas",
        "Masukkan Materi tanpa batas",
      ],
    },
  ];

  // ======================
  //    PAYMENT PAGE
  // ======================
  const PaymentPage = ({ pkg }) => {
    const adminFee = 2500;
    const total = pkg.amount + adminFee;
    const orderId = "111100000" + Math.floor(Math.random() * 9);

    return (
      <div className="p-6">
        <div
          className="w-full max-w-4xl mx-auto text-white rounded-xl shadow-2xl p-10 mt-10"
          style={{ backgroundColor: mainColor }}
        >
          <h2 className="text-2xl font-bold text-center mb-10">Pembayaran</h2>

          <p className="mb-2 font-semibold">Metode Pembayaran</p>
          <div className="w-full p-3 rounded-lg bg-white text-black font-semibold mb-8">
            QRIS (Only)
          </div>

          <p className="font-semibold text-lg mb-3">Detail Pembayaran</p>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Biaya Langganan</span>
              <span>Rp {pkg.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Biaya Admin</span>
              <span>Rp {adminFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-bold text-base mt-4">
              <span>Total Pembayaran</span>
              <span>Rp {total.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => setShowQR(true)}
            className="w-full mt-8 py-3 rounded-lg text-black font-bold shadow-md hover:opacity-90"
            style={{ backgroundColor: secondaryColor }}
          >
            Bayar
          </button>

          <button
            onClick={() => {
              setSelectedPackage(null);
              setPage("list");
            }}
            className="w-full mt-3 py-3 rounded-lg border border-white text-white font-bold"
          >
            Kembali
          </button>
        </div>

        {showQR && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white w-[420px] rounded-xl p-8 text-center relative">
              <button
                onClick={() => setShowQR(false)}
                className="absolute right-4 top-4 text-xl"
              >
                ✕
              </button>

              <h1
                className="text-3xl font-extrabold mb-6"
                style={{ color: mainColor }}
              >
                TEMPA
              </h1>

              <h2 className="text-xl font-bold mb-1">
                Rp {total.toLocaleString()}
              </h2>

              <p className="text-gray-500 text-sm mb-4">
                ID pemesanan #{orderId}
              </p>

              <div className="bg-white p-4 rounded-lg border mx-auto w-fit">
                <QRCode
                  value={`TEMPA|Paket:${pkg.title}|Total:${total}|OrderID:${orderId}`}
                  size={240}
                />
              </div>

              <button className="mt-6 w-full py-3 border border-black rounded-lg font-semibold hover:bg-gray-100">
                Unduh QR
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ======================
  //    HISTORY PAGE
  // ======================
  const HistoryPage = () => {
    const rows = [
      {
        date: "3/12/2025",
        type: "Paket 6 bulan",
        total: "3.002.500",
        period: "03 Des 2025 - 3 Juni 2026",
        status: "Berlangsung",
      },
      {
        date: "3/12/2025",
        type: "Paket 6 bulan",
        total: "3.002.500",
        period: "03 Des 2025 - 3 Juni 2026",
        status: "Selesai",
      },
      {
        date: "3/12/2025",
        type: "Paket 6 bulan",
        total: "3.002.500",
        period: "03 Des 2025 - 3 Juni 2026",
        status: "Selesai",
      },
    ];

    return (
      <div className="min-h-screen" style={{ backgroundColor: mainColor }}>
        <h2 className="text-white text-3xl font-bold text-center py-10">
          Riwayat Berlangganan
        </h2>

        <div className="bg-[#0C4A45] text-white text-sm rounded-t-xl p-4 grid grid-cols-5 font-semibold">
          <p>Tanggal</p>
          <p>Jenis Langganan</p>
          <p>Total Pembayaran</p>
          <p>Periode Langganan</p>
          <p>Status</p>
        </div>

        {rows.map((row, i) => (
          <div
            key={i}
            className="bg-[#003631] text-white text-sm p-4 grid grid-cols-5 border-b border-white/10"
          >
            <p>{row.date}</p>
            <p>{row.type}</p>
            <p>{row.total}</p>
            <p>{row.period}</p>
            <p>
              <span
                className={`px-3 py-1 rounded text-black font-bold ${
                  row.status === "Berlangsung"
                    ? "bg-yellow-400"
                    : "bg-green-400"
                }`}
              >
                {row.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    );
  };

  // ======================
  //       LIST PAGE
  // ======================
  if (page === "payment" && selectedPackage)
    return <PaymentPage pkg={selectedPackage} />;

  if (page === "history") return <HistoryPage />;

  return (
    <div className="min-h-scree font-sans">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="bg-primary text-white rounded-xl p-6 shadow">
          <h1 className="text-2xl font-bold mb-2">Berlangganan</h1>
          <p className="text-sm max-w-2xl mx-auto">
            Pilih paket sesuai kebutuhan kampus Anda.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-5xl mx-auto mt-4">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md border border-gray-200 p-8 flex flex-col hover:shadow-lg transition duration-200"
            style={{ borderTop: `5px solid ${mainColor}` }}
          >
            <div className="flex justify-center items-center mb-4">
              {pkg.icon}
            </div>

            <h3 className="text-xl font-bold text-center mb-6">{pkg.title}</h3>

            <ul className="text-gray-700 text-sm space-y-3 mb-8 px-5">
              {pkg.features.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#101112] mt-1">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="text-center mt-auto">
              <p className="text-xl font-extrabold mb-5">{pkg.price}</p>

              <button
                onClick={() => {
                  setSelectedPackage(pkg);
                  setPage("payment");
                }}
                className="w-full font-bold py-3 rounded-lg text-white hover:opacity-90 transition"
                style={{ backgroundColor: secondaryColor }}
              >
                BERLANGGANAN
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 max-w-4xl mx-auto mt-4 mb-10">
        <button
          onClick={() => setPage("history")}
          className="w-full text-white font-bold py-3 rounded-lg hover:opacity-90 transition shadow-md"
          style={{ backgroundColor: secondaryColor }}
        >
          RIWAYAT BERLANGGANAN
        </button>
      </div>
    </div>
  );
}
