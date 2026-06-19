import { useState, useEffect } from 'react';

export const initialRefunds = [
  { id: '#RF-99231', customer: 'John Doe', initials: 'JD', amount: '₹34.50', status: 'New', requestedAt: '2 mins ago' },
  { id: '#RF-99230', customer: 'Alice Smith', initials: 'AS', amount: '₹12.99', status: 'Pending', requestedAt: '15 mins ago' },
  { id: '#RF-99229', customer: 'Mark Brown', initials: 'MB', amount: '₹45.00', status: 'Priority', requestedAt: '1 hour ago' },
  { id: '#RF-99228', customer: 'Sarah Kay', initials: 'SK', amount: '₹22.15', status: 'New', requestedAt: '3 hours ago' },
  { id: '#RF-99227', customer: 'Tom Price', initials: 'TP', amount: '₹19.99', status: 'Pending', requestedAt: '5 hours ago' }
];

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
