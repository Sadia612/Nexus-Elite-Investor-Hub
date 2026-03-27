export interface Meeting {
  id: string;
  title: string;
  start: string;
  end: string;
  status: 'pending' | 'confirmed' | 'declined';
  participants: string[]; // User IDs
}

export const meetings: Meeting[] = [
  {
    id: '1',
    title: 'Investment Discussion',
    start: '2026-03-18T10:00:00',
    end: '2026-03-18T11:00:00',
    status: 'confirmed',
    participants: ['ent-1', 'inv-1']
  }
];

// src/data/meetings.ts
export const initialMeetings = [
  { id: '1', title: 'Investor Meetup', start: '2026-03-20T10:00:00', status: 'confirmed' },
  { id: '2', title: 'Pitch Deck Review', start: '2026-03-22T14:00:00', status: 'pending' },
];