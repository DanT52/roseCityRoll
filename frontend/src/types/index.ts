export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface DaySchedule {
  id: string;
  name: string;
  date?: string;
  difficulty?: 'Bunny' | 'Green' | 'Blue' | 'Black';
  startTime?: string;
  endTime?: string;
  distance?: number;
  end?: string;
  description?: string;
  embeddedRouteUrl?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}