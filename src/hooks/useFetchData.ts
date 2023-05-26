import { useState, useEffect } from "react";
import { serverCalls } from "../api";
import { Character } from "../components/shared/interfaces";

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

  const setCharacterData = (updatedCharacter: Character) => {
    setData(
      characterData.map((character: Character) =>
        character.id === updatedCharacter.id ? updatedCharacter : character
      )
    );
  };

  useEffect(() => {
    handleDataFetch();
  }, []);

  return { characterData, getData: handleDataFetch, setCharacterData };
};
