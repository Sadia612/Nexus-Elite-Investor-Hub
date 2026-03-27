import React, { useState } from 'react';
import { FileText, Upload, PenTool } from 'lucide-react'; // Sirf wahi icons jo use ho rahe hain

interface Document {
  id: string;
  name: string;
  status: 'Draft' | 'In Review' | 'Signed';
  date: string;
}

export const DocumentsPage: React.FC = () => {
  // Agar aap documents add/remove nahi kar rahe, to sirf 'documents' kaafi hai
  const [documents] = useState<Document[]>([
    { id: '1', name: 'Investment_Term_Sheet.pdf', status: 'In Review', date: '2024-03-18' },
    { id: '2', name: 'Partnership_Agreement.docx', status: 'Signed', date: '2024-03-15' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Signed': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Review': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Document Processing Chamber</h1>
          <p className="text-gray-500">Manage your deals and contracts</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Upload size={20} /> Upload New Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{doc.name}</h3>
                  <p className="text-sm text-gray-500">{doc.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(doc.status)}`}>
                  {doc.status}
                </span>
                <PenTool size={18} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Signature Pad Section */}
        <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center">
          <PenTool size={32} className="text-gray-400 mb-2" />
          <h3 className="font-bold text-gray-800">E-Signature Pad</h3>
          <div className="w-full h-32 bg-gray-100 rounded border border-gray-200 my-4 flex items-center justify-center italic text-gray-400">
            Sign here...
          </div>
          <button className="w-full bg-gray-900 text-white py-2 rounded-lg font-medium">
            Apply Signature
          </button>
        </div>
      </div>
    </div>
  );
};