import type { Category } from "./types";

interface RecipeFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: Category[] | undefined;
  categoriesError: boolean;
}

export function RecipeFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  categoriesError,
}: RecipeFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <input
        type="text"
        placeholder="Buscar por nombre o descripción..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
      />
      {!categoriesError && categories && (
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
