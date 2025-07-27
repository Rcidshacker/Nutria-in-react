// src/screens/profile/AddressManagementScreen.tsx

import React, { useState, useEffect } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../types';

// Define a local type for the address form state
type AddressFormData = {
  street: string;
  locality: string;
  city: string;
  state: string;
  country: string;
  zip: string;
};

export const AddressManagementScreen: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [address, setAddress] = useState<AddressFormData>({
    street: '',
    locality: '',
    city: '',
    state: '',
    country: '',
    zip: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Effect to populate local state from the user object when the component mounts or user changes
  useEffect(() => {
    if (user) {
      setAddress({
        street: (user as any).street || '', // Cast to any to access potential address fields
        locality: (user as any).locality || '',
        city: (user as any).city || '',
        state: (user as any).state || '',
        country: (user as any).country || '',
        zip: (user as any).zip || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = async () => {
    setIsLoading(true);
    try {
      // We need to extend the User type or cast here if address fields aren't on the base User type
      await updateUser(address as Partial<User>);
      alert('Address saved successfully!');
    } catch (error) {
      console.error("Failed to save address:", error);
      alert('There was an error saving your address. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Manage Addresses</h2>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Add or update your delivery addresses.
      </p>

      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Edit Primary Address:</h3>
      <div className="space-y-4">
        <Input
          label="Street Address / House No."
          id="street"
          name="street"
          value={address.street}
          onChange={handleChange}
          placeholder="e.g., 123 Main St, Apt 4B"
        />
        <Input
          label="Locality / Landmark"
          id="locality"
          name="locality"
          value={address.locality}
          onChange={handleChange}
          placeholder="e.g., Near City Park"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="City"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            placeholder="e.g., New Delhi"
          />
          <Input
            label="State / Province"
            id="state"
            name="state"
            value={address.state}
            onChange={handleChange}
            placeholder="e.g., Delhi"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Country"
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
            placeholder="e.g., India"
          />
          <Input
            label="Zip / Postal Code"
            id="zip"
            name="zip"
            value={address.zip}
            onChange={handleChange}
            placeholder="e.g., 110001"
          />
        </div>
      </div>

      <Button onClick={handleSaveAddress} fullWidth className="mt-8" isLoading={isLoading}>
        Save Address
      </Button>
    </div>
  );
};