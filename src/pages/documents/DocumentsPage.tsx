import React, { useState, useRef } from 'react';
import { FileText, Upload, PenTool, Trash2, CheckCircle, X } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  status: 'Draft' | 'In Review' | 'Signed';
  date: string;
}

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Investment_Term_Sheet.pdf', status: 'In Review', date: '2024-03-18' },
  ]);
  
  const [showPopup, setShowPopup] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. DELETE LOGIC
  const deleteDocument = (id: string) => {
    const filteredDocs = documents.filter(doc => doc.id !== id);
    setDocuments(filteredDocs);
  };

  // 2. UPLOAD LOGIC
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDoc: Document = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        status: 'Draft',
        date: new Date().toISOString().split('T')[0],
      };
      setDocuments([newDoc, ...documents]);
    }
  };

  // 3. APPLY SIGNATURE LOGIC
  const handleApplySignature = () => {
    setShowPopup(true);
    const updatedDocs = documents.map(doc => ({ ...doc, status: 'Signed' as const }));
    setDocuments(updatedDocs);
    setTimeout(() => setShowPopup(false), 3000);
  };

  // Drawing Logic
  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.strokeStyle = '#000';
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (ctx) {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen relative">
      
      {showPopup && (
        <div className="fixed top-10 right-10 z-50 animate-bounce">
          <div className="bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-green-400">
            <CheckCircle size={24} />
            <div>
              <p className="font-bold">Signature Applied!</p>
              <p className="text-xs opacity-90">Document status updated to Signed.</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Chamber</h1>
          
        </div>

        <div>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx" />
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition shadow-md font-semibold">
            <Upload size={20} /> Upload Document
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-2">
            <FileText className="text-blue-600" size={20} /> Active Contracts
          </h2>
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  <FileText size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{doc.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">Uploaded on {doc.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${
                  doc.status === 'Signed' ? 'bg-green-100 text-green-700 border-green-200' : 
                  doc.status === 'In Review' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                  'bg-gray-100 text-gray-600 border-gray-200'
                }`}>
                  {doc.status}
                </span>
                
                {/* ACTIVE DELETE BUTTON */}
                <button 
                  onClick={() => deleteDocument(doc.id)}
                  className="text-gray-300 hover:text-red-500 transition p-1"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <PenTool size={18} className="text-blue-600" /> E-Signature Pad
            </h3>
            <button onClick={clearSignature} className="text-xs text-blue-600 hover:underline font-medium">Clear</button>
          </div>
          
          <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 mb-4 overflow-hidden">
            <canvas ref={canvasRef} width={300} height={150} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={() => setIsDrawing(false)} className="cursor-crosshair w-full bg-white" />
          </div>
          
          <button onClick={handleApplySignature} className="w-full bg-[#111827] text-white py-4 rounded-xl font-bold hover:bg-black transition flex items-center justify-center gap-2 shadow-lg">
            <CheckCircle size={20} /> Apply to Selected Doc
          </button>
        </div>
      </div>
    </div>
  );
};