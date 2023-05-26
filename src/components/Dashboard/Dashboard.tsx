import { useState } from "react";
import { NavBar } from "../shared/NavBar";
import { CharacterForm } from "../CharacterForm";
import { CharacterCard } from "../CharacterCard";
import { serverCalls } from "../../api";
import { useFetchData } from "../../hooks";
import { Link } from "react-router-dom";

interface Character {
  id: string;
  name: string;
  super_name: string;
  description: string;
  comics_appeared_in: number;
  super_power: string;
  quote: string;
  image: string;
}

export const Dashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(null);
  const { characterData, getData } = useFetchData();
  const createNewCharacter = (character: Character) => {
    serverCalls
      .create(character)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error("Error creating new character: ", error);
      });
  };
  const submitEdit = (character: Character) => {
    serverCalls
      .update(character.id, character)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error("Error updating character: ", error);
      });
  };
  const deleteData = (id: string) => {
    serverCalls
      .delete(id)
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error("Error deleting character: ", error);
      });
  };
  const defaultCharacter: Character = {
    id: "",
    name: "",
    super_name: "",
    description: "",
    comics_appeared_in: 0,
    super_power: "",
    quote: "",
    image: "",
  };
  const handleCancelClick = () => {
    setIsEditing(false);
    setCurrentCharacter(null);
  }
  const myAuth = localStorage.getItem("myAuth");
  return (
    <div className="m-0 h-[100vh] w-[100vw] snap-y snap-mandatory overflow-x-hidden p-0 text-[var(--text-color)]">
      <NavBar />
      <div className="relative mx-auto my-[10vh] flex w-[80%] items-center justify-center self-center rounded-3xl border border-y-pink-200 bg-gray-900 bg-opacity-60">
        {myAuth === "true" ? (
          <div className="relative grid scale-75 grid-cols-1 gap-x-6 gap-y-36 duration-500 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-12 xl:col-span-2 xl:grid-cols-3">
            {Array.isArray(characterData) ? (
              characterData.map((character: Character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onDelete={deleteData}
                  onSubmit={submitEdit}
                  onCancel={handleCancelClick}
                />
              ))
            ) : (
              <p>Loading...</p>
            )}
            <div className="relative h-full snap-center self-center rounded-3xl border-4 border-blue-900 p-7 ring-4 ring-blue-600 ring-offset-4 ring-offset-indigo-800">
              <CharacterForm
                character={defaultCharacter}
                onSubmit={createNewCharacter}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h3 className="ml-[1.5ch] text-lg">
              Hey now, you're not logged in 😮
            </h3>
            <div className="mt-8 flex flex-col items-center justify-center">
              <Link
                className="font-xl animate-tranceBg rounded-full px-5 py-3 hover:outline hover:outline-[var(--hover-color)]"
                to={"/login"}
              >
                Log Me In!
              </Link>
              <div className="relative flex justify-center py-4 text-sm font-medium">
                <div
                  className="relative inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-10 border-t border-gray-200" />
                </div>
                <span className="bg-transparent px-4 text-[var(--text-color)]">
                  Or
                </span>
                <div
                  className="relative inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-10 border-t border-gray-200" />
                </div>
              </div>
              <Link
                className="font-xl animate-tranceBg rounded-full px-6 py-3 hover:outline hover:outline-[var(--hover-color)]"
                to={"/register"}
              >
                Register Me!
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
