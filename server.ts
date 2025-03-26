import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

import { SOCKET_EVENTS } from "./src/constants/socketEvents";

import { Match } from "@/types/match";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    let matches: Match[] = [];

    socket.emit(SOCKET_EVENTS.MATCHES.UPDATE, matches);

    socket.on(SOCKET_EVENTS.MATCH.START, ({ homeTeam, awayTeam, duration }) => {
      const startTime = Date.now();
      const endTime = startTime + duration * 60 * 1000;

      const newMatch: Match = {
        id: `${homeTeam.toLowerCase()}-${awayTeam.toLowerCase()}-${startTime}`,
        homeTeam,
        awayTeam,
        homeScore: 0,
        awayScore: 0,
        startTime: Date.now(),
        duration: duration * 60,
        endTime,
        status: "ongoing",
        remainingSecondsLeft: 0,
      };

      matches = [...matches, newMatch];
      io.emit(SOCKET_EVENTS.MATCHES.UPDATE, matches);
    });

    socket.on(
      SOCKET_EVENTS.MATCH.UPDATE_SCORE,
      ({ matchId, homeScore, awayScore }) => {
        const match = matches.find((match) => match.id === matchId);

        if (match) {
          match.homeScore = homeScore;
          match.awayScore = awayScore;
          io.emit(SOCKET_EVENTS.MATCHES.UPDATE, matches);
        }
      }
    );

    socket.on(SOCKET_EVENTS.MATCH.FINISH, ({ matchId, remainingTime }) => {
      const matchIndex = matches.findIndex((match) => match.id === matchId);

      if (matchIndex !== -1) {
        const updatedMatches = [...matches];
        updatedMatches[matchIndex].status = "finished";
        updatedMatches[matchIndex].remainingSecondsLeft = remainingTime;

        io.emit(SOCKET_EVENTS.MATCHES.UPDATE, updatedMatches);
      } else {
        console.log(`Match ${matchId} not found`);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`Ready on http://${hostname}:${port}`);
    });
});
