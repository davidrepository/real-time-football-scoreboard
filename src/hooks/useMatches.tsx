"use client";

import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";
const socket = io(socketUrl);

import { Match } from "@/types/match";
import { SOCKET_EVENTS } from "@/constants/socketEvents";

export const useMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const handleUpdateMatches = (newMatches: Match[]) => {
      setMatches(newMatches);
    };

    socket.on(SOCKET_EVENTS.MATCHES.UPDATE, handleUpdateMatches);

    return () => {
      socket.off(SOCKET_EVENTS.MATCHES.UPDATE, handleUpdateMatches);
    };
  }, []);

  const startMatch = useCallback(
    (homeTeam: string, awayTeam: string, duration: number) => {
      socket.emit(SOCKET_EVENTS.MATCH.START, { homeTeam, awayTeam, duration });
    },
    []
  );

  const updateMatchScore = useCallback(
    (matchId: string, homeScore: number, awayScore: number) => {
      socket.emit(SOCKET_EVENTS.MATCH.UPDATE_SCORE, {
        matchId,
        homeScore,
        awayScore,
      });
    },
    []
  );

  const finishMatch = useCallback((matchId: string) => {
    socket.emit(SOCKET_EVENTS.MATCH.FINISH, matchId);
  }, []);

  return {
    matches,
    startMatch,
    updateMatchScore,
    finishMatch,
  };
};
