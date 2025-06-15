// --- START OF FILE screens/ProgressScreen.tsx ---

import React, { useState, useMemo, useRef } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { WeightEntry, ProgressPhoto, Achievement, MeasurementEntry } from '../types';
import { PRIMARY_COLOR_CLASS, ACCENT_COLOR_CLASS } from '../constants';

// UPDATED: Icons are now imported from lucide-react
import {
  LineChart,
  PlusCircle,
  CalendarDays,
  Camera,
  Trophy,
  Ruler,
  X,
} from 'lucide-react';

// DELETED: All manual SVG icon components and <use> references are no longer needed.

const initialWeightLog: WeightEntry[] = [
    { id: 'w1', date: '2024-07-01', value: 75, notes: 'Starting weight' },
    { id: 'w2', date: '2024-07-15', value: 74, notes: 'Felt good' },
    { id: 'w3', date: '2024-07-28', value: 73.5, notes: 'After consistent workouts' },
];

const initialPhotos: ProgressPhoto[] = [
    { id: 'p1', date: '2024-07-01', imageUrl: 'https://picsum.photos/seed/progress1/300/300', notes: 'Day 1' },
    { id: 'p2', date: '2024-07-20', imageUrl: 'https://picsum.photos/seed/progress2/300/300', notes: 'Mid-month check-in' },
];

const initialAchievements: Achievement[] = [
    { id: 'a1', title: '7-Day Tracking Streak', iconName: 'trophy', dateAchieved: '2024-07-08', description: 'Logged weight for 7 consecutive days!', color: ACCENT_COLOR_CLASS },
    { id: 'a2', title: 'First 2kg Lost!', iconName: 'trophy', dateAchieved: '2024-07-28', description: 'Congratulations on losing your first 2 kilograms.', color: PRIMARY_COLOR_CLASS },
];

const otherMetrics: { id: MeasurementEntry['metricName']; name: string; icon: React.FC<{className?: string}>; unit: string; latestValue?: number }[] = [
    // UPDATED: Using lucide-react components for icons
    { id: 'bodyFat', name: 'Body Fat %', icon: Ruler, unit: '%', latestValue: 22 },
    { id: 'waist', name: 'Waist', icon: Ruler, unit: 'cm', latestValue: 85 },
    { id: 'hips', name: 'Hips', icon: Ruler, unit: 'cm' },
];


