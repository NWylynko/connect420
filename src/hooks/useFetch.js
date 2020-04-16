import { useState, useEffect } from 'react';

export default function useFetch(url) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(setError)
      .finally(() => { setLoading(false) })
  }, [url])

  return { loading, error, data }
}