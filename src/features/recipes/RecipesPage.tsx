import { useGetRecipesQuery } from "./recipesApi";
import { RecipeCard } from "./RecipeCard";

export function RecipesPage() {
  const { data: recipes, isLoading, error } = useGetRecipesQuery();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Recipe Book</h1>
          <p className="mt-2 text-gray-600">
            Descubre nuestras recetas favoritas de la cocina mexicana
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-amber-600" />
          </div>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 p-4 text-red-700">
            No se pudieron cargar las recetas. Verifica que el servidor esté corriendo.
          </div>
        )}

        {recipes && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
