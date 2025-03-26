"use client";

import { MatchForm, MatchList } from "@/components/blocks";

import "@/styles/global.css";

export default function Home() {
  return (
    <div>
      <main>
        <MatchForm />
        <MatchList />
      </main>
    </div>
  );
}
