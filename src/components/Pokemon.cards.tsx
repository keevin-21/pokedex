import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../features/pokemonSlice";
import { RootState, AppDispatch } from "../app/store";
import TypeBadge from "./TypeBadge";

export function PokemonCards() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector((state: RootState) => state.pokemon);

  const handleSearch = () => {
    if (query.trim() !== "") {
      dispatch(fetchPokemon(query.toLowerCase()));
    }
  };

  return (
    <div>
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Enter Pokémon name or ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Pokémon not found</p>}
      {status === "succeeded" && data && (
        <div className="pokemon-card">
          <h2>{data.name.toUpperCase()}</h2>
          <img src={data.sprites.front_default} alt={data.name} />
          <div>
            {data.types.map((type: any) => (
              <TypeBadge key={type.type.name} type={type.type.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
