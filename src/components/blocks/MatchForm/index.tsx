"use client";

import { Box } from "@/components/elements";
import { useMatches } from "@/hooks";
import { useState } from "react";

export const MatchForm: React.FC = () => {
  const { startMatch } = useMatches();
  const [homeTeam, setHomeTeam] = useState<string>("");
  const [awayTeam, setAwayTeam] = useState<string>("");
  const [duration, setDuration] = useState<number>(10);

  const handleSubmit = () => {
    if (!homeTeam.trim() || !awayTeam.trim()) {
      alert("Enter both team names");
      return;
    }

    startMatch(homeTeam, awayTeam, duration);
    setHomeTeam("");
    setAwayTeam("");
  };

  return (
    <Box>
      <h1>Start a New Match</h1>
      <input
        type="text"
        placeholder="Home Team"
        value={homeTeam}
        onChange={(e) => setHomeTeam(e.target.value)}
      />
      <input
        type="text"
        placeholder="Away Team"
        value={awayTeam}
        onChange={(e) => setAwayTeam(e.target.value)}
      />
      <div>
        <label>Duration (minutes):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(parseInt(e.target.value) || 10)}
        />
      </div>
      <button onClick={handleSubmit}>Start Match</button>
    </Box>
  );
};
