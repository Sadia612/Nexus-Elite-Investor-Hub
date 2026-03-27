import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, CircleDollarSign, Building2, ShieldCheck, 
  Smartphone, Eye, EyeOff, ChevronRight, AlertCircle 
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'entrepreneur' | 'investor'>('entrepreneur');
  const [isLoading, setIsLoading] = useState(false);
  
  const [step, setStep] = useState(1); 
  const [otp, setOtp] = useState(['', '', '', '']);
  
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const navigate = useNavigate();

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 3) inputRefs[index + 1].current?.focus();
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 500);
  };

  // INSTANT BYPASS LOGIC
  const handleFinalVerify = () => {
    setIsLoading(true);
    // No more credential checks - Just go to dashboard
    const targetPath = role === 'entrepreneur' ? '/dashboard/entrepreneur' : '/dashboard/investor';
    navigate(targetPath);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-[440px] animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-[2rem] shadow-2xl mb-6 border border-blue-50">
            <ShieldCheck size={42} className="text-blue-600" />
          </div>
          <h1 className="text-4xl font-[900] text-slate-900 tracking-tight mb-2 uppercase">Business Nexus</h1>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-[3rem] p-10 shadow-2xl border border-white">
          {step === 1 ? (
            <form className="space-y-7" onSubmit={handleInitialSubmit}>
              <div className="flex p-1.5 bg-slate-100/50 rounded-2xl border border-slate-100">
                <button type="button" onClick={() => setRole('entrepreneur')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === 'entrepreneur' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400'}`}>Entrepreneur</button>
                <button type="button" onClick={() => setRole('investor')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${role === 'investor' ? 'bg-white shadow-md text-blue-600' : 'text-slate-400'}`}>Investor</button>
              </div>
              <div className="space-y-5">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 font-bold outline-none focus:border-blue-500" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl py-4 px-5 font-bold outline-none focus:border-blue-500" />
              </div>
              <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black shadow-xl hover:bg-blue-700 transition-all">
                {isLoading ? 'Processing...' : 'Proceed'}
              </button>
            </form>
          ) : (
            <div className="space-y-10">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-blue-600"><Smartphone size={36} /></div>
                <h3 className="text-2xl font-black text-slate-900">Instant Access</h3>
                <p className="text-slate-500 text-sm mt-2">Click verify to enter the dashboard.</p>
              </div>
              <div className="flex gap-4 justify-center">
                {otp.map((digit, i) => (
                  <input key={i} ref={inputRefs[i]} type="text" maxLength={1} value={digit} onChange={(e) => handleOtpChange(i, e.target.value)} className="w-14 h-18 text-center text-3xl font-black bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 outline-none" />
                ))}
              </div>
              <button onClick={handleFinalVerify} className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black shadow-xl hover:bg-blue-700 transition-all">
                {isLoading ? 'Entering...' : 'Verify & Access'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};