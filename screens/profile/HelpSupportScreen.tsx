import React from 'react';
import { Button } from '../../components/Button';
import { PRIMARY_COLOR_CLASS } from '../../constants';

const EmailIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" /></svg>
);
const PhoneIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
);
const FaqIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" /></svg>
);


export const HelpSupportScreen: React.FC = () => {
  const supportEmail = 'support@nutria.app';
  const supportPhone = '+919876543210';

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Help & Support</h2>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        If you have any questions or need assistance, please don't hesitate to reach out to us through one of the channels below.
      </p>

      <div className="space-y-4">
        <a 
          href={`mailto:${supportEmail}`}
          className={`w-full flex items-center p-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg shadow transition-colors text-left text-gray-700 dark:text-gray-200`}
        >
          <EmailIcon className={`w-6 h-6 mr-4 text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400`} />
          <span className="flex-grow font-medium">Email Support ({supportEmail})</span>
        </a>

        <a 
          href={`tel:${supportPhone}`}
          className={`w-full flex items-center p-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg shadow transition-colors text-left text-gray-700 dark:text-gray-200`}
        >
          <PhoneIcon className={`w-6 h-6 mr-4 text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400`} />
          <span className="flex-grow font-medium">Phone Support ({supportPhone})</span>
        </a>

        <Button 
          onClick={() => alert('FAQ & Troubleshooting: Feature coming soon!')} 
          variant="outline" 
          fullWidth
          className="flex items-center justify-start text-left p-4 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <FaqIcon className={`w-6 h-6 mr-4 text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400`} />
          <span className="flex-grow font-medium">FAQ & Troubleshooting</span>
        </Button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Our support team is available Mon-Fri, 9 AM - 6 PM.</p>
      </div>
    </div>
  );
};