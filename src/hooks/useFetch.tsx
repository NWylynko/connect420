import { useState, useEffect } from 'react';

interface Fetch {
  loading: boolean;
  error: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

export default function useFetch(url: RequestInfo): Fetch {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { loading, error, data };
}
