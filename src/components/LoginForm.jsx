import React, { useState } from 'react';
import './LoginForm.css'; // Import file CSS yang akan kita buat

const LoginForm = () => {
    // State untuk mengontrol mode: 'signin' atau 'signup'
    const [mode, setMode] = useState('signin'); 
    const [name, setName] = useState('admin'); // State untuk input
    const [password, setPassword] = useState('••••••••'); // State untuk input

    const isSignIn = mode === 'signin';
    const progressWidth = isSignIn ? '100%' : '50%';
    const formTitle = isSignIn ? 'Enter your name and password' : 'Create a New Account';
    const formSubtitle = isSignIn 
        ? 'Enter the name and password you used to sign up before.'
        : 'Please fill in your details to create an account.';
    const buttonText = isSignIn ? 'Sign In' : 'Sign Up';

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logika autentikasi di sini
        if (name === 'admin' && password === '123') {
            alert(`Login berhasil! Selamat datang, ${name}.`);
        } else if (!isSignIn) {
             alert(`Akun ${name} berhasil didaftarkan! (Contoh Simulasi)`);
             setMode('signin'); // Setelah daftar, pindah ke login
        } else {
            alert('Nama atau kata sandi salah. Coba lagi.');
        }
    };

    return (
        <div className="container">
            {/* Bagian Kiri (Warna gelap) */}
            <div className="left-panel">
                <div className="logo">
                    <div className="puzzle-icon">E M D S U</div>
                </div>
                <h1 className="welcome-text">
                    Welcome <br />
                    Admin!
                </h1>
            </div>

            {/* Bagian Kanan (Form Login/Signup) */}
            <div className="right-panel">
                <div className="form-header">
                    {/* Bar Sign Up / Sign In */}
                    <div className="tab-bar">
                        <span 
                            className={`tab ${!isSignIn ? 'active' : ''}`}
                            onClick={() => setMode('signup')}
                        >
                            Sign Up
                        </span>
                        <span 
                            className={`tab ${isSignIn ? 'active' : ''}`}
                            onClick={() => setMode('signin')}
                        >
                            Sign In
                        </span>
                    </div>
                    <div className="progress-bar-container">
                        <div 
                            className="progress-bar-fill" 
                            style={{ width: progressWidth }}
                        ></div>
                    </div>
                </div>

                {/* Form Utama */}
                <form onSubmit={handleSubmit} className="login-form">
                    <h2>{formTitle}</h2>
                    <p className="subtitle">{formSubtitle}</p>

                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="admin" 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••" 
                            required 
                        />
                    </div>
                    
                    {/* Tampilkan kolom konfirmasi password hanya saat mode Sign Up */}
                    {!isSignIn && (
                         <div className="input-group">
                            <label htmlFor="confirm-password">Confirm Password</label>
                            <input 
                                type="password" 
                                id="confirm-password" 
                                name="confirm-password" 
                                placeholder="••••••••" 
                                required 
                            />
                        </div>
                    )}


                    <button type="submit" className="sign-in-button">
                        {buttonText}
                    </button>

                    <div className="signup-link">
                        {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
                        <a 
                            href="#" 
                            onClick={(e) => {
                                e.preventDefault();
                                setMode(isSignIn ? 'signup' : 'signin');
                            }}
                        >
                            {isSignIn ? "Sign Up" : "Sign In"}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;