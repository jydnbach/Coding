import { useCallback, useEffect, useState } from 'react';

async function sendHttpRequest(url, config) {
  const res = await fetch('http://localhost:3000/meals');
  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.message || 'Something went wrong, failed to send request.'
    );
  }

  return data;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async function sendRequest() {
      setIsLoading(true);
      try {
        const data = await sendHttpRequest(url, config);
        setData(data);
      } catch (err) {
        setError(err.message) || 'Something went wrong';
      } finally {
        setIsLoading(false);
      }
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
  };
}
