// --- START OF FILE screens/AnalysisScreen.tsx ---

import React from 'react';
import { ProgressCircle } from '../components/ProgressCircle';
import { Button } from '../components/Button';
import { TodayProgressData, WeeklyProgressData, DailyCalorieLog, WeightPoint, AppRoute } from '../types';
import { PRIMARY_COLOR_CLASS, ACCENT_COLOR_CLASS } from '../constants';
import { useTheme } from '../contexts/ThemeContext';
import { Activity } from 'lucide-react'; // UPDATED: Import new icon

// DELETED: The old ChartLineIcon component is removed.

// --- Mock Data ---
const mockTodayProgress: TodayProgressData = {
  totalCalories: 1850,
  calorieGoal: 2200,
  protein: { grams: 120, percentage: 80, goalGrams: 150 },
  carbs: { grams: 200, percentage: 73, goalGrams: 275 },
  fat: { grams: 60, percentage: 86, goalGrams: 70 },
};

const mockWeeklyProgress: WeeklyProgressData = {
  averageDailyCalories: 2100,
  averageProtein: { grams: 135, percentage: 90 },
  averageCarbs: { grams: 250, percentage: 91 },
  averageFat: { grams: 65, percentage: 93 },
};

const mockWeightLog: WeightPoint[] = [
  { date: 'Jul 1', weight: 70.5 },
  { date: 'Jul 8', weight: 70.1 },
  { date: 'Jul 15', weight: 69.8 },
  { date: 'Jul 22', weight: 69.5 },
  { date: 'Jul 29', weight: 69.2 },
];
const currentWeight = mockWeightLog.length > 0 ? mockWeightLog[mockWeightLog.length - 1].weight : 0;
const weightGoal = 65;

const mockDailyCalories: DailyCalorieLog[] = [
  { day: 'Mon', calories: 2300 },
  { day: 'Tue', calories: 2150 },
  { day: 'Wed', calories: 2200 },
  { day: 'Thu', calories: 1900 },
  { day: 'Fri', calories: 2400 },
  { day: 'Sat', calories: 2500 },
  { day: 'Sun', calories: 1850 }, 
];

interface AnalysisScreenProps {
    navigateTo: (route: AppRoute) => void;
}

