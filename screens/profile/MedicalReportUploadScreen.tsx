
import React, { useState, useRef } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input'; // May not be needed if not manually editing extracted data
import { useSignUpForm } from '../../contexts/SignUpContext';
import { StepWrapper } from '../../components/StepWrapper'; 
import { PRIMARY_COLOR_CLASS, ACCENT_COLOR_CLASS } from '../../constants';
import { AppRoute, SignUpFormData } from '../../types'; 

interface MedicalReportUploadScreenProps {
  mode: 'onboarding' | 'profile';
  onNext?: () => void; // For onboarding
  navigateTo?: (route: AppRoute) => void; // For profile mode navigation
}

// Placeholder Icons
const UploadIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
);
const CameraIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" /></svg>
);
const CheckCircleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
);


export const MedicalReportUploadScreen: React.FC<MedicalReportUploadScreenProps> = ({ mode, onNext, navigateTo }) => {
  const { formData, updateFormData } = useSignUpForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(formData.uploadedReportFile || null);
  const [fileName, setFileName] = useState<string>(formData.uploadedReportFileName || '');
  const [isExtracting, setIsExtracting] = useState(false);
  
  const initialExtractedData = Object.keys(formData)
    .filter(keyString => keyString.startsWith('report') && formData[keyString as keyof SignUpFormData])
    .reduce<Partial<SignUpFormData>>((acc, keyString) => {
        const typedKey = keyString as keyof SignUpFormData;
        return {
            ...acc,
            [typedKey]: formData[typedKey]
        };
    }, {} as Partial<SignUpFormData>);

  const [extractedData, setExtractedData] = useState<Partial<SignUpFormData>>(initialExtractedData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("File size exceeds 5MB. Please upload a smaller file.");
        return;
      }
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload PDF, PNG, JPG, or JPEG.");
        return;
      }
      setSelectedFile(file);
      setFileName(file.name);
      setExtractedData({}); 
      updateFormData({ 
        uploadedReportFile: file, 
        uploadedReportFileName: file.name,
        reportPatientName: '', reportDate: '', reportHba1c: '', reportGlucose: '', 
        reportHemoglobin: '', reportTsh: '', reportRbc: '', reportWbc: ''
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleExtractData = (fileToProcess: File | null = selectedFile) => {
    if (!fileToProcess) {
      alert("Please select a file first.");
      return;
    }
    setIsExtracting(true);
    setExtractedData({}); 

    setTimeout(() => {
      const mockExtracted: Partial<SignUpFormData> = {
        reportPatientName: formData.fullName || 'Alex Doe', 
        reportDate: new Date().toLocaleDateString('en-CA'), 
        reportHba1c: `${(Math.random() * (7.5 - 5.0) + 5.0).toFixed(1)}%`,
        reportGlucose: `${Math.floor(Math.random() * (150 - 80) + 80)} mg/dL`,
        reportHemoglobin: `${(Math.random() * (16.0 - 12.0) + 12.0).toFixed(1)} g/dL`,
        reportTsh: `${(Math.random() * (4.5 - 0.5) + 0.5).toFixed(1)} mIU/L`,
        reportRbc: `${(Math.random() * (5.5 - 4.0) + 4.0).toFixed(2)} million/mcL`,
        reportWbc: `${Math.floor(Math.random() * (11000 - 4000) + 4000)} /mcL`,
      };
      setExtractedData(mockExtracted); 
      updateFormData(mockExtracted); 
      setIsExtracting(false);
    }, 2500);
  };

  const handleSaveAndProceed = () => {
    if (Object.keys(extractedData).length === 0 && selectedFile) {
        if (confirm("You have a selected file. Do you want to try extracting data before proceeding?")) {
            handleExtractData();
            return; 
        }
    }
    if (mode === 'onboarding' && onNext) {
      onNext();
    } else if (mode === 'profile' && navigateTo) {
      alert("Medical report details updated!");
      navigateTo('#/app/profile'); 
    }
  };
  
  const screenContent = (
    <>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">
        Please upload your latest medical report (PDF or Image). This helps us personalize your plan.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button onClick={triggerFileInput} variant="outline" className="h-24 flex flex-col items-center justify-center">
          <UploadIcon className={`w-8 h-8 mb-1 text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400`} />
          Upload PDF/Image
        </Button>
        <Button onClick={triggerFileInput} variant="outline" className="h-24 flex flex-col items-center justify-center">
          <CameraIcon className={`w-8 h-8 mb-1 text-${ACCENT_COLOR_CLASS}-500 dark:text-${ACCENT_COLOR_CLASS}-400`} />
          Take a Picture
        </Button>
      </div>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.png,.jpg,.jpeg" />

      {fileName && (
        <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300">
          Selected file: <strong>{fileName}</strong>
        </div>
      )}

      {selectedFile && !isExtracting && Object.keys(extractedData).length === 0 && (
         <Button onClick={() => handleExtractData()} fullWidth className={`my-4 bg-blue-500 hover:bg-blue-600`}>
            Extract Data from Report
        </Button>
      )}

      {isExtracting && (
        <div className="text-center my-6 p-4 bg-yellow-100 dark:bg-yellow-700/30 rounded-md">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 dark:border-yellow-400 mx-auto mb-2"></div>
          <p className="text-yellow-700 dark:text-yellow-300">Extracting data from your report, please wait...</p>
        </div>
      )}

      {Object.keys(extractedData).length > 0 && !isExtracting && (
        <div className="my-6 p-4 border border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-800/30 rounded-md">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3 flex items-center">
            <CheckCircleIcon className="mr-2"/> Extraction Summary (Simulated)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {Object.entries(extractedData).map(([key, value]) => {
              if (!key.startsWith('report') || !value) return null; 
              return (
                <div key={key} className="text-gray-700 dark:text-gray-300 py-1">
                  <span className="font-medium capitalize">{key.replace('report', '').replace(/([A-Z])/g, ' $1').trim()}:</span> {String(value)}
                </div>
              );
            })}
          </div>
           <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Please verify the extracted values. You can re-upload if needed.</p>
        </div>
      )}
      
      { (selectedFile || Object.keys(extractedData).length > 0 || !isExtracting && Object.keys(initialExtractedData).length > 0) && (
        <Button onClick={handleSaveAndProceed} fullWidth className="mt-6">
            {mode === 'onboarding' ? 'Save & Continue' : 'Save Report & Close'}
        </Button>
      )}
    </>
  );

  if (mode === 'onboarding') {
    return <StepWrapper title="Upload Medical Report">{screenContent}</StepWrapper>;
  }

  return (
     <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Upload/View Medical Report</h2>
        {screenContent}
    </div>
  );
};
