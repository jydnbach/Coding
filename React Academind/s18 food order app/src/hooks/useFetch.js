import { useState, useEffect } from 'react';

export function useFetch(fetchFn, initialValue) {
  const [fetchedData, setFetchedData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data either meals or orders
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

  return {
    fetchedData,
    isLoading,
    error,
  };
}
