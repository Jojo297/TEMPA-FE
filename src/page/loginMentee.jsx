import React, { useState } from 'react';


// Mengubah nama fungsi komponen menjadi LoginMentee agar sesuai dengan file.
export default function LoginMentee () {
  // State untuk menampilkan pesan setelah 'Continue'
  const [showNextScreen, setShowNextScreen] = useState(false);

  // Setup data
  const accountEmail = "mentee.example@gmail.com"; // Ubah placeholder email
  const appName = "TEMPA";
  
  // Data akun yang akan diakses
  const accountInfo = [
    { label: "Name and profile picture", email: accountEmail, icon: "👤" },
    { label: "Email address", email: accountEmail, icon: "✉️" },
  ];

  const handleContinue = () => {
    // Simulasi otorisasi berhasil, pindah ke 'next screen'
    setShowNextScreen(true);
  };
  
  // Tampilan layar simulasi setelah login berhasil
  if (showNextScreen) {
      return (
          <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 font-inter">
              <div className="max-w-xl text-center p-10 bg-green-50 rounded-2xl shadow-xl border border-green-200">
                  <h1 className="text-4xl font-bold text-green-700 mb-4">✅ Otorisasi Berhasil!</h1>
                  <p className="text-xl text-gray-700">
                      Anda telah berhasil masuk ke aplikasi **{appName}** sebagai Mentee menggunakan akun Google Anda.
                  </p>
                  <p className="mt-6 text-sm text-gray-500">
                      (Ini adalah simulasi halaman selanjutnya. Di aplikasi nyata, Anda akan diarahkan ke Dashboard Mentee).
                  </p>
              </div>
          </div>
      );
  }

  return (
    // Menggunakan font Inter untuk konsistensi desain
    <div className="min-h-screen bg-gray-50 font-inter flex flex-col items-center p-4 sm:p-8">
      
      {/* Header Google */}
      <div className="w-full max-w-4xl flex items-center mb-10">
        {/* Simulasi Logo Google - G yang lebih stylish */}
        <h1 className="text-2xl font-sans text-gray-700 font-medium flex items-center">
          <span className="text-blue-500 font-extrabold text-3xl">G</span>
          <span className="text-red-500 font-extrabold text-3xl">o</span>
          <span className="text-yellow-500 font-extrabold text-3xl">o</span>
          <span className="text-blue-500 font-extrabold text-3xl">g</span>
          <span className="text-green-500 font-extrabold text-3xl">l</span>
          <span className="text-red-500 font-extrabold text-3xl">e</span>
          <span className="font-light ml-2 text-gray-700 text-xl">Sign in with Google</span>
        </h1>
      </div>
      
      {/* Konten Utama - Menggunakan shadow yang lebih halus dan rounded yang konsisten */}
      <div className="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-2xl shadow-xl flex flex-col md:flex-row border border-gray-100">
        
        {/* Kolom Kiri - Sign in to TEMPA */}
        <div className="md:w-1/2 pr-0 md:pr-12 mb-8 md:mb-0 border-b md:border-b-0 md:border-r border-gray-200 pb-8 md:pb-0">
          <div className="mb-8">
            {/* Logo TEMPA: Dibuat lebih visual */}
            <div className="w-20 h-20 mb-4 flex items-center justify-center rounded-full bg-blue-50 border-2 border-blue-200">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.208 5 7.5 5A6.5 6.5 0 003 11.5c0 1.692.748 3.226 1.968 4.298M12 6.253c1.168.776 2.792 1.253 4.5 1.253 1.708 0 3.332-.477 4.5-1.253M12 6.253v13M12 19.253c-1.168-.776-2.792-1.253-4.5-1.253a6.5 6.5 0 01-4.73 2.112A6.5 6.5 0 0012 19.253zM12 19.253c1.168-.776 2.792-1.253 4.5-1.253a6.5 6.5 0 014.73 2.112A6.5 6.5 0 0012 19.253z" />
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-6">
              Sign in to {appName}
            </h2>
          </div>
          
          {/* Pemilih Akun */}
          <div className="relative inline-block w-full">
            <button className="flex items-center justify-between w-full px-5 py-3 bg-white border border-gray-300 rounded-lg text-left shadow-sm hover:bg-gray-50 transition duration-150 transform active:scale-[0.99]">
              <span className="flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center mr-3 text-base font-bold">
                  {accountEmail.charAt(0).toUpperCase()}
                </span>
                <span className="text-gray-700 font-medium truncate">{accountEmail}</span>
              </span>
              <span className="text-gray-600 ml-2 text-xl">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </span>
            </button>
            <p className="text-xs text-gray-500 mt-2 ml-1">
                This app will access the account selected above.
            </p>
          </div>
        </div>
        
        {/* Kolom Kanan - Persetujuan Akses */}
        <div className="md:w-1/2 md:pl-12 pt-8 md:pt-0">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Google will allow {appName} to access this info about you
          </h2>
          
          {/* Daftar Info Akun */}
          <div className="space-y-5 mb-8">
            {accountInfo.map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="text-2xl mr-4 mt-1">{item.icon}</span>
                <div>
                  <p className="font-medium text-gray-700">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Teks Kebijakan */}
          <div className="text-sm text-gray-600 space-y-4 border-t pt-4 border-gray-100">
            <p>
              Review {appName}'s <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">privacy policy</a> and <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Terms of Service</a> to understand how {appName} will process and protect your data.
            </p>
            <p>
              To make changes at any time, go to your <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Google Account</a>.
            </p>
            <p>
              Learn more about <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">Sign in with Google</a>.
            </p>
          </div>
          
          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row justify-end mt-10 space-y-3 sm:space-y-0 sm:space-x-4">
            <button className="px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition duration-150">
              Cancel
            </button>
            <button 
                className="px-6 py-3 text-base font-medium text-white bg-blue-700 rounded-md hover:bg-blue-800 transition duration-150 shadow-md"
                onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

