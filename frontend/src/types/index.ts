export interface Announcement {
  id: string;
  title: string;
  subtext: string;
  published_at: string;
}

export interface DaySchedule {
  id: string;
  day: string;
  date: string;
  meetingPoint: string;
  startTime: string;
  endTime: string;
  routeDescription: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  distance: string;
  leader: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}