import { useState, useEffect } from "react";
import { serverCalls } from "../api";

export const useFetchData = () => {
  const [characterData, setData] = useState<any>([]);

  async function handleDataFetch() {
    try {
      const result = await serverCalls.get();
      setData(result);
    } catch (error) {
      console.error("No characters found:", error);
      setData([]);
    }
  }

  useEffect(() => {
    handleDataFetch();
  }, []);

  return { characterData, getData: handleDataFetch };
};
