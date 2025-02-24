import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface PokemonState {
  data: any;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: PokemonState = {
  data: null,
  status: "idle",
};

// Thunk para buscar Pokémon por nombre o ID
export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",
  async (query: string) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
    return response.data;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemon.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPokemon.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default pokemonSlice.reducer;
