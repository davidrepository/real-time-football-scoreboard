"use client";

import Counter from "@/components/Counter";
import { Box } from "@/components/elements/Box";
import "@/styles/global.css";

export default function Home() {
  return (
    <div>
      <main>
        <Counter />
        <Box>Box</Box>
      </main>
    </div>
  );
}
