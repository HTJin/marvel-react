import { useDispatch, useStore } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getName,
  getSuperName,
  getDescription,
  getComicsAppearedIn,
  getSuperPower,
  getQuote,
  getImage,
} from "../../redux/slices/rootSlice";
import { serverCalls } from "../../api";

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

interface CharacterFormProps {
  character?: Character;
  onSubmit?: (character: Character) => void;
}

export const CharacterForm = (props: CharacterFormProps) => {
  const dispatch = useDispatch();
  const store = useStore();
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
  const { register, handleSubmit } = useForm<Character>({
    defaultValues: props.character || defaultCharacter
  });
  const onSubmit = async (data: any, event: any) => {
    event.preventDefault();
    if (props.character && props.character.id) {
      await serverCalls.update(props.character.id, data);
      window.location.reload();
      event.target.reset();
    } else {
      dispatch(getName(data.name));
      dispatch(getSuperName(data.super_name));
      dispatch(getDescription(data.description));
      dispatch(getComicsAppearedIn(data.comics_appeared_in));
      dispatch(getSuperPower(data.super_power));
      dispatch(getQuote(data.quote));
      dispatch(getImage(data.image));
      await serverCalls.create(store.getState());
      window.location.reload();
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="post"
      className="mb-6 grid grid-cols-2 place-items-stretch gap-x-6"
    >
      <div className="w-80 text-base">
        <div className="flex flex-col items-center">
          <label htmlFor="name" className="self-start">
            Name:
          </label>
          <input
            type="text"
            className="block w-full rounded-md border-0 bg-white/5 p-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:italic focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Natasha Romanoff"
            {...register("name")}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="super_name" className="self-start">
            Super Name:
          </label>
          <input
            type="text"
            className="block w-full rounded-md border-0 bg-white/5 p-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:italic focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Black Widow"
            {...register("super_name")}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="description" className="self-start">
            Description:
          </label>
          <textarea
            className="block h-28 w-full rounded-md border-0 bg-white/5 p-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:italic focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="Despite super spy Natasha Romanova’s checkered past, she’s become one of S.H.I.E.L.D.’s most deadly assassins and a frequent member of the Avengers."
            {...register("description")}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="comics_appeared_in" className="self-start">
            # of comic book appearance(s):
          </label>
          <input
            type="number"
            className="block w-full rounded-md border-0 bg-white/5 p-3 py-1.5 text-center text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:italic focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="19"
            {...register("comics_appeared_in")}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="super_power" className="self-start">
            Super Power:
          </label>
          <input
            type="text"
            className="block w-full rounded-md border-0 bg-white/5 p-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:italic focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="superhuman agility, espionage, slowed aging"
            {...register("super_power")}
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="quote" className="self-start">
            Quote:
          </label>
          <textarea
            className="block h-28 w-full rounded-md border-0 bg-white/5 p-3 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:italic focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
            placeholder="I used to have nothing. Then I got this. This job… this family. And I was… I was better because of it. And even though… they're gone… I'm still trying to be better."
            {...register("quote")}
          />
        </div>
      </div>
      <button
        type="submit"
        className="h-[6em] w-[6em] animate-trance cursor-pointer place-self-center rounded-full bg-lime-50 text-3xl font-bold duration-500 hover:animate-tranceBg hover:text-lime-50 hover:ring-4 hover:ring-lime-50 hover:ring-offset-2 hover:transition-all"
      >
        Create
      </button>
    </form>
  );
};
