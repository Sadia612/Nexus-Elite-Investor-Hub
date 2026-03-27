import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, CircleDollarSign, Building2, ShieldCheck, 
  Smartphone, Eye, EyeOff, ChevronRight, AlertCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('entrepreneur');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Step & OTP States
  const [step, setStep] = useState(1); 
  const [otp, setOtp] = useState(['', '', '', '']);
  
  // Refs for OTP Auto-focus
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const { login } = useAuth();
  const navigate = useNavigate();

  // Password Strength Logic
  const getStrength = (pass: string) => {
    if (pass.length === 0) return { label: '', color: 'bg-slate-200', w: '0%' };
    if (pass.length < 6) return { label: 'WEAK', color: 'bg-red-400', w: '33%' };
    if (pass.match(/[A-Z]/) && pass.match(/[0-9]/)) return { label: 'SECURE', color: 'bg-blue-600', w: '100%' };
    return { label: 'FAIR', color: 'bg-blue-300', w: '66%' };
  };

  const strength = getStrength(password);

  // OTP Focus Handlers
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 800);
  };

  // FIXED VERIFICATION LOGIC
  const handleFinalVerify = async () => {
    setIsLoading(true);
    setError(null);

    // 1. Check if OTP is '0000'
    const enteredCode = otp.join('');
    if (enteredCode !== '0000') {
      setError("Invalid code. Please use '0000' for testing.");
      setIsLoading(false);
      return;
    }

    try {
      // 2. Call the context login
      await login(email, password, role);
      // 3. Navigate based on role
      const targetPath = role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor';
      navigate(targetPath);
    } catch (err) {
      setError("Login failed. Check your credentials.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 selection:bg-blue-100">
      <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
        
        {/* Logo Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[2rem] shadow-2xl shadow-blue-100 mb-6 border border-blue-50">
            <ShieldCheck size={42} className="text-blue-600" />
          </div>
          <h1 className="text-4xl font-[900] text-slate-900 tracking-tight mb-2 uppercase">Business Nexus</h1>
          <p className="text-slate-500 font-medium tracking-wide uppercase text-[10px]">
            {step === 1 ? 'Secure Access Portal' : 'Identity Verification'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-10 shadow-2xl border border-white">
          
          {error && (
            <div className="mb-6 bg-red-50 text-red-500 text-[11px] font-bold py-3 px-4 rounded-2xl flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {step === 1 ? (
            <form className="space-y-7" onSubmit={handleInitialSubmit}>
              <div className="flex p-1.5 bg-slate-100/50 rounded-2xl border border-slate-100">
                <button
                  type="button"
                  onClick={() => setRole('entrepreneur')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${role === 'entrepreneur' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400'}`}
                >
                  <Building2 size={16} /> Entrepreneur
                </button>
                <button
                  type="button"
                  onClick={() => setRole('investor')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${role === 'investor' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400'}`}
                >
                  <CircleDollarSign size={16} /> Investor
                </button>
              </div>

              <div className="space-y-5">
                <div className="relative group">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Corporate Email"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 font-bold outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                  <User size={18} className="absolute right-5 top-4 text-slate-300" />
                </div>

                <div className="relative group">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 font-bold outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-4 text-slate-300">
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] font-black shadow-xl shadow-blue-100 flex items-center justify-center gap-2 transition-all">
                {isLoading ? 'Processing...' : 'Proceed to Verify'}
                <ChevronRight size={20} />
              </button>
            </form>
          ) : (
            <div className="space-y-10 animate-in slide-in-from-right duration-500">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <Smartphone size={36} />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Enter Code</h3>
                <p className="text-slate-500 text-sm mt-2">Use '0000' to access the hub.</p>
              </div>

              <div className="flex gap-4 justify-center">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={inputRefs[i]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-14 h-18 text-center text-3xl font-black bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all shadow-sm"
                  />
                ))}
              </div>

              <div className="space-y-4">
                <button onClick={handleFinalVerify} className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-[1.5rem] font-black shadow-xl shadow-blue-200 transition-all">
                  Verify & Access
                </button>
                <button onClick={() => setStep(1)} className="w-full text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                  Go Back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};