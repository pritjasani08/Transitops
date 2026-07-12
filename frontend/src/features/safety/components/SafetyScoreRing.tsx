import * as React from "react"

interface SafetyScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function SafetyScoreRing({ score, size = 64, strokeWidth = 6 }: SafetyScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  let colorClass = "text-success-500";
  if (score < 70) colorClass = "text-danger-500";
  else if (score < 85) colorClass = "text-warning-500";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-gray-100 dark:text-gray-800"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={colorClass}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
        />
      </svg>
      <span className="absolute text-sm font-bold text-text-primary">
        {score}
      </span>
    </div>
  )
}
