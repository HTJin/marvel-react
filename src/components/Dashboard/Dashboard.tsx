import { useState } from "react";
import { NavBar } from "../shared/NavBar";
import { CharacterForm } from "../CharacterForm";
import { serverCalls } from "../../api";
import { useFetchData } from "../../hooks";
import { Link } from "react-router-dom";
import placeholderHeroes from "../../static/images/Placeholder_couple_superhero.png";

interface displayData {
  id?: string;
  data?: any;
}
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

export const Dashboard = (props: displayData) => {
  const { characterData, getData } = useFetchData();
  const [editData, setEditData] = useState<Character | null>(null);
  const editCharacter = (character: Character) => {
    setEditData(character);
  };
  const submitEdit = (character: Character) => {
    serverCalls
      .update(character.id, character)
      .then(() => {
        setEditData(null);
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
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting character: ", error);
      });
  };
  const myAuth = localStorage.getItem("myAuth");
  return (
    <div className="m-0 h-[100vh] w-[100vw] snap-y snap-mandatory overflow-x-hidden p-0 text-[var(--text-color)]">
      <NavBar />
      <div className="relative mx-auto my-[10vh] flex w-[80%] items-center justify-center self-center rounded-3xl border border-y-pink-200 bg-gray-900 bg-opacity-60">
        {myAuth === "true" ? (
          <div className="relative grid scale-75 grid-cols-1 gap-x-6 gap-y-36 duration-500 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:gap-x-12 xl:col-span-2 xl:grid-cols-3">
            {Array.isArray(characterData) ? (
              characterData.map((character: Character) => (
                <div
                  key={character.id}
                  className="relative h-full snap-center self-center rounded-3xl border-4 border-blue-900 p-7 ring-4 ring-blue-600 ring-offset-4 ring-offset-indigo-800"
                  id="character-cards"
                >
                  <div className="z-50 -mt-5 translate-y-5 transform rounded-3xl bg-gray-100 p-5 font-commando text-3xl text-gray-900 shadow-inner shadow-gray-700">
                    {character.quote}
                  </div>
                  <span className="-translate-y-15 relative bottom-0 right-20 z-10 float-right h-10 w-10 rotate-45 transform bg-gray-100"></span>
                  <img
                    src={
                      character.image ==
                      "../static/images/Placeholder_couple_superhero.png"
                        ? placeholderHeroes
                        : character.image
                    }
                    alt={character.super_name}
                    className="z-0 aspect-[3/2] w-full rounded-md object-cover"
                  />
                  <h2 className="mt-6 text-3xl font-semibold leading-8 text-indigo-400">
                    {character.super_name}
                  </h2>
                  <p className="mt-3 text-base text-blue-600">Alter Ego:</p>
                  <h3 className="text-xl font-semibold">{character.name}</h3>
                  <ul className="mt-6 flex gap-x-6">
                    Super Powers:
                    {character.super_power.split(", ").map((power, index) => (
                      <li
                        key={index}
                        className="text-yellow-200 hover:text-red-500"
                      >
                        {power}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-base leading-7 text-emerald-100">
                    {character.description}
                  </p>
                  <div className="mt-4 flex w-full items-center justify-between text-xs">
                    <p className="pb-1 text-base text-orange-500 hover:text-cyan-400">
                      Comic book appearance(s): {character.comics_appeared_in}
                    </p>
                    <div className="flex">
                      <button
                        onClick={() => editCharacter(character)}
                        className="mr-6 cursor-pointer self-end rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteData(character.id)}
                        className="cursor-pointer self-end rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
            <div className="relative h-full snap-center self-center rounded-3xl border-4 border-blue-900 p-7 ring-4 ring-blue-600 ring-offset-4 ring-offset-indigo-800">
              {editData ? (
                <CharacterForm character={editData} onSubmit={submitEdit} />
              ) : (
                <CharacterForm />
              )}
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
