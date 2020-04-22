import { useState, useEffect } from 'react';

export default function useFetch(url: RequestInfo) {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(setError)
      .finally(() => { setLoading(false) })
  }, [url])

  return { loading, error, data }
}