// --- START OF FILE screens/profile/OrdersScreen.tsx ---

import React, { useState, useMemo } from 'react';
import { Button } from '../../components/Button';
import { RadioCard } from '../../components/RadioCard';
import { SavedMealItem, PaymentOptionType, AppRoute, PaymentMethod } from '../../types';
import { PRIMARY_COLOR_CLASS } from '../../constants';

// UPDATED: Import icons from lucide-react
import { Trash2, Wallet, CreditCard, X, ShoppingBag } from 'lucide-react';

// DELETED: Manual SVG icon components are no longer needed.

const initialSavedMeals: SavedMealItem[] = [
  { id: 'meal1', name: 'Grilled Chicken Salad', imageUrl: 'https://picsum.photos/seed/meal1order/100/100', price: 250, quantity: 1 },
  { id: 'meal2', name: 'Quinoa Bowl', imageUrl: 'https://picsum.photos/seed/meal2order/100/100', price: 220, quantity: 2 },
  { id: 'meal3', name: 'Berry Smoothie', imageUrl: 'https://picsum.photos/seed/meal3order/100/100', price: 180, quantity: 1 },
];

// UPDATED: Payment options use lucide-react icons
const paymentOptions: PaymentOptionType[] = [
  { id: 'upi', label: 'GPay / UPI', icon: Wallet },
  { id: 'visa', label: 'Visa Card', icon: CreditCard },
  { id: 'mastercard', label: 'Mastercard', icon: CreditCard },
];

interface OrdersScreenProps {
  navigateTo: (route: AppRoute) => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({ navigateTo }) => {
  const [savedMeals, setSavedMeals] = useState<SavedMealItem[]>(initialSavedMeals);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('');

  const totalAmount = useMemo(() => {
    return savedMeals.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [savedMeals]);

  const handleRemoveMeal = (mealId: string) => {
    setSavedMeals(prevMeals => prevMeals.filter(meal => meal.id !== mealId));
  };

  const handleQuantityChange = (mealId: string, change: number) => {
    setSavedMeals(prevMeals =>
      prevMeals.map(meal =>
        meal.id === mealId
          ? { ...meal, quantity: Math.max(1, meal.quantity + change) } 
          : meal
      ).filter(meal => meal.quantity > 0) 
    );
  };

  const handleProceedToCheckout = () => {
    if (savedMeals.length === 0) {
      alert("Your order list is empty. Please add some meals first.");
      return;
    }
    setShowPaymentModal(true);
  };

  const handleMakePayment = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }
    alert(`Payment of Rs ${totalAmount.toFixed(2)} via ${selectedPaymentMethod.toUpperCase()} successful! (Simulated)`);
    setSavedMeals([]); 
    setShowPaymentModal(false);
    setSelectedPaymentMethod('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md min-h-[calc(100vh-10rem)] flex flex-col">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">My Orders</h2>

      {savedMeals.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
          <ShoppingBag className={`w-20 h-20 text-gray-400 dark:text-gray-500 mb-4`} />
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-3">Your order list is empty.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Browse our delicious meals and add your favorites!</p>
          <Button onClick={() => navigateTo('#/app/mealplans')} variant="primary">
            Browse Meals
          </Button>
        </div>
      ) : (
        <div className="flex-grow">
          <div className="space-y-4 mb-6">
            {savedMeals.map(meal => (
              <div key={meal.id} className="flex items-center bg-gray-50 dark:bg-gray-700 p-3 rounded-lg shadow transform transition-shadow duration-200 ease-in-out hover:shadow-md">
                <img src={meal.imageUrl || `https://picsum.photos/seed/${meal.id}/80/80`} alt={meal.name} className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover mr-4" />
                <div className="flex-grow">
                  <h3 className="text-md sm:text-lg font-medium text-gray-800 dark:text-white">{meal.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Price: Rs {meal.price.toFixed(2)}</p>
                  <div className="flex items-center mt-1">
                    <button onClick={() => handleQuantityChange(meal.id, -1)} className="px-2 py-0.5 border rounded-l bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">-</button>
                    <span className="px-3 py-0.5 border-t border-b bg-white dark:bg-gray-700">{meal.quantity}</span>
                    <button onClick={() => handleQuantityChange(meal.id, 1)} className="px-2 py-0.5 border rounded-r bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">+</button>
                  </div>
                </div>
                <div className="text-right ml-2">
                    <p className="text-md sm:text-lg font-semibold text-gray-800 dark:text-white">Rs {(meal.price * meal.quantity).toFixed(2)}</p>
                    <button onClick={() => handleRemoveMeal(meal.id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 mt-1 transition-colors" aria-label="Remove meal">
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {savedMeals.length > 0 && (
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold text-gray-700 dark:text-gray-200">Total Amount:</span>
            <span className={`text-2xl font-bold text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400`}>
              Rs {totalAmount.toFixed(2)}
            </span>
          </div>
          <Button onClick={handleProceedToCheckout} fullWidth size="lg">
            Proceed to Checkout
          </Button>
        </div>
      )}

      {showPaymentModal && (
        <div 
          className={`fixed inset-0 flex items-center justify-center p-4 z-[100] bg-black/70 transition-opacity duration-300 ease-in-out ${showPaymentModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          role="dialog" aria-modal="true" aria-labelledby="payment-modal-title"
          onClick={() => setShowPaymentModal(false)}
        >
          <div 
            className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-in-out ${showPaymentModal ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 id="payment-modal-title" className="text-xl font-semibold text-gray-800 dark:text-white">Choose Payment Method</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" aria-label="Close payment modal">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {paymentOptions.map(option => {
                  const Icon = option.icon;
                  return (
                    <RadioCard
                      key={option.id}
                      id={`payment-${option.id}`}
                      name="paymentMethod"
                      value={option.id}
                      label={option.label}
                      icon={<Icon className={`w-7 h-7 mr-3`} />}
                      checked={selectedPaymentMethod === option.id}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value as PaymentMethod)}
                    />
                  )
                })}
            </div>

            <div className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-1">
              Total Due: <span className={`font-bold text-${PRIMARY_COLOR_CLASS}-600 dark:text-${PRIMARY_COLOR_CLASS}-400`}>Rs {totalAmount.toFixed(2)}</span>
            </div>
             <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                You will be redirected to a secure payment gateway (simulation).
            </p>

            <Button 
              onClick={handleMakePayment} 
              fullWidth 
              disabled={!selectedPaymentMethod}
              className="mt-2"
            >
              Make Payment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};


// --- END OF FILE screens/profile/OrdersScreen.tsx ---