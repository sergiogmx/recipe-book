import { useState } from "react";
import { Link } from "react-router-dom";
import type { Recipe } from "./types";
import { formatPrepTime } from "./formatPrepTime";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link to={`/recipes/${recipe.id}`} className="block bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {imgError ? (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
          <span className="text-4xl">🍽</span>
        </div>
      ) : (
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="w-full h-48 object-cover"
          onError={() => setImgError(true)}
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-amber-700 font-medium">
            {recipe.category}
          </span>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-blue-700 font-medium">
            {recipe.difficulty}
          </span>
          <span className="text-gray-500">{formatPrepTime(recipe.prepTime)}</span>
        </div>
      </div>
    </Link>
  );
}
