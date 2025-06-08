import React from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useSignUpForm } from '../../contexts/SignUpContext';

export const AddressManagementScreen: React.FC = () => {
  const { formData, updateFormData } = useSignUpForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSaveAddress = () => {
    // In a real app, this would save to a list of addresses
    alert('Address saved (simulated).');
    console.log('Current Address Data:', {
      street: formData.street,
      locality: formData.locality,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      zip: formData.zip,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Manage Addresses</h2>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Add or update your delivery addresses.
      </p>

      {/* Placeholder for Address List */}
      <div className="mb-6 p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
        <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Saved Addresses:</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Address listing and primary address selection coming soon.
        </p>
        {/* Example of how a saved address might look */}
        {formData.street && (
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <p className="font-medium text-gray-800 dark:text-white">{formData.street}, {formData.locality}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{formData.city}, {formData.state} - {formData.zip}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{formData.country}</p>
                <span className="text-xs px-1.5 py-0.5 bg-nutria-green-100 text-nutria-green-700 rounded-full mt-1 inline-block">Primary (Example)</span>
            </div>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Add New Address / Edit Primary:</h3>
      <div className="space-y-4">
        <Input
          label="Street Address / House No."
          id="street"
          name="street"
          value={formData.street || ''}
          onChange={handleChange}
          placeholder="e.g., 123 Main St, Apt 4B"
        />
        <Input
          label="Locality / Landmark"
          id="locality"
          name="locality"
          value={formData.locality || ''}
          onChange={handleChange}
          placeholder="e.g., Near City Park"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City"
            id="city"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            placeholder="e.g., New Delhi"
          />
          <Input
            label="State / Province"
            id="state"
            name="state"
            value={formData.state || ''}
            onChange={handleChange}
            placeholder="e.g., Delhi"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Country"
            id="country"
            name="country"
            value={formData.country || ''}
            onChange={handleChange}
            placeholder="e.g., India"
          />
          <Input
            label="Zip / Postal Code"
            id="zip"
            name="zip"
            value={formData.zip || ''}
            onChange={handleChange}
            placeholder="e.g., 110001"
          />
        </div>
      </div>

      <Button onClick={handleSaveAddress} fullWidth className="mt-8">
        Save Address
      </Button>
    </div>
  );
};