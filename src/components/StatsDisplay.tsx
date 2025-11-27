import React from 'react';
import { TypingStats } from '../types';
import { getWPMColor, getAccuracyColor, formatTime } from '../utils/typingCalculations';

interface StatsDisplayProps {
  stats: TypingStats;
  elapsedTime: number;
  compact?: boolean;
}

/**
 * StatsDisplay Component
 * Shows real-time typing statistics
 */
export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  stats,
  elapsedTime,
  compact = false,
}) => {
  if (compact) {
    return (
      <div className="flex gap-6 justify-center items-center text-sm">
        <StatItem
          label="WPM"
          value={stats.wpm}
          color={getWPMColor(stats.wpm)}
        />
        <StatItem
          label="ACC"
          value={`${stats.accuracy}%`}
          color={getAccuracyColor(stats.accuracy)}
        />
        <StatItem
          label="TIJD"
          value={formatTime(elapsedTime)}
          color="text-gray-400"
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="WPM"
          value={stats.wpm}
          subtitle="Woorden per minuut"
          color={getWPMColor(stats.wpm)}
          icon="⚡"
        />
        <StatCard
          label="Accuracy"
          value={`${stats.accuracy}%`}
          subtitle="Nauwkeurigheid"
          color={getAccuracyColor(stats.accuracy)}
          icon="🎯"
        />
        <StatCard
          label="Fouten"
          value={stats.errors}
          subtitle="Incorrecte tekens"
          color={stats.errors > 10 ? 'text-red-400' : 'text-gray-400'}
          icon="❌"
        />
        <StatCard
          label="Tijd"
          value={formatTime(elapsedTime)}
          subtitle="Verstreken"
          color="text-primary-400"
          icon="⏱️"
        />
      </div>

      {/* Progress bar */}
      {stats.totalChars > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Voortgang</span>
            <span>{stats.correctChars} / {stats.totalChars} tekens</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(stats.correctChars / stats.totalChars) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle: string;
  color: string;
  icon?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  color,
  icon,
}) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
      <div className="flex items-start justify-between mb-2">
        <div className="text-xs text-gray-400 uppercase tracking-wide">
          {label}
        </div>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <div className={`text-3xl font-bold mb-1 ${color}`}>
        {value}
      </div>
      <div className="text-xs text-gray-500">
        {subtitle}
      </div>
    </div>
  );
};

interface StatItemProps {
  label: string;
  value: string | number;
  color: string;
}

const StatItem: React.FC<StatItemProps> = ({ label, value, color }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className={`text-2xl font-bold ${color}`}>
        {value}
      </div>
    </div>
  );
};
