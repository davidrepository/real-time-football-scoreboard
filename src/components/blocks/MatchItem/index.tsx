import { useState } from "react";
import { useMatches } from "@/hooks";
import { Match } from "@/types/match";
import { useRemainingTime } from "@/hooks/useRemainingTime";
import { CircularTimer } from "@/components/elements/CircularTimer";

export const MatchItem: React.FC<{
  match: Match;
}> = ({ match }) => {
  const { updateMatchScore, finishMatch } = useMatches();
  const [homeScore, setHomeScore] = useState(match.homeScore);
  const [awayScore, setAwayScore] = useState(match.awayScore);

  const { remainingTime, formattedTime } = useRemainingTime(match);

  const isMatchFinished = match.status === "finished";

  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <h3>
        {match.homeTeam} {match.homeScore} - {match.awayScore} {match.awayTeam}
      </h3>
      <CircularTimer
        duration={match.duration}
        remainingTime={remainingTime}
        formattedTime={formattedTime}
      />

      {!isMatchFinished && (
        <>
          <input
            type="number"
            value={homeScore}
            onChange={(e) => setHomeScore(Number(e.target.value) || 0)}
          />
          <input
            type="number"
            value={awayScore}
            onChange={(e) => setAwayScore(Number(e.target.value) || 0)}
          />
          <button
            onClick={() => updateMatchScore(match.id, homeScore, awayScore)}
          >
            Update Score
          </button>
          <button onClick={() => finishMatch(match.id, remainingTime)}>
            Finish
          </button>
        </>
      )}
    </div>
  );
};
