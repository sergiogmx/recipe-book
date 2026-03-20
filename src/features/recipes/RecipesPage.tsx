import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGetRecipesQuery, useGetCategoriesQuery } from "./recipesApi";
import { RecipeCard } from "./RecipeCard";
import { RecipeFilters } from "./RecipeFilters";

export function RecipesPage() {
  const { data: recipes, isLoading, error } = useGetRecipesQuery();
  const { data: categories, error: categoriesError } = useGetCategoriesQuery();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];
    return recipes.filter((recipe) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        !search ||
        recipe.name.toLowerCase().includes(searchLower) ||
        recipe.description.toLowerCase().includes(searchLower);
      const matchesCategory =
        !selectedCategory || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [recipes, search, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Recipe Book</h1>
              <p className="mt-2 text-gray-600">
                Descubre nuestras recetas favoritas de la cocina mexicana
              </p>
            </div>
            <Link
              to="/recipes/new"
              className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700"
            >
              Nueva Receta
            </Link>
          </div>
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
          <>
            <RecipeFilters
              search={search}
              onSearchChange={setSearch}
              category={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
              categoriesError={!!categoriesError}
            />

            <p className="mt-4 text-sm text-gray-500">
              {filteredRecipes.length} recetas encontradas
            </p>

            {filteredRecipes.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            ) : (
              <div className="mt-12 text-center">
                <p className="text-lg text-gray-500">
                  No se encontraron recetas con los filtros seleccionados.
                </p>
                <p className="mt-1 text-sm text-gray-400">
                  Intenta ajustar tu búsqueda o cambiar la categoría.
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
