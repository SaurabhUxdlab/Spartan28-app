import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SpartanLogo } from '../SpartanLogo';

export function RegisterScreen({ onRegisterSuccess, onGoToLogin, onBack }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterSuccess();
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#0d0f12] text-white flex flex-col justify-between px-7 pt-6 pb-8 select-none">
      <div>
        {/* Top Bar with Back Button and Shield */}
        <div className="flex items-center justify-between pt-2 pb-5">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <SpartanLogo variant="shield" />
          <div className="w-8" />
        </div>

        {/* Header */}
        <div className="mb-5">
          <h1
            className="font-headline text-[30px] sm:text-[34px] font-black uppercase tracking-tight text-white leading-tight mb-1"
            style={{ fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif" }}
          >
            CREATE YOUR ACCOUNT
          </h1>
          <p className="text-gray-400 text-[13px] font-normal">
            Join the Spartan 28 training network today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 font-headline font-bold text-[11px] uppercase tracking-wider">
                FIRST NAME
              </label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Marcus"
                className="w-full bg-[#161a1e] border border-[#272d34] rounded-lg px-3.5 py-3 text-white text-[14px] placeholder-gray-500 focus:outline-none focus:border-[#00E676] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 font-headline font-bold text-[11px] uppercase tracking-wider">
                LAST NAME
              </label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Vance"
                className="w-full bg-[#161a1e] border border-[#272d34] rounded-lg px-3.5 py-3 text-white text-[14px] placeholder-gray-500 focus:outline-none focus:border-[#00E676] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 font-headline font-bold text-[11px] uppercase tracking-wider">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="athlete@spartan28.com"
              className="w-full bg-[#161a1e] border border-[#272d34] rounded-lg px-3.5 py-3 text-white text-[14px] placeholder-gray-500 focus:outline-none focus:border-[#00E676] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-400 font-headline font-bold text-[11px] uppercase tracking-wider">
              PHONE
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 000-2828"
              className="w-full bg-[#161a1e] border border-[#272d34] rounded-lg px-3.5 py-3 text-white text-[14px] placeholder-gray-500 focus:outline-none focus:border-[#00E676] transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 font-headline font-bold text-[11px] uppercase tracking-wider">
                PASSWORD
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#161a1e] border border-[#272d34] rounded-lg px-3.5 py-3 text-white text-[14px] placeholder-gray-500 focus:outline-none focus:border-[#00E676] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-gray-400 font-headline font-bold text-[11px] uppercase tracking-wider">
                CONFIRM
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-[#161a1e] border border-[#272d34] rounded-lg px-3.5 py-3 text-white text-[14px] placeholder-gray-500 focus:outline-none focus:border-[#00E676] transition-colors"
              />
            </div>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="w-full mt-3 py-4 rounded-md bg-[#00E676] hover:bg-[#00C853] text-black font-headline font-black text-[15px] tracking-wider uppercase transition-all duration-200 shadow-[0_4px_20px_rgba(0,230,118,0.25)] active:scale-[0.99]"
          >
            CREATE ACCOUNT
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center pt-5 pb-2 text-[13px] text-gray-400">
        Already have an account?{' '}
        <button
          onClick={onGoToLogin}
          className="text-[#00E676] font-semibold hover:underline"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default RegisterScreen;
