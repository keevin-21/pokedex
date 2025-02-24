import React from "react";

interface TypeBadgeProps {
  type: string;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  // Colores inspirados en los tipos oficiales de Pokémon
  const colors: { [key: string]: string } = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-500",
    grass: "bg-green-500",
    ice: "bg-blue-300",
    fighting: "bg-red-600",
    poison: "bg-purple-500",
    ground: "bg-yellow-700",
    flying: "bg-indigo-500",
    psychic: "bg-pink-500",
    bug: "bg-green-600",
    rock: "bg-gray-600",
    ghost: "bg-indigo-700",
    dragon: "bg-purple-700",
    dark: "bg-gray-800",
    steel: "bg-gray-500",
    fairy: "bg-pink-400",
  };

  const backgroundColor = colors[type] || "bg-gray-500";

  return (
    <span
      className={`px-4 py-2 text-white text-sm font-bold rounded-md border-2 border-black shadow-md ${backgroundColor}`}
    >
      {type.toUpperCase()}
    </span>
  );
};

export default TypeBadge;
