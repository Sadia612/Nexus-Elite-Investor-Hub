import React, { useState } from 'react';
import { 
  Video, VideoOff, Mic, MicOff, PhoneOff, 
  Monitor, Settings, MessageSquare, Users 
} from 'lucide-react';

export const VideoCallPage: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isInCall, setIsInCall] = useState(false);

  return (
    <div className="flex flex-col h-[calc(100-64px)] bg-gray-900 text-white rounded-xl overflow-hidden shadow-2xl">
      {/* --- VIDEO AREA --- */}
      <div className="flex-1 relative bg-black flex items-center justify-center">
        {!isInCall ? (
          <div className="text-center">
            <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Video size={40} />
            </div>
            <h2 className="text-2xl font-bold">Ready to join?</h2>
            <p className="text-gray-400 mt-2">Investor: Michael Rodriguez is waiting</p>
          </div>
        ) : (
          <div className="w-full h-full grid grid-cols-2 gap-2 p-4">
            {/* Main Participant (Investor) */}
            <div className="relative bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-gray-700">
               <img 
                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" 
                 alt="Investor" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded text-sm">
                 Michael Rodriguez (Investor)
               </div>
            </div>

            {/* User Self View */}
            <div className="relative bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden border border-gray-700">
               {isVideoOff ? (
                 <div className="text-gray-500 flex flex-col items-center">
                   <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-2">SJ</div>
                   <span>Camera is Off</span>
                 </div>
               ) : (
                 <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center italic text-gray-400">
                   Your Video Feed (Mock)
                 </div>
               )}
               <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded text-sm">
                 Sarah Johnson (You)
               </div>
            </div>
          </div>
        )}
      </div>

      {/* --- CONTROL BAR --- */}
      <div className="bg-gray-800 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
           <button className="p-3 hover:bg-gray-700 rounded-full transition"><Settings size={20} /></button>
           <button className="p-3 hover:bg-gray-700 rounded-full transition"><Users size={20} /></button>
        </div>

        <div className="flex items-center space-x-6">
          {/* Mic Toggle */}
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full transition-all ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          {/* Join/End Call Button */}
          {!isInCall ? (
            <button 
              onClick={() => setIsInCall(true)}
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-full font-bold transition-all shadow-lg"
            >
              Start Call
            </button>
          ) : (
            <button 
              onClick={() => setIsInCall(false)}
              className="bg-red-600 hover:bg-red-700 p-4 rounded-full transition-all shadow-lg"
            >
              <PhoneOff size={24} />
            </button>
          )}

          {/* Video Toggle */}
          <button 
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-4 rounded-full transition-all ${isVideoOff ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
          </button>
        </div>

        <div className="flex items-center space-x-4">
           <button className="p-3 hover:bg-gray-700 rounded-full transition text-blue-400"><Monitor size={20} /></button>
           <button className="p-3 hover:bg-gray-700 rounded-full transition"><MessageSquare size={20} /></button>
        </div>
      </div>
    </div>
  );
};