import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { SpartanLogo } from '../SpartanLogo';

export function LoginScreen({ onLoginSuccess, onGoToRegister, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div
      className="relative w-full h-full text-white flex flex-col justify-between select-none overflow-hidden"
      style={{
        backgroundColor: '#121416',
        paddingLeft: '24px',
        paddingRight: '24px',
        paddingTop: '20px',
        paddingBottom: '28px',
        boxSizing: 'border-box',
        minHeight: '100%',
      }}
    >
      <div>
        {/* Top Bar with Back Arrow and Centered Spartan Shield */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <SpartanLogo variant="shield" />
          <div className="w-8" />
        </div>

        {/* Title */}
        <div className="mb-5 text-left">
          <h1
            className="font-headline font-black uppercase text-white leading-tight mb-1"
            style={{
              fontFamily: "'Barlow Condensed', 'Bebas Neue', 'Oswald', sans-serif",
              fontSize: '32px',
              letterSpacing: '0.01em',
            }}
          >
            WELCOME BACK
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              color: '#94A3B8',
            }}
          >
            Sign in to continue your training.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {/* Email / Spartan ID */}
          <div className="flex flex-col gap-1 text-left">
            <label
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '11px',
                fontWeight: '700',
                color: '#94A3B8',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              EMAIL OR SPARTAN ID
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="athlete@spartan28.com"
              className="w-full px-3.5 text-white placeholder-gray-500 focus:outline-none transition-colors"
              style={{
                height: '44px',
                borderRadius: '4px',
                backgroundColor: '#16191d',
                border: '1px solid #252c34',
                fontSize: '13px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 text-left">
            <label
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '11px',
                fontWeight: '700',
                color: '#94A3B8',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              PASSWORD
            </label>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3.5 pr-10 text-white placeholder-gray-500 focus:outline-none transition-colors"
                style={{
                  height: '44px',
                  borderRadius: '4px',
                  backgroundColor: '#16191d',
                  border: '1px solid #252c34',
                  fontSize: '13px',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <div
                onClick={() => setRememberMe(!rememberMe)}
                className="w-7 h-3.5 rounded-full transition-colors relative cursor-pointer"
                style={{
                  backgroundColor: rememberMe ? '#00E676' : '#333b45',
                }}
              >
                <div
                  className="w-3 h-3 rounded-full bg-black absolute top-[1px] transition-transform"
                  style={{
                    left: rememberMe ? '13px' : '2px',
                  }}
                />
              </div>
              <span style={{ fontSize: '11.5px', color: '#94A3B8' }}>Remember me</span>
            </label>

            <button
              type="button"
              className="hover:underline cursor-pointer"
              style={{ fontSize: '11.5px', color: '#94A3B8' }}
            >
              Forgot password?
            </button>
          </div>

          {/* Sign In CTA */}
          <button
            type="submit"
            className="w-full mt-2 flex items-center justify-center transition-all duration-150 active:scale-[0.99] cursor-pointer"
            style={{
              height: '46px',
              borderRadius: '3px',
              backgroundColor: '#00E676',
              color: '#000000',
              fontFamily: "'Barlow Condensed', 'Bebas Neue', sans-serif",
              fontWeight: '800',
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: 'none',
              boxShadow: '0 2px 10px rgba(0, 230, 118, 0.25)',
            }}
          >
            SIGN IN
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#22272e]" />
          </div>
          <span
            className="relative px-3 text-[11px] text-gray-500 font-medium"
            style={{ backgroundColor: '#121416' }}
          >
            or continue with
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={onLoginSuccess}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-[4px] bg-[#16191d] border border-[#252c34] hover:border-gray-500 text-white text-[12.5px] font-medium transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.62 1.34-.56.64-1.06 1.71-.93 2.73 1 .08 2.02-.47 2.63-1.22z"/>
            </svg>
            <span>Apple</span>
          </button>

          <button
            onClick={onLoginSuccess}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-[4px] bg-[#16191d] border border-[#252c34] hover:border-gray-500 text-white text-[12.5px] font-medium transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Google</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-4 text-[12px] text-gray-400">
        Don't have an account?{' '}
        <button
          onClick={onGoToRegister}
          className="text-[#00E676] font-semibold hover:underline cursor-pointer"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
