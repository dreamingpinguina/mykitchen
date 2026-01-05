import { Order } from '../types';

const STORAGE_KEY = 'private_dinner_orders';

export const getStoredOrders = (): Order[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to parse orders", error);
    return [];
  }
};

export const saveOrder = (order: Order): Order[] => {
  const currentOrders = getStoredOrders();
  // Ensure one order per user (double check)
  const filtered = currentOrders.filter(o => o.userId !== order.userId);
  const newOrders = [...filtered, order];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrders));
  return newOrders;
};

export const removeOrder = (userId: string): Order[] => {
  const currentOrders = getStoredOrders();
  const newOrders = currentOrders.filter(o => o.userId !== userId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newOrders));
  return newOrders;
};

export const clearOrders = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};