import { useState, useEffect } from 'react';

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

export const liveOrderStats = { activeOrders: { count: 42, trend: "+5%" }, preparing: { count: 18 }, delivery: { count: 15 }, criticalAlerts: { count: 4 } };

export const liveOrders = {
  new: [ { id: '#ORD-4612', time: '2m ago', items: '1x Veg Supreme, 2x Coke', type: 'REGULAR', price: '₹24.50' }, { id: '#ORD-4611', time: '5m ago', items: '2x Paneer Tikka Pizza', type: 'VIP', price: '₹32.00' } ],
  preparing: [ { id: '#ORD-4605', timeInPrep: '8m in prep', items: '3x Farm Fresh Deluxe', progress: '66%' } ],
  ready: [ { id: '#ORD-4598', items: '1x Garden Special, 1x Garlic Bread' } ],
  delivery: [ { id: '#ORD-4580', eta: '4 mins', rider: 'Mike T.', distance: '2.4 miles away' } ]
};

export const topStores = [
  { name: 'Downtown Central', activeOrders: 14, avgPrepTime: '12.5 mins' },
  { name: 'Eastside Plaza', activeOrders: 9, avgPrepTime: '14.2 mins' },
  { name: 'West Gate Mall', activeOrders: 7, avgPrepTime: '11.8 mins' }
];

export const criticalAlerts = [
  { id: '#ORD-4587', title: 'Waiting > 10m', store: 'Downtown Central', reason: 'Preparation delayed due to oven capacity.', type: 'timer' },
  { id: '#ORD-4602', title: 'No Rider Assigned for #ORD-4602', reason: 'Order ready for 6 mins. All local riders busy.', type: 'rider' },
  { title: 'Inventory Alert: Fresh Dough Low', store: 'West Gate Mall', reason: 'Estimated stock exhaustion in 45m.', type: 'inventory' }
];
