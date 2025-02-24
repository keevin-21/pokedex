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
    <div className="flex flex-col items-center p-8 min-h-screen bg-red-700">
      {/* Título estilo Pokédex */}
      <h1 className="text-5xl font-extrabold text-white mb-6 border-4 border-black px-6 py-2 rounded-md shadow-lg">
        Pokédex
      </h1>

      {/* Barra de búsqueda */}
      <div className="flex space-x-4 mb-8">
        <input
          type="text"
          placeholder="Busca por nombre o ID"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border-2 border-black bg-yellow-300 text-black font-bold rounded-md focus:ring-4 focus:ring-blue-500 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-5 py-2 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition shadow-md"
        >
          Buscar
        </button>
      </div>

      {/* Estado de carga */}
      {status === "loading" && (
        <p className="text-white text-lg font-semibold">Buscando...</p>
      )}
      {status === "failed" && (
        <p className="text-yellow-300 text-lg font-bold">
          ⚠️ Pokémon no encontrado
        </p>
      )}

      {/* Tarjeta del Pokémon encontrado */}
      {status === "succeeded" && data && (
        <div className="bg-white border-4 border-black rounded-lg p-6 w-96 flex flex-col items-center shadow-xl">
          <h2 className="text-3xl font-bold text-black mb-4">
            {data.name.toUpperCase()}
          </h2>
          <img
            src={data.sprites.front_default}
            alt={data.name}
            className="w-40 h-40 border-2 border-black"
          />
          <div className="flex space-x-2 mt-4">
            {data.types.map((type: any) => (
              <TypeBadge key={type.type.name} type={type.type.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
