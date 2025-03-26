"use client";

import { MatchForm, MatchList } from "@/components/blocks";
import { Box } from "@/components/elements";

import "@/styles/global.css";

export default function Home() {
  return (
    <div>
      <main>
        <MatchForm />
        <MatchList />
        <Box>Box</Box>
      </main>
    </div>
  );
}
