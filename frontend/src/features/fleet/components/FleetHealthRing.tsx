import * as React from "react"
import { motion } from "framer-motion"

interface FleetHealthRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function FleetHealthRing({ score, size = 160, strokeWidth = 12 }: FleetHealthRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (val: number) => {
    if (val >= 80) return "var(--color-secondary-500)";
    if (val >= 50) return "var(--color-warning-500)";
    return "var(--color-danger-500)";
  };

  const color = getColor(score);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-100 dark:text-gray-800"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <motion.span 
          className="text-4xl font-bold font-mono text-text-primary"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider mt-1">Health</span>
      </div>
    </div>
  )
}
