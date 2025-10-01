// File: src/page/LoginCampus.jsx 

import React, { useState } from 'react';

// Import komponen InputOTP dari shadcn/ui
// Pastikan path ini benar (gunakan path relatif jika belum mengkonfigurasi alias @):
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "../components/ui/input-otp"; // <-- PATH RELATIF CONTOH

export default function LoginCampus() {
    const [mode, setMode] = useState('signin'); 
    const [step, setStep] = useState(1); 
    const [email, setEmail] = useState(''); 
    const [code, setCode] = useState(''); // State untuk kode verifikasi

    const isSignIn = mode === 'signin';
    const progressWidth = isSignIn ? 'w-full' : 'w-1/2'; 
    
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
        
        if (step === 1) {
            if (!email) {
                alert('Email tidak boleh kosong.');
                return;
            }
            
            alert(`Kode verifikasi 6 digit dikirim ke ${email}. (Kode Simulasi: 123456)`);
            setStep(2); 
            
        } else if (step === 2) {
            if (code.length < 6) { 
                alert('Kode verifikasi harus 6 digit.');
                return;
            }

            if (code === '123456') { 
                 alert(`Verifikasi berhasil! Anda akan diarahkan.`);
                 // Lanjut ke tahap berikutnya atau redirect
            } else {
                 alert('Kode verifikasi salah. Coba lagi.');
            }
        }
    };

    const handleModeChange = (newMode) => {
        setMode(newMode);
        setStep(1); 
        setEmail('');
        setCode('');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className={`flex w-[900px] h-[600px] shadow-2xl rounded-xl overflow-hidden`}>
                
                {/* Bagian Kiri (Panel Hijau Gelap) */}
                <div className={`w-2/5 p-10 ${DARK_GREEN} text-white flex flex-col justify-start`}>
                    <div className="mb-20"> 
                        <div className="text-base font-bold p-3 border-2 border-white w-20 h-20 flex items-center justify-center leading-none">
                            TEMPA
                        </div>
                    </div>
                    <h1 className="text-5xl font-extrabold leading-tight">
                        Welcome <br />
                        Campus!
                    </h1>
                </div>

                {/* Bagian Kanan (Form) */}
                <div className="w-3/5 bg-white p-16 flex flex-col">
                    
                    {/* Header Form (Tab & Progress Bar) */}
                    <div className="mb-10">
                        <div className="flex justify-between mb-1 font-bold text-gray-400">
                            <span 
                                className={`cursor-pointer ${!isSignIn ? 'text-gray-900' : ''}`}
                                onClick={() => handleModeChange('signup')}
                            >
                                Sign Up
                            </span>
                            <span 
                                className={`cursor-pointer ${isSignIn ? 'text-gray-900' : ''}`}
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
                    <form onSubmit={handleNext} className="flex flex-col">
                        <h2 className="text-2xl font-semibold mb-1">{step === 1 ? titleStep1 : titleStep2}</h2>
                        <p className="text-sm text-gray-500 mb-8">{step === 1 ? subtitleStep1 : subtitleStep2}</p>
                        
                        
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
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                                    required 
                                />
                            </div>
                        )}

                        {/* INPUT STEP 2: Code (Menggunakan InputOTP dari shadcn/ui) */}
                        {step === 2 && (
                            <div className="mb-6 flex flex-col items-center"> 
                                <label htmlFor="code" className="block text-xs text-gray-500 mb-4">
                                    Masukkan kode yang Anda terima
                                </label>
                                
                                <InputOTP 
                                    maxLength={6} 
                                    value={code} // <-- Tambahkan prop value
                                    onChange={(value) => setCode(value)} // <-- Tambahkan prop onChange
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>

                                <div className="text-right mt-4 w-full">
                                    <a href="#" onClick={(e) => e.preventDefault()} className={`text-xs ${LIGHT_BLUE_TEXT} hover:underline`}>
                                        Resend Code
                                    </a>
                                </div>
                            </div>
                        )}


                        <button 
                            type="submit" 
                            className={`w-full p-3 ${DARK_GREEN} text-white font-semibold rounded-lg mt-4 hover:bg-opacity-90 transition duration-150`}
                        >
                            {buttonText}
                        </button>

                        <div className="text-center mt-6 text-sm text-gray-500">
                            {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
                            <a 
                                href="#" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleModeChange(isSignIn ? 'signup' : 'signin');
                                }}
                                className={`font-bold hover:underline ${LIGHT_BLUE_TEXT}`}
                            >
                                {isSignIn ? "Sign Up" : "Sign In"}
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};