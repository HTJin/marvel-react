import { useState } from "react";
import { CharacterForm } from "../CharacterForm";
import placeholderHeroes from "../../static/images/Placeholder_couple_superhero.png";

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

interface CharacterCardProps {
  character: Character;
  onDelete: (id: string) => void;
  onSubmit: (character: Character) => void;
  onEdit?: (character: Character) => void;
}

export const CharacterCard = ({
  character,
  onDelete,
  onSubmit,
}: CharacterCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSubmit = async (updatedCharacter: Character) => {
    setIsEditing(false);
    onSubmit(updatedCharacter);
  };
  const handleCancelClick = () => {
    setIsEditing(false);
  };
  return (
    <div
      key={character.id}
      className="relative h-full snap-center self-center rounded-3xl border-4 border-blue-900 p-7 ring-4 ring-blue-600 ring-offset-4 ring-offset-indigo-800"
      id="character-cards"
    >
      {isEditing ? (
        <CharacterForm
          character={character}
          onSubmit={handleSubmit}
          onCancel={handleCancelClick}
        />
      ) : (
        <>
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
              <li key={index} className="text-yellow-200 hover:text-red-500">
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
          </div>
          <div className="mx-auto mt-16 w-full">
            <button
              onClick={handleEditClick}
              className="mr-6 cursor-pointer self-end rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(character.id)}
              className="cursor-pointer self-end rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        </>
      )}
    </div>
  );
};