export const AnalysisScreen: React.FC<AnalysisScreenProps> = ({ navigateTo }) => {
  const { theme } = useTheme();

  const chartTextColor = theme === 'dark' ? '#CBD5E1' : '#4A5568'; 
  const chartLineColor = theme === 'dark' ? '#6B8E23' : '#6B8E23'; 
  const chartBarColor = chartLineColor;

  const WeightChart: React.FC<{ data: WeightPoint[] }> = ({ data }) => {
    if (!data || data.length < 2) return <p className="text-center text-gray-500 dark:text-gray-400">Not enough data for chart.</p>;

    const width = 300; const height = 150; const padding = 30;
    const minWeight = Math.min(...data.map(p => p.weight)) - 1;
    const maxWeight = Math.max(...data.map(p => p.weight)) + 1;
    const weightRange = maxWeight - minWeight || 1;

    const points = data.map((point, i) => {
      const x = (data.length > 1 ? (width - 2 * padding) / (data.length - 1) * i : (width - 2 * padding) / 2) + padding;
      const y = height - padding - ((point.weight - minWeight) / weightRange * (height - 2 * padding));
      return `${x},${y}`;
    }).join(' ');

    const XAxisLabels = () => (
      <>
        {data.map((point, i) => {
          const x = (data.length > 1 ? (width - 2 * padding) / (data.length - 1) * i : (width - 2 * padding) / 2) + padding;
          return <text key={`x-label-${i}`} x={x} y={height - padding + 15} fontSize="10" fill={chartTextColor} textAnchor="middle">{point.date.substring(0,3)}</text>
        })}
      </>
    );

    const YAxisLabels = () => {
      const labels = [minWeight, minWeight + weightRange/2, maxWeight].map(w => Math.round(w*10)/10);
      return (
        <>
        {labels.map((label, i) => {
             const y = height - padding - ((label - minWeight) / weightRange * (height - 2 * padding));
             return <text key={`y-label-${i}`} x={padding - 5} y={y} fontSize="10" fill={chartTextColor} textAnchor="end" dominantBaseline="middle">{label}kg</text>
        })}
        </>
      );
    };

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke={chartTextColor} strokeWidth="0.5" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke={chartTextColor} strokeWidth="0.5" />
        
        <YAxisLabels />
        <XAxisLabels />

        <polyline points={points} fill="none" stroke={chartLineColor} strokeWidth="2" />
        {data.map((point, i) => {
          const x = (data.length > 1 ? (width - 2 * padding) / (data.length - 1) * i : (width - 2 * padding) / 2) + padding;
          const y = height - padding - ((point.weight - minWeight) / weightRange * (height - 2 * padding));
          return <circle key={`point-${i}`} cx={x} cy={y} r="3" fill={chartLineColor} />;
        })}
      </svg>
    );
  };

  const CalorieBarChart: React.FC<{ data: DailyCalorieLog[] }> = ({ data }) => {
    if (!data || data.length === 0) return <p className="text-center text-gray-500 dark:text-gray-400">No calorie data available.</p>;
    
    const width = 300; const height = 150; const padding = 30; const barPadding = 5;
    const maxCal = Math.max(...data.map(d => d.calories), 1000); 
    const barWidth = (width - 2 * padding - (data.length -1) * barPadding) / data.length;

    const XAxisLabels = () => (
        <>
          {data.map((day, i) => {
            const x = padding + i * (barWidth + barPadding) + barWidth / 2;
            return <text key={`x-label-bar-${i}`} x={x} y={height - padding + 15} fontSize="10" fill={chartTextColor} textAnchor="middle">{day.day}</text>;
          })}
        </>
    );

    const YAxisLabels = () => {
        const labels = [0, Math.round(maxCal/2), Math.round(maxCal)];
        return (
            <>
            {labels.map((label,i) => {
                const y = height - padding - (label / maxCal * (height - 2 * padding));
                return <text key={`y-label-bar-${i}`} x={padding -5} y={y} fontSize="10" fill={chartTextColor} textAnchor="end" dominantBaseline="middle">{label}</text>
            })}
            </>
        );
    };

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke={chartTextColor} strokeWidth="0.5" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke={chartTextColor} strokeWidth="0.5" />
        
        <YAxisLabels />
        <XAxisLabels />
        
        {data.map((day, i) => {
          const barHeight = (day.calories / maxCal) * (height - 2 * padding);
          const x = padding + i * (barWidth + barPadding);
          const y = height - padding - barHeight;
          return (
            <rect 
              key={day.day} 
              x={x} 
              y={y} 
              width={barWidth} 
              height={barHeight > 0 ? barHeight : 0} 
              fill={chartBarColor} 
              rx="2"
            />
          );
        })}
      </svg>
    );
  };


  return (
    <div className="p-4 sm:p-6 max-w-screen-lg mx-auto pb-20 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center flex items-center justify-center">
        <Activity className="w-8 h-8 mr-3 text-melon-500"/>
        Nutritional Analysis
      </h1>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <h2 className={`text-xl font-semibold text-${PRIMARY_COLOR_CLASS}-700 dark:text-${PRIMARY_COLOR_CLASS}-400 mb-4`}>Today's Progress</h2>
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Calories</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{mockTodayProgress.totalCalories}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Goal: {mockTodayProgress.calorieGoal} kcal</p>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <ProgressCircle percentage={mockTodayProgress.protein.percentage} color="text-blue-500" label={`${mockTodayProgress.protein.percentage}% P`} />
            <ProgressCircle percentage={mockTodayProgress.carbs.percentage} color="text-orange-500" label={`${mockTodayProgress.carbs.percentage}% C`} />
            <ProgressCircle percentage={mockTodayProgress.fat.percentage} color="text-red-500" label={`${mockTodayProgress.fat.percentage}% F`} />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-gray-600 dark:text-gray-300">
            <div>Protein: {mockTodayProgress.protein.grams}g ({mockTodayProgress.protein.percentage}%)</div>
            <div>Carbs: {mockTodayProgress.carbs.grams}g ({mockTodayProgress.carbs.percentage}%)</div>
            <div>Fat: {mockTodayProgress.fat.grams}g ({mockTodayProgress.fat.percentage}%)</div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <h2 className={`text-xl font-semibold text-${ACCENT_COLOR_CLASS}-700 dark:text-${ACCENT_COLOR_CLASS}-400 mb-4`}>Weekly Average</h2>
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Calories / Day</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{mockWeeklyProgress.averageDailyCalories}</p>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <ProgressCircle percentage={mockWeeklyProgress.averageProtein.percentage} color="text-blue-500" label={`${mockWeeklyProgress.averageProtein.percentage}% P`} />
            <ProgressCircle percentage={mockWeeklyProgress.averageCarbs.percentage} color="text-orange-500" label={`${mockWeeklyProgress.averageCarbs.percentage}% C`} />
            <ProgressCircle percentage={mockWeeklyProgress.averageFat.percentage} color="text-red-500" label={`${mockWeeklyProgress.averageFat.percentage}% F`} />
          </div>
        </div>
         <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-gray-600 dark:text-gray-300">
            <div>Avg Protein: {mockWeeklyProgress.averageProtein.grams}g</div>
            <div>Avg Carbs: {mockWeeklyProgress.averageCarbs.grams}g</div>
            <div>Avg Fat: {mockWeeklyProgress.averageFat.grams}g</div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-3">Weight Progress</h2>
        <div className="flex items-baseline justify-between mb-4">
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Weight</p>
                <p className="text-3xl font-bold text-gray-800 dark:text-white">{currentWeight} kg</p>
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-right">Goal</p>
                <p className="text-xl font-semibold text-gray-600 dark:text-gray-300">{weightGoal} kg</p>
            </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 rounded p-2 mb-4 min-h-[160px] flex items-center justify-center">
          <WeightChart data={mockWeightLog} />
        </div>
        <Button onClick={() => navigateTo('#/app/progress')} variant="outline" fullWidth>
          View Full History & Log
        </Button>
      </section>

      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-1">Daily Calorie Intake (This Week)</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Today: {mockDailyCalories.find(d => d.day === 'Sun')?.calories || 0} kcal | Avg: {Math.round(mockDailyCalories.reduce((sum, day) => sum + day.calories, 0) / mockDailyCalories.length)} kcal</p>
        <div className="bg-gray-50 dark:bg-gray-700 rounded p-2 min-h-[160px] flex items-center justify-center">
          <CalorieBarChart data={mockDailyCalories} />
        </div>
      </section>
    </div>
  );
};


// --- END OF FILE screens/AnalysisScreen.tsx ---