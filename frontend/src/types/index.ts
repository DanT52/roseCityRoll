export interface Announcement {
  id: string;
  title: string;
  subtext: string;
  published_at: string;
  link?: string;
  linktext?: string;
}

export interface DaySchedule {
  id: string;
  day: string;
  date: string;
  meetingPoint: string;
  endPoint?: string;
  startTime: string;
  endTime: string;
  routeDescription: string;
  difficulty: '🐰 Bunny' | '🟢 Green' | '🔵 Blue' | '⚫ Black';
  distance: string;
  leader: string;
  routeMapEmbed?: string;
  startPointEmbed?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  link?: string;
  linktext?: string;
}

export interface Thanks {
  id: number;
  content: string;
}