import { useState, useCallback } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
            });
            console.log(response)
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.error);
        }
        return responseData;
      } catch (err) {
        setError(err.message);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
