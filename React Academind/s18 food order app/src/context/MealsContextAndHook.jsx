import { createContext, useState, useEffect } from 'react';

export const MealsContext = createContext();

export const MealsProvider = ({ children, fetchFn, initialValue = [] }) => {
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (err) {
        setError({ message: err.message || 'Failed to fetch data.' });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [fetchFn]);

  return (
    <MealsContext.Provider value={{ fetchedData, isLoading, error }}>
      {children}
    </MealsContext.Provider>
  );
};
