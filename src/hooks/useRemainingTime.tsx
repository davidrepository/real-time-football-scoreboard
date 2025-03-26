import { useEffect, useState } from "react";
import { useMatches } from "@/hooks";
import { Match } from "@/types/match";

export const useRemainingTime = (match: Match) => {
  const { finishMatch } = useMatches();

  const [remainingTime, setRemainingTime] = useState(
    match.remainingSecondsLeft ||
      Math.max(0, Math.floor((match.endTime - Date.now()) / 1000))
  );

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  useEffect(() => {
    if (match.status === "ongoing") {
      const timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = Math.max(
            0,
            Math.floor((match.endTime - Date.now()) / 1000)
          );
          return newTime;
        });
      }, 1000);

      if (remainingTime === 0) {
        finishMatch(match.id, remainingTime);
      }

      return () => {
        clearInterval(timerInterval);
      };
    }

    return () => {};
  }, [remainingTime, match.endTime, match.status, finishMatch, match.id]);

  return { remainingTime, formattedTime: formatTime(remainingTime) };
};
