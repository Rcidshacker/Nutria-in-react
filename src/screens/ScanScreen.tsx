// --- START OF FILE screens/ScanScreen.tsx ---

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OCVAnalysisResult, OCVSmartSuggestion } from '../types';
import { Button } from '../components/Button';
import { PRIMARY_COLOR_CLASS, ACCENT_COLOR_CLASS } from '../constants';
import { FileUpload } from '../components/FileUpload';

import { 
    Edit3, 
    Save, 
    X, 
    CheckCircle, 
    Beef, 
    Layers, 
    Ruler, 
    FlaskConical, 
    Sparkles 
} from 'lucide-react';

interface ScanScreenProps {}

// --- Animation Variants ---
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export const ScanScreen: React.FC<ScanScreenProps> = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState<OCVAnalysisResult | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingCard, setEditingCard] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  
  const [editableData, setEditableData] = useState<OCVAnalysisResult | null>(null);

  const handleImageSelect = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      setTimeout(() => simulateAnalysis(), 500);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageSelect(file);
  };

  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResult: OCVAnalysisResult = {
      dishName: "Paneer Butter Masala", quantity: "2 rotis, 1 bowl sabzi", portionSize: "Approx. 300g",
      nutrients: { protein: "12g", fat: "10g", carbs: "45g", calories: "320 kcal" },
      ingredients: "Paneer, cream, tomato, spices, butter, onion", confidence: 0.89,
    };
    
    setAnalysisData(mockResult);
    setEditableData(mockResult);
    setIsAnalyzing(false);
  };

  const getSmartSuggestions = (): OCVSmartSuggestion[] => {
    if (!analysisData) return [];
    const suggestions: OCVSmartSuggestion[] = [];
    if (parseInt(analysisData.nutrients.protein) > 10) suggestions.push({ type: 'positive', text: 'High Protein', icon: '⚡' });
    if (parseInt(analysisData.nutrients.calories) > 300) suggestions.push({ type: 'warning', text: 'High Calorie', icon: '⚠️' });
    if (parseInt(analysisData.nutrients.fat) > 8) suggestions.push({ type: 'negative', text: 'High Fat', icon: '🔴' });
    return suggestions;
  };

  const handleEditStart = (cardType: string) => { setEditingCard(cardType); setEditMode(true); };
  const handleEditSave = () => { setAnalysisData(editableData); setEditMode(false); setEditingCard(null); };
  const handleEditCancel = () => { setEditableData(analysisData); setEditMode(false); setEditingCard(null); };

  const handleSaveToLog = () => {
    console.log("Saving to log:", analysisData);
    setShowSuccess(true);
    setTimeout(() => { setShowSuccess(false); handleReset(); }, 2000);
  };

  const handleReset = () => {
    setImagePreview(null);
    setAnalysisData(null);
    setEditableData(null);
    setIsAnalyzing(false);
    setEditMode(false);
    setEditingCard(null);
  };

  const renderAnalysisCard = ( icon: React.ReactNode, label: string, value: string, editKey: keyof OCVAnalysisResult, onEdit: () => void ) => (
    <motion.div variants={cardVariants} className="bg-white dark:bg-cocoa-800 rounded-xl p-4 shadow-md transform transition-shadow hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <p className="text-sm font-medium text-cocoa-500 dark:text-cocoa-400">{label}</p>
            {editingCard === editKey ? (
              <input type="text" value={editableData?.[editKey] as string || ''}
                onChange={(e) => setEditableData(prev => prev ? {...prev, [editKey]: e.target.value} : null)}
                className={`text-lg font-semibold text-cocoa-800 dark:text-peach-100 bg-transparent border-b-2 border-${PRIMARY_COLOR_CLASS}-500 focus:outline-none`}
                autoFocus />
            ) : ( <p className="text-lg font-semibold text-cocoa-800 dark:text-peach-100">{value}</p> )}
          </div>
        </div>
        <button onClick={onEdit} className="text-cocoa-400 hover:text-cocoa-600 dark:hover:text-clay-200 transition-colors">
          <Edit3 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className={`min-h-screen bg-peach-100 dark:bg-cocoa-900 ${!imagePreview ? 'flex flex-col' : 'pb-20'}`}>
      <div className={`max-w-md mx-auto p-4 sm:p-6 space-y-6 ${!imagePreview ? 'flex-grow flex flex-col justify-center' : ''}`}>
        <h1 className="text-2xl md:text-3xl font-bold text-cocoa-800 dark:text-peach-100 text-center">
          Scan Your Meal
        </h1>

        {!imagePreview ? (
          <FileUpload onChange={(files) => handleImageSelect(files[0])} />
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white dark:bg-cocoa-800 rounded-xl overflow-hidden shadow-lg">
            <img src={imagePreview} alt="Food preview" className="w-full h-64 object-cover" />
            <button onClick={handleReset} className="absolute top-3 right-3 w-8 h-8 bg-black bg-opacity-40 rounded-full flex items-center justify-center text-white hover:bg-opacity-60 transition-colors z-10"> <X className="w-4 h-4" /> </button>
            <AnimatePresence>
            {isAnalyzing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-white/80 dark:bg-cocoa-900/80 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className={`animate-spin w-12 h-12 border-4 border-${PRIMARY_COLOR_CLASS}-200 dark:border-cocoa-700 border-t-${PRIMARY_COLOR_CLASS}-600 dark:border-t-${PRIMARY_COLOR_CLASS}-400 rounded-full mx-auto`} />
                  <p className="text-lg font-medium text-cocoa-800 dark:text-peach-100">Analyzing...</p>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </motion.div>
        )}

        <AnimatePresence>
          {analysisData && !isAnalyzing && (
            <motion.div
              initial="hidden" animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
              className="space-y-4"
            >
                {renderAnalysisCard(<Beef className={`w-8 h-8 text-coral-500`} />, 'Dish Name', analysisData.dishName, 'dishName', () => handleEditStart('dishName'))}
                {renderAnalysisCard(<Layers className={`w-8 h-8 text-blue-500`} />, 'Quantity', analysisData.quantity, 'quantity', () => handleEditStart('quantity'))}
                {renderAnalysisCard(<Ruler className={`w-8 h-8 text-purple-500`} />, 'Portion Size', analysisData.portionSize, 'portionSize', () => handleEditStart('portionSize'))}

                <motion.div variants={cardVariants} className="bg-white dark:bg-cocoa-800 rounded-xl p-4 shadow-md transform transition-shadow hover:shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <FlaskConical className={`w-8 h-8 text-green-500`} />
                            <p className="text-sm font-medium text-cocoa-500 dark:text-cocoa-400">Nutrients</p>
                        </div>
                        <button onClick={() => handleEditStart('nutrients')} className="text-cocoa-400 hover:text-cocoa-600 dark:hover:text-clay-200 transition-colors">
                            <Edit3 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {Object.entries(analysisData.nutrients).map(([key, value]) => (
                             <div key={key}>
                                <p className="text-sm text-cocoa-500 dark:text-cocoa-400 capitalize">{key}</p>
                                <p className="text-lg font-semibold text-cocoa-800 dark:text-peach-100">{value}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div variants={cardVariants} className="bg-white dark:bg-cocoa-800 rounded-xl p-4 shadow-md transform transition-shadow hover:shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                        <Sparkles className={`w-8 h-8 text-${ACCENT_COLOR_CLASS}-500`} />
                        <p className="text-sm font-medium text-cocoa-500 dark:text-cocoa-400">Smart Health Insights</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {getSmartSuggestions().map((suggestion, index) => (
                        <span key={index} className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                            suggestion.type === 'positive' ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300' :
                            suggestion.type === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300'
                        }`}>
                            <span>{suggestion.icon}</span>
                            {suggestion.text}
                        </span>
                        ))}
                    </div>
                </motion.div>

                {editMode ? (
                    <motion.div variants={cardVariants} className="flex gap-3">
                        <Button onClick={handleEditSave} fullWidth className="flex justify-center items-center"><CheckCircle className="mr-2 w-5 h-5"/> Save Changes</Button>
                        <Button onClick={handleEditCancel} variant="outline" fullWidth className="flex justify-center items-center"><X className="mr-2 w-5 h-5"/> Cancel</Button>
                    </motion.div>
                ) : (
                    <motion.div variants={cardVariants} className="flex gap-3">
                        <Button onClick={handleSaveToLog} fullWidth className="flex justify-center items-center"><Save className="mr-2"/> Save to Log</Button>
                        <Button onClick={() => setEditMode(true)} variant="outline" fullWidth className="flex justify-center items-center"><Edit3 className="mr-2 w-5 h-5"/> Edit Info</Button>
                    </motion.div>
                )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
            {showSuccess && (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="bg-white dark:bg-cocoa-800 rounded-2xl p-6 text-center max-w-sm w-full">
                    <div className={`w-16 h-16 bg-green-100 dark:bg-green-800/30 rounded-full mx-auto mb-4 flex items-center justify-center`}>
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-cocoa-800 dark:text-peach-100 mb-2"> Meal Saved! </h3>
                    <p className="text-cocoa-600 dark:text-clay-300"> Your meal has been added to your nutrition log. </p>
                </motion.div>
            </div>
            )}
        </AnimatePresence>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
    </div>
  );
};

export default ScanScreen;

// --- END OF FILE screens/ScanScreen.tsx ---
