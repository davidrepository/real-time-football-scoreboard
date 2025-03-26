"use client";

import { useMatches } from "@/hooks/useMatches";
import { MatchItem } from "../MatchItem";

import { Match } from "@/types/match";

export const MatchList: React.FC = () => {
  const { matches } = useMatches();

  const ongoingMatches: Match[] = matches.filter(
    (match) => match.status === "ongoing"
  );
  const finishedMatches: Match[] = matches
    .filter((match: Match) => match.status === "finished")
    .sort((a: Match, b: Match) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;
      return totalScoreB - totalScoreA;
    });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div>
        <h2>Ongoing Matches</h2>
        {ongoingMatches.map((match: Match) => (
          <MatchItem key={match.id} match={match} />
        ))}
      </div>
      <div>
        <h2>Finished Matches</h2>
        {finishedMatches.map((match: Match) => (
          <MatchItem key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};
