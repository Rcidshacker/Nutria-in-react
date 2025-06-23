// --- START OF FILE: screens/steps/Step7Payment.tsx ---

import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { RadioCard } from '../../components/RadioCard';
import { useSignUpForm } from '../../contexts/SignUpContext';
import { PLANS, PAYMENT_METHODS, PRIMARY_COLOR_CLASS } from '../../constants';
import { PaymentMethod } from '../../types';
import { StepWrapper } from '../../components/StepWrapper';

// UPDATED: Add isLoading to the props
interface Step7PaymentProps {
  onNext: () => void;
  isLoading: boolean;
}

export const Step7Payment: React.FC<Step7PaymentProps> = ({ onNext, isLoading }) => {
  const { formData, updateFormData } = useSignUpForm();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('');
  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData | 'paymentMethod', string>>>({});

  const premiumPlan = PLANS.find(p => p.id === 'nutria');
  const amount = premiumPlan?.price || 'N/A';

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPaymentMethod(e.target.value as PaymentMethod);
    updateFormData({ upiId: '', cardNumber: '', cardExpiry: '', cardCvv: '' });
    if (errors.paymentMethod) setErrors(prev => ({ ...prev, paymentMethod: undefined }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name as keyof typeof formData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof typeof formData | 'paymentMethod', string>> = {};
    if (!selectedPaymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method.';
    } else if (selectedPaymentMethod === 'upi' && !formData.upiId?.trim()) {
      newErrors.upiId = 'UPI ID is required.';
    } else if (['visa', 'mastercard', 'rupay'].includes(selectedPaymentMethod)) {
      if (!formData.cardNumber?.trim() || !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Valid 16-digit card number is required.';
      if (!formData.cardExpiry?.trim() || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) newErrors.cardExpiry = 'Valid expiry (MM/YY) is required.';
      if (!formData.cardCvv?.trim() || !/^\d{3,4}$/.test(formData.cardCvv)) newErrors.cardCvv = 'Valid CVV (3 or 4 digits) is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAttemptPayment = () => {
    if (validate()) {
      onNext(); // This will trigger handleCompleteSignup in the parent
    }
  };

  if (formData.plan !== 'nutria') {
    return <StepWrapper title="Payment"><p className="text-cocoa-600 dark:text-clay-300">Payment is only for the Nutria plan.</p></StepWrapper>;
  }

  return (
    <StepWrapper title="Complete Your Payment">
      <div className="mb-6 p-4 bg-peach-50 dark:bg-cocoa-700 rounded-md">
        <p className="text-lg font-medium text-cocoa-800 dark:text-peach-100">Amount Due:</p>
        <p className={`text-3xl font-bold text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400`}>{amount}</p>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-cocoa-700 dark:text-clay-200 mb-2">Select Payment Method:</label>
        <div className="space-y-3">
          {PAYMENT_METHODS.map(method => (
            <RadioCard
              key={method.id} id={`payment-${method.id}`} name="paymentMethod"
              value={method.id} label={method.label}
              checked={selectedPaymentMethod === method.id}
              onChange={handlePaymentMethodChange}
            />
          ))}
        </div>
        {errors.paymentMethod && <p className="mt-1 text-xs text-red-500">{errors.paymentMethod}</p>}
      </div>
      {selectedPaymentMethod === 'upi' && (
        <Input
          label="UPI ID" id="upiId" name="upiId" value={formData.upiId || ''}
          onChange={handleChange} error={errors.upiId} placeholder="yourname@bank"
        />
      )}
      {['visa', 'mastercard', 'rupay'].includes(selectedPaymentMethod) && (
        <div className="space-y-4">
          <Input
            label="Card Number" id="cardNumber" name="cardNumber" value={formData.cardNumber || ''}
            onChange={handleChange} error={errors.cardNumber} placeholder="•••• •••• •••• ••••" maxLength={19}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry (MM/YY)" id="cardExpiry" name="cardExpiry" value={formData.cardExpiry || ''}
              onChange={handleChange} error={errors.cardExpiry} placeholder="MM/YY" maxLength={5}
            />
            <Input
              label="CVV" id="cardCvv" name="cardCvv" type="password" value={formData.cardCvv || ''}
              onChange={handleChange} error={errors.cardCvv} placeholder="•••" maxLength={4}
            />
          </div>
        </div>
      )}
      {/* UPDATED: Pass the isLoading prop to the button */}
      <Button onClick={handleAttemptPayment} fullWidth isLoading={isLoading} className="mt-8">
        Complete Signup & Pay {amount}
      </Button>
    </StepWrapper>
  );
};