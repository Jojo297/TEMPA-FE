import React, { useState } from 'react';

// Impor komponen InputOTP dihapus karena menyebabkan kesalahan kompilasi.
// Fungsionalitas OTP sekarang ditangani dengan input HTML kustom.

export default function LoginCampus() {
    // State autentikasi
    const [mode, setMode] = useState('signin'); 
    const [step, setStep] = useState(1); 
    const [email, setEmail] = useState(''); 
    const [code, setCode] = useState(''); // State untuk kode verifikasi
    const [error, setError] = useState(''); // State untuk pesan kesalahan/simulasi
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State baru untuk melacak status login

    const isSignIn = mode === 'signin';
    // Progress bar akan penuh jika sudah di Langkah 2 (setelah email dimasukkan)
    const progressWidth = step === 1 ? 'w-1/2' : 'w-full'; 
    
    // Teks Langkah 1 & 2
    const titleStep1 = isSignIn ? 'Enter your campus email' : 'Create a Campus Account';
    const subtitleStep1 = isSignIn 
        ? 'Enter the email you used to sign up before.'
        : 'Please use your official campus email to register.';
    const titleStep2 = 'Enter the verification code';
    const subtitleStep2 = `A verification code has been sent to ${email}.`;
    
    const buttonText = step === 1 ? 'Next' : 'Verify & Continue';

    // Warna Tailwind
    const DARK_GREEN = 'bg-[#10403D]'; 
    const LIGHT_BLUE_TEXT = 'text-[#5BC0EB]'; 
    const PROGRESS_BLUE = 'bg-[#5BC0EB]';

    const handleNext = (e) => {
        e.preventDefault();
        setError(''); // Reset error
        
        if (step === 1) {
            if (!email) {
                setError('Email tidak boleh kosong.'); 
                return;
            }
            
            // SIMULASI: Anggap kode verifikasi dikirim berhasil.
            setError(`[SIMULASI] Kode dikirim! Gunakan: 123456`);
            setStep(2); 
            
        } else if (step === 2) {
            if (code.length !== 6) { 
                setError('Kode verifikasi harus 6 digit.');
                return;
            }

            if (code === '123456') { 
                // Aksi baru: Atur status login menjadi true
                setIsLoggedIn(true); 
                console.log("Login Successful! Redirecting to Dashboard.");
            } else {
                setError('Kode verifikasi salah. Coba lagi.');
            }
        }
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
        setStep(1); 
        setEmail('');
        setCode('');
        setError(''); // Reset error saat mode berubah
    };

    // Handler untuk input kode kustom (memastikan hanya angka dan 6 digit)
    const handleCodeChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Hanya angka
        setCode(value);
    };
    
    // Handler Logout
    const handleLogout = () => {
        setIsLoggedIn(false);
        setStep(1);
        setEmail('');
        setCode('');
        setError('');
    };

    // --- TAMPILAN DASHBOARD (JIKA SUDAH LOGIN) ---
    if (isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
                <div className="w-full max-w-4xl p-10 bg-white rounded-xl shadow-2xl">
                    <div className="flex justify-between items-center mb-10">
                        <h1 className={`text-4xl font-bold ${LIGHT_BLUE_TEXT}`}>
                            👋 Selamat Datang, Staf Kampus!
                        </h1>
                        <button
                            onClick={handleLogout}
                            className={`p-2 px-4 text-sm font-semibold text-white rounded-lg transition duration-150 shadow-md ${DARK_GREEN} hover:opacity-90`}
                        >
                            Logout
                        </button>
                    </div>
                    <p className="text-gray-700 mb-6 text-lg">
                        Anda telah berhasil masuk ke sistem TEMPA Campus. Ini adalah halaman Dashboard Anda.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition">
                            <h3 className="font-semibold text-xl mb-2 text-[#10403D]">Data Mahasiswa</h3>
                            <p className="text-sm text-gray-500">Kelola dan lihat semua data mahasiswa aktif.</p>
                        </div>
                        <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition">
                            <h3 className="font-semibold text-xl mb-2 text-[#10403D]">Jadwal Kuliah</h3>
                            <p className="text-sm text-gray-500">Buat dan perbarui jadwal perkuliahan semester.</p>
                        </div>
                        <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition">
                            <h3 className="font-semibold text-xl mb-2 text-[#10403D]">Laporan Keuangan</h3>
                            <p className="text-sm text-gray-500">Akses laporan biaya dan pendapatan kampus.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    // --- TAMPILAN LOGIN (JIKA BELUM LOGIN) ---
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className={`flex w-full max-w-5xl h-auto md:h-[600px] shadow-2xl rounded-xl overflow-hidden bg-white`}>
                
                {/* Bagian Kiri (Panel Hijau Gelap) */}
                <div className={`hidden md:flex w-2/5 p-10 ${DARK_GREEN} text-white flex-col justify-start`}>
                    <div className="mb-20"> 
                        <div className="text-base font-bold p-3 border-2 border-white w-20 h-20 flex items-center justify-center leading-none rounded-lg">
                            TEMPA
                        </div>
                    </div>
                    <h1 className="text-5xl font-extrabold leading-tight">
                        Welcome <br />
                        Campus!
                    </h1>
                </div>

                {/* Bagian Kanan (Form) */}
                <div className="w-full md:w-3/5 bg-white p-8 md:p-16 flex flex-col">
                    
                    {/* Header Form (Tab & Progress Bar) */}
                    <div className="mb-10">
                        <div className="flex justify-between mb-1 font-bold text-gray-400">
                            <span 
                                className={`cursor-pointer transition duration-200 ${!isSignIn ? 'text-gray-900' : ''} ${!isSignIn ? LIGHT_BLUE_TEXT : ''}`}
                                onClick={() => handleModeChange('signup')}
                            >
                                Sign Up
                            </span>
                            <span 
                                className={`cursor-pointer transition duration-200 ${isSignIn ? 'text-gray-900' : ''} ${isSignIn ? LIGHT_BLUE_TEXT : ''}`}
                                onClick={() => handleModeChange('signin')}
                            >
                                Sign In
                            </span>
                        </div>
                        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className={`${PROGRESS_BLUE} h-full transition-all duration-300 ease-in-out ${progressWidth}`}
                            ></div>
                        </div>
                    </div>

                    {/* Form Utama */}
                    <form onSubmit={handleNext} className="flex flex-col flex-grow">
                        <h2 className="text-2xl font-semibold mb-1">{step === 1 ? titleStep1 : titleStep2}</h2>
                        <p className="text-sm text-gray-500 mb-8">{step === 1 ? subtitleStep1 : subtitleStep2}</p>
                        
                        {/* Area Pesan Error/Simulasi */}
                        {error && (
                            <div 
                                className={`p-3 mb-4 text-sm rounded-lg ${error.includes('berhasil') || error.includes('SIMULASI') ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}
                                role="alert"
                            >
                                {error}
                            </div>
                        )}
                        
                        
                        {/* INPUT STEP 1: Email */}
                        {step === 1 && (
                            <div className="mb-6"> 
                                <label htmlFor="email" className="block text-xs text-gray-500 mb-1">
                                    Campus Email
                                </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="dosen/staf@kampus.ac.id" 
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5BC0EB]"
                                    required 
                                />
                            </div>
                        )}

                        {/* INPUT STEP 2: Code (Menggunakan Input HTML Kustom) */}
                        {step === 2 && (
                            <div className="mb-6 flex flex-col items-center"> 
                                <label htmlFor="code" className="block text-sm text-gray-500 mb-4">
                                    Masukkan kode 6 digit yang Anda terima
                                </label>
                                
                                <div className="w-full max-w-sm">
                                    <input 
                                        type="tel" 
                                        id="code"
                                        maxLength={6} 
                                        value={code} 
                                        onChange={handleCodeChange}
                                        placeholder="KODE 6 DIGIT"
                                        // Styling untuk input kode kustom
                                        className="w-full p-3 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#5BC0EB] tracking-[0.5em] focus:shadow-lg" 
                                        autoFocus
                                        required
                                    />
                                </div>

                                <div className="text-right mt-4 w-full max-w-sm">
                                    <button 
                                        type="button" 
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Trigger Resend Code (kembali ke step 1)
                                            handleModeChange(mode);
                                        }} 
                                        className={`text-xs font-semibold ${LIGHT_BLUE_TEXT} hover:underline`}
                                    >
                                        Resend Code
                                    </button>
                                </div>
                            </div>
                        )}


                        <button 
                            type="submit" 
                            className={`w-full p-3 ${DARK_GREEN} text-white font-semibold rounded-lg mt-auto hover:bg-opacity-90 transition duration-150 shadow-md`}
                        >
                            {buttonText}
                        </button>

                        <div className="text-center mt-6 text-sm text-gray-500">
                            {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button 
                                type="button" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleModeChange(isSignIn ? 'signup' : 'signin');
                                }}
                                className={`font-bold hover:underline ${LIGHT_BLUE_TEXT}`}
                            >
                                {isSignIn ? "Sign Up" : "Sign In"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
