import React, { useState, useEffect } from "react";
import axios from "axios";

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const login = async () => {
    const username = import.meta.env.VITE_USERNAME;
    const password = import.meta.env.VITE_PASSWORD;
    const apiUrl = import.meta.env.VITE_API_URL;
    setLoading(true);
    setError(null);

    try {
      const basicAuth = btoa(`${username}:${password}`);

      const response = await axios.get(`${apiUrl}/`, {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response.data[0]);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
      console.error("Login error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  useState(() => {
    login();
  });

  return {
    loading,
    error,
    data,
  };
};
