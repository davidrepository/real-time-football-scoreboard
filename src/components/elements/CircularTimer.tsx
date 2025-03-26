import React, { useEffect, useState } from "react";

interface CircularTimerProps {
  remainingTime: number;
  duration: number;
  formattedTime: string;
}

export const CircularTimer: React.FC<CircularTimerProps> = ({
  duration,
  remainingTime,
  formattedTime,
}) => {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (-remainingTime / duration);

  return (
    <div>
      <svg width="60" height="60" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="lightgray"
          strokeWidth="24"
          fill="transparent"
        />
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="blue"
          strokeWidth="24"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - strokeDashoffset}
          style={{
            transition: "stroke-dashoffset 1s linear",
            transform: "rotate(-90deg)",
            transformOrigin: "center",
          }}
        />
        <text
          x="100"
          y="110"
          textAnchor="middle"
          fontSize="4.5rem"
          fill="white"
        >
          {formattedTime}
        </text>
      </svg>
    </div>
  );
};
