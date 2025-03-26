export type Match = {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  duration: number;
  startTime: number;
  endTime: number;
  status: "ongoing" | "finished";
  remainingSecondsLeft: number;
};
