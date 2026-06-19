import { useState, useEffect } from 'react';

// Sample dummy data based on the HTML provided
export const initialOrders = [
  { id: '#PV-9821', customerName: 'Aditya Sharma', customerPhone: '+91 98765 43210', store: 'Mumbai - Bandra', amount: '₹842.00', status: 'Active', date: '2023-10-25' },
  { id: '#PV-9820', customerName: 'Priya Singh', customerPhone: '+91 87654 32109', store: 'Delhi - CP', amount: '₹320.00', status: 'Out for Delivery', date: '2023-10-25' },
  { id: '#PV-9819', customerName: 'Rahul Varma', customerPhone: '+91 76543 21098', store: 'Bangalore - Indiranagar', amount: '₹1,150.00', status: 'Delivered', date: '2023-10-24' },
  { id: '#PV-9818', customerName: 'Sneha Kapoor', customerPhone: '+91 65432 10987', store: 'Mumbai - Bandra', amount: '₹560.00', status: 'Cancelled', date: '2023-10-24' }
];

// Debounce hook
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
