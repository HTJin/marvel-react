import { createSlice } from "@reduxjs/toolkit";

interface CharacterState {
  name: string;
  super_name: string;
  description: string;
  comics_appeared_in: number;
  super_power: string;
  quote: string;
  image: string;
}

const initialState: CharacterState = {
  name: "",
  super_name: "",
  description: "",
  comics_appeared_in: 0,
  super_power: "",
  quote: "",
  image: "",
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    getName: (state, action) => {
      state.name = action.payload;
    },
    getSuperName: (state, action) => {
      state.super_name = action.payload;
    },
    getDescription: (state, action) => {
      state.description = action.payload;
    },
    getComicsAppearedIn: (state, action) => {
      state.comics_appeared_in = action.payload;
    },
    getSuperPower: (state, action) => {
      state.super_power = action.payload;
    },
    getQuote: (state, action) => {
      state.quote = action.payload;
    },
    getImage: (state, action) => {
      state.image = action.payload;
    },
  },
});
export const reducer = rootSlice.reducer;
export const {
  getName,
  getSuperName,
  getDescription,
  getComicsAppearedIn,
  getSuperPower,
  getQuote,
  getImage,
} = rootSlice.actions;
