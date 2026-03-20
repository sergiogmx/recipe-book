import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetRecipeByIdQuery } from "./recipesApi";
import { formatPrepTime } from "./formatPrepTime";
import type { Recipe } from "./types";

function getWhatsAppUrl(recipe: Recipe) {
  const recipeUrl = `${window.location.origin}/recipes/${recipe.id}`;
  const message = `${recipe.name} (${recipe.category})\n\n${recipeUrl}`;
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: recipe, isLoading, error } = useGetRecipeByIdQuery(Number(id));
  const [imgError, setImgError] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 mb-6"
        >
          ← Volver al listado
        </Link>

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-amber-500 border-r-transparent" />
            <p className="mt-4 text-gray-500">Cargando receta...</p>
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 p-6 text-center">
            <p className="text-red-700">No se pudo cargar la receta. Inténtalo de nuevo.</p>
          </div>
        )}

        {!isLoading && !error && !recipe && (
          <div className="rounded-xl bg-gray-100 p-6 text-center">
            <p className="text-gray-600">Receta no encontrada.</p>
          </div>
        )}

        {recipe && (
          <article>
            {imgError ? (
              <div className="w-full h-72 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-400">
                <span className="text-6xl">🍽</span>
              </div>
            ) : (
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-72 object-cover rounded-2xl"
                onError={() => setImgError(true)}
              />
            )}

            <h1 className="mt-6 text-3xl font-bold text-gray-900">{recipe.name}</h1>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                {recipe.category}
              </span>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                {recipe.difficulty}
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                {formatPrepTime(recipe.prepTime)}
              </span>
              <a
                href={getWhatsAppUrl(recipe)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white hover:bg-green-700"
              >
                Compartir por WhatsApp
              </a>
            </div>

            <p className="mt-4 text-gray-700 leading-relaxed">{recipe.description}</p>

            <section className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Ingredientes</h2>
              <ul className="mt-3 space-y-2">
                {recipe.ingredients.map((ingredient, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-700">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900">Preparación</h2>
              <ol className="mt-3 space-y-3">
                {recipe.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-gray-700">
                    <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </section>
          </article>
        )}
      </div>
    </div>
  );
}
