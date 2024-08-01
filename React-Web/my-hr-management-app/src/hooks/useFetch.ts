import { useState, useEffect } from 'react';
import api from '../services/api';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useFetch = <T>(url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get<T>(url);
        setData(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

// Créez un hook personnalisé pour gérer les requêtes API dans src/hooks/useFetch.ts