import React, { useState } from 'react';
import { 
  Video, VideoOff, Mic, MicOff, PhoneOff, 
  Monitor, Settings, MessageSquare, Users 
} from 'lucide-react';

export const VideoCallPage: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false); // Screen share state

  return (
    <div className="flex flex-col h-[85vh] bg-[#0f172a] text-white rounded-2xl overflow-hidden border border-gray-700">
      
      {/* VIDEO AREA */}
      <div className="flex-1 relative flex flex-row gap-4 p-6 bg-black">
        {/* Michael (Investor) */}
        <div className="relative flex-[2] bg-gray-800 rounded-3xl overflow-hidden border-2 border-gray-600">
          {isScreenSharing ? (
            <div className="flex flex-col items-center justify-center h-full bg-blue-900/20">
              <Monitor size={60} className="text-blue-500 mb-2 animate-pulse" />
              <p className="text-blue-400 font-bold">Screen Sharing is Active</p>
            </div>
          ) : (
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800" className="w-full h-full object-cover" alt="Investor" />
          )}
          <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded text-sm">Michael Rodriguez (Investor)</div>
        </div>

        {/* Sarah (You) */}
        <div className="relative flex-1 bg-gray-800 rounded-3xl overflow-hidden border-2 border-gray-600">
          {isVideoOff ? (
            <div className="flex items-center justify-center h-full text-gray-500">Camera Off</div>
          ) : (
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" className="w-full h-full object-cover" alt="Sarah" />
          )}
          <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded text-xs">Sarah Johnson (You)</div>
        </div>
      </div>

      {/* CONTROL BAR */}
      <div className="bg-[#1e293b] p-6 flex items-center justify-between border-t border-gray-700">
        <div className="flex space-x-4 text-gray-400">
          <Settings size={22} />
          <Users size={22} />
        </div>

        <div className="flex items-center space-x-6">
          {/* Mute Toggle */}
          <button onClick={() => setIsMuted(!isMuted)} className={`p-4 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-700'}`}>
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          {/* End Call */}
          <button className="p-4 bg-red-600 rounded-full hover:bg-red-700">
            <PhoneOff size={28} />
          </button>

          {/* Video Toggle */}
          <button onClick={() => setIsVideoOff(!isVideoOff)} className={`p-4 rounded-full ${isVideoOff ? 'bg-red-500' : 'bg-gray-700'}`}>
            {isVideoOff ? <VideoOff size={24} /> : <Video size={24} />}
          </button>

          {/* SCREEN SHARE BUTTON (Added this for you) */}
          <button 
            onClick={() => setIsScreenSharing(!isScreenSharing)} 
            className={`p-4 rounded-full transition-all ${isScreenSharing ? 'bg-blue-600 shadow-lg shadow-blue-500/50' : 'bg-gray-700 hover:bg-gray-600'}`}
          >
            <Monitor size={24} className={isScreenSharing ? "text-white" : "text-blue-400"} />
          </button>
        </div>

        <div className="text-gray-400">
          <MessageSquare size={22} />
        </div>
      </div>
    </div>
  );
};