import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { 
  ArrowUpRight, ArrowDownLeft, Send, History, 
  CheckCircle2, Wallet, X, AlertCircle, CircleDollarSign, Zap
} from 'lucide-react';

export const PaymentsPage: React.FC = () => {
  const [balance, setBalance] = useState(25000.00);
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Deposit', person: 'Global Tech Fund', amount: 5000, status: 'Completed', date: '2024-03-18' },
    { id: 2, type: 'Transfer', person: 'Cloud Services', amount: -200, status: 'Completed', date: '2024-03-19' },
  ]);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'Deposit' | 'Withdraw'>('Deposit');
  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [inputAmount, setInputAmount] = useState('');
  const [dealAmount, setDealAmount] = useState('50000');
  const [error, setError] = useState<string | null>(null);

  // Milestone 7: Guided Walkthrough Logic
  const startGuidedTour = () => {
    const steps = [
      "Welcome to Finance Hub! 🏦",
      "1. Use 'Deposit' to add startup capital.",
      "2. 'B2B Deal' allows direct investor-to-startup funding.",
      "3. Check the 'Audit Trail' for live transaction logs."
    ];
    
    let currentStep = 0;
    const showNextStep = () => {
      if (currentStep < steps.length) {
        alert(steps[currentStep]);
        currentStep++;
        setTimeout(showNextStep, 800);
      }
    };
    showNextStep();
  };

  const openModal = (type: 'Deposit' | 'Withdraw') => {
    setModalType(type);
    setInputAmount('');
    setError(null);
    setIsModalOpen(true);
  };

  // Transaction Logic
  const handleTransaction = () => {
    const amount = parseFloat(inputAmount);
    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (modalType === 'Withdraw' && amount > balance) {
      setError("Insufficient funds.");
      return;
    }

    const finalAmount = modalType === 'Deposit' ? amount : -amount;
    setBalance(prev => prev + finalAmount);
    
    const newEntry = {
      id: Date.now(),
      type: modalType,
      person: modalType === 'Deposit' ? 'External Bank' : 'Self Withdrawal',
      amount: finalAmount,
      status: 'Completed',
      date: new Date().toISOString().split('T')[0]
    };
    
    setTransactions(prev => [newEntry, ...prev]);
    setIsModalOpen(false);
  };

  const handleFundingDeal = () => {
    const amount = parseFloat(dealAmount);
    setBalance(prev => prev + amount);
    setTransactions(prev => [{
      id: Date.now(),
      type: 'Funding',
      person: 'Nexus Capital (Investor)',
      amount: amount,
      status: 'Completed',
      date: new Date().toISOString().split('T')[0]
    }, ...prev]);
    setIsDealModalOpen(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Operational Hub</span>
          </div>
          <h1 className="text-4xl font-[900] text-slate-900 tracking-tight">Finance Hub</h1>
          <p className="text-slate-500 font-medium mt-1">Real-time capital management & deal flows</p>
          
          {/* Milestone 7 Button - Correctly Placed */}
          <Button 
            onClick={startGuidedTour} 
            className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all animate-bounce flex items-center gap-2"
          >
            🚀 Start Milestone 7 Tour
          </Button>
        </div>
        <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 min-w-[240px]">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Available Liquidity</p>
          <h2 className="text-4xl font-black text-blue-600 tracking-tighter">${balance.toLocaleString(undefined, {minimumFractionDigits: 2})}</h2>
        </div>
      </div>

      {/* ACTION CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div onClick={() => openModal('Deposit')} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-50/20 hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
            <ArrowDownLeft size={28} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Deposit</h3>
          <p className="text-slate-500 text-sm mt-1">Inject capital into wallet</p>
          <Zap size={80} className="absolute -right-4 -bottom-4 text-slate-50/50 group-hover:text-blue-50 transition-colors" />
        </div>

        <div onClick={() => openModal('Withdraw')} className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-50/20 hover:border-slate-900 transition-all cursor-pointer relative overflow-hidden">
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
            <ArrowUpRight size={28} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Withdraw</h3>
          <p className="text-slate-500 text-sm mt-1">Transfer out to bank</p>
        </div>

        <div onClick={() => setIsDealModalOpen(true)} className="group bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-[2.5rem] shadow-xl shadow-blue-200 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer relative overflow-hidden">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 group-hover:rotate-12 transition-transform">
            <Send size={28} />
          </div>
          <h3 className="text-2xl font-black text-white">B2B Deal</h3>
          <p className="text-blue-100 text-sm mt-1 font-medium">Execute secure funding flow</p>
          <CircleDollarSign size={100} className="absolute -right-6 -bottom-6 text-white/10" />
        </div>
      </div>

      {/* AUDIT TRAIL */}
      <Card className="border-none shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] overflow-hidden rounded-[3rem] bg-white">
        <div className="p-10 border-b border-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <History size={24} />
            </div>
            <h3 className="font-black text-2xl text-slate-900 tracking-tight">Audit Trail</h3>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 bg-emerald-50 px-5 py-2.5 rounded-full uppercase tracking-widest border border-emerald-100">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> Live Log
          </div>
        </div>
        <div className="overflow-x-auto px-6 pb-8">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-8">Type</th>
                <th className="px-8 py-8">Entity</th>
                <th className="px-8 py-8">Volume</th>
                <th className="px-8 py-8">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-8">
                    <span className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">{tx.type}</span>
                  </td>
                  <td className="px-8 py-8 text-slate-500 font-bold">{tx.person}</td>
                  <td className={`px-8 py-8 font-black text-xl ${tx.amount > 0 ? 'text-emerald-500' : 'text-slate-900'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}
                  </td>
                  <td className="px-8 py-8">
                    <span className="inline-flex items-center gap-2 text-[10px] font-black text-emerald-700 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full uppercase tracking-widest">
                      <CheckCircle2 size={12} /> {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* MODAL SYSTEM (Deposit/Withdraw) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-md p-12 shadow-2xl border border-white animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">{modalType}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block ml-1">Capital Amount</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-slate-300">$</span>
                  <input 
                    type="number" 
                    value={inputAmount}
                    onChange={(e) => { setInputAmount(e.target.value); if(error) setError(null); }}
                    className={`w-full pl-14 pr-8 py-6 bg-slate-50 border-2 ${error ? 'border-red-500 bg-red-50/30' : 'border-slate-100'} rounded-3xl text-3xl font-black focus:bg-white focus:border-blue-500 outline-none transition-all`}
                    placeholder="0.00"
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-red-500 font-bold text-sm bg-red-50 p-4 rounded-2xl border border-red-100">
                    <AlertCircle size={18} /> {error}
                  </div>
                )}
              </div>
              <button onClick={handleTransaction} className={`w-full py-6 rounded-[1.8rem] text-lg font-black text-white shadow-xl transition-all active:scale-95 ${modalType === 'Deposit' ? 'bg-blue-600 shadow-blue-100 hover:bg-blue-700' : 'bg-slate-900 shadow-slate-100 hover:bg-black'}`}>
                Confirm {modalType}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DEAL AUTHORIZATION MODAL */}
      {isDealModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-md p-12 shadow-2xl border border-blue-50 animate-in zoom-in-95 duration-300 text-center">
            <div className="bg-blue-50 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-blue-600">
              <CircleDollarSign size={48} />
            </div>
            <h3 className="text-3xl font-black text-slate-900">Authorize Deal</h3>
            <p className="text-slate-500 font-medium mt-2 mb-10">Verification required for B2B funding flow from Nexus Capital Fund</p>
            
            <div className="space-y-6">
              <div className="bg-slate-50 p-8 rounded-[2rem] border-2 border-slate-100 focus-within:border-blue-500 transition-colors">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 text-left">Deal Volume</label>
                <input 
                  type="number" 
                  value={dealAmount} 
                  onChange={(e) => setDealAmount(e.target.value)} 
                  className="bg-transparent text-4xl font-black text-slate-900 w-full outline-none" 
                />
              </div>
              <div className="flex gap-4">
                <button className="flex-1 py-5 rounded-2xl font-black text-slate-400 bg-slate-50 hover:bg-slate-100 transition-all" onClick={() => setIsDealModalOpen(false)}>Abort</button>
                <button className="flex-1 py-5 rounded-[1.5rem] font-black bg-blue-600 text-white shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95" onClick={handleFundingDeal}>Release Funds</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};