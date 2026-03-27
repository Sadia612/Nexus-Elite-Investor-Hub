import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Calendar as CalendarIcon, X, Trash2, CheckCircle, Clock } from 'lucide-react';


export const MeetingsPage: React.FC = () => {
  // Initial state with some dummy data for Point 2 & 3
  const [events, setEvents] = useState([
    { 
      id: '1', 
      title: 'Evening Slot', 
      start: '2026-03-20T10:00:00', 
      end: '2026-03-20T11:00:00', 
      status: 'confirmed' 
    },
    { 
      id: '2', 
      title: 'Investor Meeting Request', 
      start: '2026-03-22T14:00:00', 
      end: '2026-03-22T15:00:00', 
      status: 'pending' 
    }
  ]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedDateInfo, setSelectedDateInfo] = useState<any>(null);
  const [title, setTitle] = useState('');

  // 1. Naya Slot select karne ke liye
  const handleDateSelect = (selectInfo: any) => {
    setSelectedEvent(null);
    setSelectedDateInfo(selectInfo);
    setTitle('');
    setIsModalOpen(true);
  };

  // 2. Existing Slot ko Modify karne ke liye
  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event);
    setTitle(clickInfo.event.title);
    setIsModalOpen(true);
  };

  // Logic: Purane ko remove karke naya add karna (Modify)
  const handleSave = () => {
    if (selectedEvent) {
      // Modify Logic: Purana remove, naya add
      const filteredEvents = events.filter(ev => ev.id !== selectedEvent.id);
      const modifiedSlot = {
        id: String(Date.now()),
        title: title,
        start: selectedEvent.startStr,
        end: selectedEvent.endStr,
        status: 'confirmed' // Modify karne par confirmed ho jaye
      };
      setEvents([...filteredEvents, modifiedSlot]);
    } else {
      // New Slot Logic
      if (title.trim() === '') return;
      const newSlot = {
        id: String(Date.now()),
        title: title,
        start: selectedDateInfo.startStr,
        end: selectedDateInfo.endStr,
        status: 'pending'
      };
      setEvents([...events, newSlot]);
    }
    setIsModalOpen(false);
  };

  // Delete Function
  const handleDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter(ev => ev.id !== selectedEvent.id));
      setIsModalOpen(false);
    }
  };

  // Accept/Decline Logic (Point 2)
  const handleStatusUpdate = (status: 'confirmed' | 'declined') => {
    if (selectedEvent) {
      const filteredEvents = events.filter(ev => ev.id !== selectedEvent.id);
      if (status === 'confirmed') {
        setEvents([...filteredEvents, {
          id: selectedEvent.id,
          title: selectedEvent.title,
          start: selectedEvent.startStr,
          end: selectedEvent.endStr,
          status: 'confirmed'
        }]);
      } else {
        setEvents(filteredEvents); // Decline matlab remove
      }
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <CalendarIcon className="text-primary-600 mr-3" size={28} />
            <h1 className="text-2xl font-bold text-gray-800">Meeting Schedule</h1>
          </div>
          <div className="flex gap-4">
             <span className="flex items-center text-sm text-green-600 font-medium">
               <CheckCircle size={16} className="mr-1"/> Confirmed
             </span>
             <span className="flex items-center text-sm text-orange-500 font-medium">
               <Clock size={16} className="mr-1"/> Pending
             </span>
          </div>
        </div>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          // Point 1: Professional Time Format
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
          }}
          events={events}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          height="70vh"
          // Colors based on status
          eventContent={(eventInfo) => {
            const status = eventInfo.event.extendedProps.status;
            return (
              <div className={`p-1 rounded-sm text-xs overflow-hidden ${
                status === 'confirmed' ? 'bg-green-100 text-green-800 border-l-4 border-green-500' : 'bg-orange-100 text-orange-800 border-l-4 border-orange-500'
              }`}>
                <b>{eventInfo.timeText}</b> <i>{eventInfo.event.title}</i>
              </div>
            );
          }}
        />
      </div>

      {/* MODAL WINDOW */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-96 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                {selectedEvent ? 'Modify Slot' : 'Create Slot'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
            <input 
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Morning Slot"
            />

            <div className="space-y-3">
              <div className="flex space-x-2">
                <button 
                  onClick={handleSave} 
                  className="flex-1 bg-primary-600 text-white py-2 rounded-md font-semibold hover:bg-primary-700 transition"
                >
                  {selectedEvent ? 'Modify' : 'Save Slot'}
                </button>
                
                {selectedEvent && (
                  <button 
                    onClick={handleDelete} 
                    className="bg-red-50 text-red-600 p-2 rounded-md hover:bg-red-100 border border-red-200 transition"
                  >
                    <Trash2 size={22} />
                  </button>
                )}
              </div>

              {/* Point 2: Accept/Decline Options for Pending Requests */}
              {selectedEvent && selectedEvent.extendedProps.status === 'pending' && (
                <div className="pt-4 border-t border-gray-100 flex gap-2">
                  <button 
                    onClick={() => handleStatusUpdate('confirmed')}
                    className="flex-1 bg-green-500 text-white py-2 rounded-md text-sm font-bold hover:bg-green-600"
                  >
                    Accept Request
                  </button>
                  <button 
                    onClick={() => handleStatusUpdate('declined')}
                    className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-md text-sm font-bold hover:bg-gray-200"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};