import { useState, useCallback } from 'react';

export function useUserData(itemsPerPage) {
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (currentPage, searchTerm) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${currentPage}&perPage=${itemsPerPage}&searchTerm=${searchTerm}`,
        {
          credentials: 'include',
        }
      );
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized - Please log in");
        }
        throw new Error("Failed to fetch data");
      }
      const result = await response.json();
      setData(result.users);
      setTotalCount(result.totalCount);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        error.message || "An error occurred while fetching data. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }, [itemsPerPage]);

  return { data, totalCount, error, isLoading, fetchData };
}
