import React, { createContext, useContext, useState } from 'react';

const MeetingContext = createContext<any>(null);

export const MeetingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meetings, setMeetings] = useState([
    { id: '1', title: 'Investor Meetup', start: '2026-03-20T10:00:00', status: 'confirmed' },
    { id: '2', title: 'Sample Request', start: '2026-03-22T14:00:00', status: 'pending' }
  ]);

  return (
    <MeetingContext.Provider value={{ meetings, setMeetings }}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeetings = () => useContext(MeetingContext);