// --- START OF FILE screens/profile/MedicalReportUploadScreen.tsx ---

import React, { useState, useRef } from 'react';
import { Button } from '../../components/Button';
import { useSignUpForm } from '../../contexts/SignUpContext';
import { StepWrapper } from '../../components/StepWrapper'; 
import { PRIMARY_COLOR_CLASS, ACCENT_COLOR_CLASS } from '../../constants';
import { AppRoute, SignUpFormData } from '../../types'; 
import { motion } from 'framer-motion'; 
import { medicalReportService } from '../../services/api'; // Import the new service

import { UploadCloud, Camera, CheckCircle, Loader } from 'lucide-react';

interface MedicalReportUploadScreenProps {
  mode: 'onboarding' | 'profile';
  onNext?: () => void;
  navigateTo?: (route: AppRoute) => void;
}

export const MedicalReportUploadScreen: React.FC<MedicalReportUploadScreenProps> = ({ mode, onNext, navigateTo }) => {
  const { formData, updateFormData } = useSignUpForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(formData.uploadedReportFile || null);
  const [fileName, setFileName] = useState<string>(formData.uploadedReportFileName || '');
  const [isExtracting, setIsExtracting] = useState(false);
  
  // Initialize extractedData from formData if available, to persist data across steps
  const initialExtractedData = Object.keys(formData)
    .filter(keyString => keyString.startsWith('report') && formData[keyString as keyof SignUpFormData])
    .reduce<Partial<SignUpFormData>>((acc, keyString) => {
        const typedKey = keyString as keyof SignUpFormData;
        return { ...acc, [typedKey]: formData[typedKey] };
    }, {} as Partial<SignUpFormData>);

  const [extractedData, setExtractedData] = useState<Partial<SignUpFormData>>(initialExtractedData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) { 
        alert("File size exceeds 5MB. Please upload a smaller file."); 
        return; 
      }
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) { 
        alert("Invalid file type. Please upload PDF, PNG, JPG, or JPEG."); 
        return; 
      }
      
      setSelectedFile(file);
      setFileName(file.name);
      setExtractedData({}); // Clear previous extracted data on new file selection
      // Reset relevant formData fields when a new file is selected
      updateFormData({ 
        uploadedReportFile: file, 
        uploadedReportFileName: file.name,
        reportPatientName: '', reportDate: '', reportHba1c: '', reportGlucose: '', 
        reportHemoglobin: '', reportTsh: '', reportRbc: '', reportWbc: ''
      });
    }
  };

  // Trigger click on the hidden file input.
  const triggerFileInput = () => { fileInputRef.current?.click(); };

  // Function to handle data extraction by calling the backend API.
  const handleExtractData = async (fileToProcess: File | null = selectedFile) => {
    if (!fileToProcess) { 
      alert("Please select a file first."); 
      return; 
    }
    setIsExtracting(true);
    setExtractedData({}); // Clear previous data before new extraction

    try {
      // Call the new medicalReportService to send the file to the backend
      // The 'result' object here will have a structure like { success: boolean, data: ExtractedMedicalData }
      const result = await medicalReportService.extractMedicalReportData(fileToProcess);
      console.log("Extraction result from backend:", result);

      // Access the actual extracted medical data from result.data
      const extractedMedicalData = result.data; 

      // Map backend response to frontend formData structure
      // Ensure that the keys in 'extracted' match the keys in SignUpFormData
      // and that the data types are compatible.
      const extracted: Partial<SignUpFormData> = {
        reportPatientName: extractedMedicalData?.PatientInformation?.PatientName || '',
        reportDate: extractedMedicalData?.PatientInformation?.DateOfReport || '',
        // Extracting specific test values. Adjust these based on the exact TestName
        // returned by your Gemini model and the fields you want to store.
        reportHba1c: extractedMedicalData?.Tests?.find((t: any) => t.TestName === 'HbA1c')?.Value + (extractedMedicalData?.Tests?.find((t: any) => t.TestName === 'HbA1c')?.Unit || '') || '',
        reportGlucose: extractedMedicalData?.Tests?.find((t: any) => t.TestName === 'Glucose')?.Value + (extractedMedicalData?.Tests?.find((t: any) => t.TestName === 'Glucose')?.Unit || '') || '',
        reportHemoglobin: extractedMedicalData?.Tests?.find((t: any) => t.TestName === 'Hemoglobin')?.Value + (extractedMedicalData?.Tests?.find((t: any) => t.TestName === 'Hemoglobin')?.Unit || '') || '',
        reportTsh: extractedMedicalData?.Tests?.find((t: any) => t.TestName === 'TSH')?.Value + (extractedMedicalData?.Tests?.find((t: any) => t.TestName === 'TSH')?.Unit || '') || '',
        reportRbc: extractedMedicalData?.Tests?.find((t: any) => t.TestName === 'RBC')?.Value + (extractedMedicalData?.Tests?.find((t: any) => t.TestName === 'RBC')?.Unit || '') || '',
        reportWbc: extractedMedicalData?.Tests?.find((t: any) => t.TestName === 'WBC')?.Value + (extractedMedicalData?.Tests?.find((t: any) => t.TestName === 'WBC')?.Unit || '') || '',
      };
      
      setExtractedData(extracted); // Update local state with extracted data
      updateFormData(extracted);   // Update global form data context
    } catch (error) {
      console.error("Error during medical report extraction:", error);
      alert("Failed to extract data from the report. Please try again or manually enter details.");
    } finally {
      setIsExtracting(false);
    }
  };

  // Handles saving the extracted data and proceeding to the next step or screen.
  const handleSaveAndProceed = () => {
    // If a file is selected but no data extracted, prompt user to extract first.
    if (Object.keys(extractedData).length === 0 && selectedFile) {
        // Using window.confirm instead of alert for better user interaction
        if (window.confirm("You have a selected file. Do you want to try extracting data before proceeding?")) {
            handleExtractData();
            return; 
        }
    }
    // Proceed based on the mode (onboarding or profile)
    if (mode === 'onboarding' && onNext) onNext();
    else if (mode === 'profile' && navigateTo) {
      alert("Medical report details updated!");
      navigateTo('#/app/profile'); 
    }
  };
  
  // Content to be rendered within the StepWrapper or directly in profile screen.
  const screenContent = (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center">
        Please upload your latest medical report (PDF or Image). This helps us personalize your plan.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Button onClick={triggerFileInput} variant="outline" className="h-24 flex flex-col items-center justify-center">
          <UploadCloud className={`w-8 h-8 mb-1 text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400`} />
          Upload PDF/Image
        </Button>
        {/* The "Take a Picture" button currently uses the same file input.
            For actual camera access on mobile, Capacitor's Camera API would be used. */}
        <Button onClick={triggerFileInput} variant="outline" className="h-24 flex flex-col items-center justify-center">
          <Camera className={`w-8 h-8 mb-1 text-${ACCENT_COLOR_CLASS}-500 dark:text-${ACCENT_COLOR_CLASS}-400`} />
          Take a Picture
        </Button>
      </div>
      {/* Hidden file input element */}
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".pdf,.png,.jpg,.jpeg" />

      {/* Display selected file name */}
      {fileName && ( <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-700 dark:text-gray-300"> Selected file: <strong>{fileName}</strong> </div> )}
      
      {/* Button to trigger extraction, shown only if a file is selected and not already extracting/extracted */}
      {selectedFile && !isExtracting && Object.keys(extractedData).length === 0 && ( 
        <Button onClick={() => handleExtractData()} fullWidth className={`my-4 bg-blue-500 hover:bg-blue-600`}> 
          Extract Data from Report 
        </Button> 
      )}

      {/* Loading indicator during extraction */}
      {isExtracting && ( 
        <div className="text-center my-6 p-4 bg-yellow-100 dark:bg-yellow-700/30 rounded-md"> 
          <Loader className="animate-spin h-8 w-8 text-yellow-600 dark:border-yellow-400 mx-auto mb-2" /> 
          <p className="text-yellow-700 dark:text-yellow-300">Extracting data, please wait...</p> 
        </div> 
      )}

      {/* Display extracted data summary if available */}
      {Object.keys(extractedData).length > 0 && !isExtracting && ( 
        <div className="my-6 p-4 border border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-800/30 rounded-md"> 
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3 flex items-center"> 
            <CheckCircle className="mr-2 w-5 h-5"/> Extraction Summary 
          </h3> 
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm"> 
            {/* Only display fields that start with 'report' and have a value */}
            {Object.entries(extractedData).map(([key, value]) => { 
              if (!key.startsWith('report') || !value) return null; 
              return ( 
                <div key={key} className="text-gray-700 dark:text-gray-300 py-1"> 
                  {/* Format key for display (e.g., "reportPatientName" -> "Patient Name") */}
                  <span className="font-medium capitalize">{key.replace('report', '').replace(/([A-Z])/g, ' $1').trim()}:</span> {String(value)} 
                </div> 
              ); 
            })} 
          </div> 
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Please verify the extracted values. You can re-upload if needed.</p> 
        </div> 
      )}
      
      {/* Button to save and proceed, shown if a file is selected or data is extracted */}
      { (selectedFile || Object.keys(extractedData).length > 0 || (!isExtracting && Object.keys(initialExtractedData).length > 0)) && ( 
        <Button onClick={handleSaveAndProceed} fullWidth className="mt-6"> 
          {mode === 'onboarding' ? 'Save & Continue' : 'Save Report & Close'} 
        </Button> 
      )}
    </motion.div>
  );

  // Render with StepWrapper for onboarding flow, or directly for profile screen.
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

// --- END OF FILE screens/profile/MedicalReportUploadScreen.tsx ---