export const ProgressScreen: React.FC = () => {
  const [weightLog, setWeightLog] = useState<WeightEntry[]>(initialWeightLog);
  const [photos, setPhotos] = useState<ProgressPhoto[]>(initialPhotos);
  const [achievements] = useState<Achievement[]>(initialAchievements); 

  const [showWeightModal, setShowWeightModal] = useState(false);
  const [newWeightEntry, setNewWeightEntry] = useState<{ value: string; date: string; notes: string }>({
    value: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [dateFilter, setDateFilter] = useState<'1M' | '3M' | '6M' | 'All'>('3M');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredWeightLog = useMemo(() => {
    const now = new Date();
    return weightLog.filter(entry => {
      const entryDate = new Date(entry.date);
      if (dateFilter === 'All') return true;
      let monthsToSubtract = 0;
      if (dateFilter === '1M') monthsToSubtract = 1;
      if (dateFilter === '3M') monthsToSubtract = 3;
      if (dateFilter === '6M') monthsToSubtract = 6;
      const filterStartDate = new Date(now.getFullYear(), now.getMonth() - monthsToSubtract, now.getDate());
      return entryDate >= filterStartDate;
    }).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [weightLog, dateFilter]);

  const handleSaveWeight = () => {
    if (!newWeightEntry.value || isNaN(parseFloat(newWeightEntry.value))) {
      alert('Please enter a valid weight value.');
      return;
    }
    const newEntry: WeightEntry = {
      id: `w${Date.now()}`,
      date: newWeightEntry.date,
      value: parseFloat(newWeightEntry.value),
      notes: newWeightEntry.notes,
    };
    setWeightLog(prevLog => [...prevLog, newEntry].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setShowWeightModal(false);
    setNewWeightEntry({ value: '', date: new Date().toISOString().split('T')[0], notes: '' });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto: ProgressPhoto = {
          id: `p${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          imageUrl: reader.result as string,
          notes: `Uploaded on ${new Date().toLocaleDateString()}`,
        };
        setPhotos(prevPhotos => [newPhoto, ...prevPhotos]); 
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerPhotoUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 sm:p-6 max-w-screen-lg mx-auto pb-20 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">Your Progress</h1>

      <section>
        <div className="flex justify-center space-x-2 mb-4">
          {(['1M', '3M', '6M', 'All'] as const).map(filter => (
            <Button
              key={filter}
              variant={dateFilter === filter ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setDateFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </section>

      <section className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg transform transition-shadow hover:shadow-xl">
        <h2 className="text-xl font-semibold text-nutria-green-700 dark:text-nutria-green-400 mb-3">Weight Journey</h2>
        {filteredWeightLog.length > 0 ? (
          <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="flex space-x-2 items-end h-full p-4 overflow-x-auto">
                {filteredWeightLog.map(entry => (
                    <div key={entry.id} className="flex flex-col items-center group" title={`${entry.date}: ${entry.value}kg`}>
                        <div className="w-2 bg-nutria-green-500 transition-all duration-200 group-hover:bg-nutria-green-400" style={{height: `${Math.max(10, (entry.value - Math.min(...filteredWeightLog.map(e => e.value)) + 1) * 5)}px` }}></div>
                        <span className="text-xs mt-1">{new Date(entry.date).toLocaleDateString('en-CA', {month:'short', day:'numeric'})}</span>
                    </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <LineChart className={`w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4`} />
            <p className="text-gray-600 dark:text-gray-300 mb-3">No weight data for this period.</p>
            <Button onClick={() => setShowWeightModal(true)}>Track First Weight</Button>
          </div>
        )}
      </section>

      <div className="text-center">
        <Button onClick={() => setShowWeightModal(true)} size="lg" className={`bg-${PRIMARY_COLOR_CLASS}-600 hover:bg-${PRIMARY_COLOR_CLASS}-700`}>
          <PlusCircle className="inline mr-2" /> Track New Weight
        </Button>
      </div>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Body Measurements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {otherMetrics.map(metric => {
            const MetricIcon = metric.icon;
            return (
            <div key={metric.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between transform transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.03]">
              <div className="flex items-center mb-2">
                <MetricIcon className={`w-6 h-6 text-${ACCENT_COLOR_CLASS}-500 mr-2`} />
                <h3 className="font-medium text-gray-700 dark:text-gray-300">{metric.name}</h3>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {metric.latestValue !== undefined ? `${metric.latestValue} ${metric.unit}` : 'N/A'}
              </p>
              <Button variant="outline" size="sm" onClick={() => alert(`Track ${metric.name} - Coming soon!`)}>
                Track / View History
              </Button>
            </div>
          )})}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Your Transformation</h2>
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {photos.map(photo => (
              <div key={photo.id} className="relative group aspect-square transform transition-all duration-200 ease-in-out hover:scale-[1.03]">
                <img src={photo.imageUrl} alt={`Progress on ${photo.date}`} className="w-full h-full object-cover rounded-lg shadow-md" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1.5 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {new Date(photo.date).toLocaleDateString()} <br/> {photo.notes}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 text-center py-4">No photos added yet.</p>
        )}
        <div className="text-center mt-4">
          <Button onClick={triggerPhotoUpload} variant="secondary">
            <Camera className="inline mr-2" /> Add Photo
          </Button>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoUpload} className="hidden" />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">Milestones Reached</h2>
        {achievements.length > 0 ? (
          <div className="space-y-3">
            {achievements.map(ach => (
              <div key={ach.id} className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center border-l-4 border-${ach.color || PRIMARY_COLOR_CLASS}-500 transform transition-all duration-200 ease-in-out hover:shadow-lg hover:scale-[1.03]`}>
                <Trophy className={`w-8 h-8 text-${ach.color || PRIMARY_COLOR_CLASS}-500 mr-4`} />
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{ach.title}</h3>
                  {ach.description && <p className="text-sm text-gray-600 dark:text-gray-400">{ach.description}</p>}
                  <p className="text-xs text-gray-500 dark:text-gray-500">Achieved: {new Date(ach.dateAchieved).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-300 text-center py-4">Keep up the great work! Achievements will appear here.</p>
        )}
      </section>

      {showWeightModal && (
        <div 
            className={`fixed inset-0 flex items-center justify-center p-4 z-[100] bg-black/70 transition-opacity duration-300 ease-in-out ${showWeightModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="track-weight-title"
            onClick={() => setShowWeightModal(false)}
        >
          <div 
            className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out ${showWeightModal ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
                <h3 id="track-weight-title" className="text-xl font-semibold text-gray-800 dark:text-white">Log Your New Weight</h3>
                <button onClick={() => setShowWeightModal(false)} aria-label="Close modal" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <X className="w-6 h-6" />
                </button>
            </div>
            <Input
              label="Current Weight (kg)"
              id="newWeightValue"
              type="number"
              value={newWeightEntry.value}
              onChange={(e) => setNewWeightEntry(prev => ({ ...prev, value: e.target.value }))}
              placeholder="e.g. 70.5"
              icon={<PlusCircle className="text-gray-400" />}
              autoFocus
            />
            <Input
              label="Date"
              id="newWeightDate"
              type="date"
              value={newWeightEntry.date}
              onChange={(e) => setNewWeightEntry(prev => ({ ...prev, date: e.target.value }))}
              icon={<CalendarDays className="text-gray-400" />}
            />
            <Input
              label="Notes (Optional)"
              id="newWeightNotes"
              type="text"
              value={newWeightEntry.notes}
              onChange={(e) => setNewWeightEntry(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="e.g. Morning weight"
            />
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowWeightModal(false)}>Cancel</Button>
              <Button onClick={handleSaveWeight}>Save Weight</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- END OF FILE screens/ProgressScreen.tsx ---