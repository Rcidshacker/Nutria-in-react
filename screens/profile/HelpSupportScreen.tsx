// --- START OF FILE screens/profile/HelpSupportScreen.tsx ---

import React from 'react';
import { Button } from '../../components/Button';
import { PRIMARY_COLOR_CLASS } from '../../constants';

// UPDATED: Import icons from lucide-react
import { Mail, Phone, LifeBuoy } from 'lucide-react';

// DELETED: Manual EmailIcon, PhoneIcon, and FaqIcon components are removed.

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
          {/* UPDATED: Use lucide-react icon */}
          <Mail className={`w-6 h-6 mr-4 text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400`} />
          <span className="flex-grow font-medium">Email Support ({supportEmail})</span>
        </a>

        <a 
          href={`tel:${supportPhone}`}
          className={`w-full flex items-center p-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg shadow transition-colors text-left text-gray-700 dark:text-gray-200`}
        >
          {/* UPDATED: Use lucide-react icon */}
          <Phone className={`w-6 h-6 mr-4 text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400`} />
          <span className="flex-grow font-medium">Phone Support ({supportPhone})</span>
        </a>

        <Button 
          onClick={() => alert('FAQ & Troubleshooting: Feature coming soon!')} 
          variant="outline" 
          fullWidth
          className="flex items-center justify-start text-left p-4 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          {/* UPDATED: Use lucide-react icon */}
          <LifeBuoy className={`w-6 h-6 mr-4 text-${PRIMARY_COLOR_CLASS}-500 dark:text-${PRIMARY_COLOR_CLASS}-400`} />
          <span className="flex-grow font-medium">FAQ & Troubleshooting</span>
        </Button>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">Our support team is available Mon-Fri, 9 AM - 6 PM.</p>
      </div>
    </div>
  );
};

// --- END OF FILE screens/profile/HelpSupportScreen.tsx ---