// hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        // Process expenses to ensure proper date objects and IDs
        if (key === 'expenses' && Array.isArray(parsed)) {
          return parsed.map((e) => ({
            ...e,
            date: e.date instanceof Date ? e.date : new Date(e.date),
            id: e.id || Date.now() + Math.random()
          }));
        }
        return parsed;
      }
      return initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // Process data before storing
      const dataToStore = key === 'expenses' && Array.isArray(valueToStore)
        ? valueToStore.map(e => ({
            ...e,
            date: e.date instanceof Date ? e.date.toISOString() : e.date
          }))
        : valueToStore;
      
      window.localStorage.setItem(key, JSON.stringify(dataToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
