import React from 'react';

interface ProgressCircleProps {
  percentage: number;
  color: string; // Tailwind color class e.g., 'text-blue-500'
  size?: number; // Diameter of the circle
  strokeWidth?: number;
  label?: string | number; // Optional label in the center
  className?: string;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percentage,
  color,
  size = 80,
  strokeWidth = 8,
  label,
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        {/* Background Circle */}
        <circle
          className="text-gray-200 dark:text-gray-700"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Circle */}
        <circle
          className={color}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      {label !== undefined && (
        <div className="absolute text-center">
          <span className={`text-sm font-semibold text-gray-700 dark:text-gray-200`}>
            {label}
          </span>
        </div>
      )}
    </div>
  );
};
