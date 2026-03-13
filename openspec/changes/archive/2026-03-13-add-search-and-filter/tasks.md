## 1. Tipos y API

- [x] 1.1 Agregar interfaz `Category` (id, name) en `src/features/recipes/types.ts`
- [x] 1.2 Agregar endpoint `getCategories` al API slice en `src/features/recipes/recipesApi.ts` y exportar `useGetCategoriesQuery`

## 2. Componente de filtros

- [x] 2.1 Crear `src/features/recipes/RecipeFilters.tsx` con campo de búsqueda por texto y dropdown de categorías (props: `search`, `onSearchChange`, `category`, `onCategoryChange`, `categories`)
- [x] 2.2 El dropdown debe incluir opción por defecto "Todas las categorías" y ocultar el dropdown si el fetch de categorías falla

## 3. Integración en RecipesPage

- [x] 3.1 Agregar estado local `search` y `selectedCategory` en `RecipesPage.tsx`
- [x] 3.2 Implementar lógica de filtrado con `useMemo`: filtrar por nombre/descripción (case-insensitive) y por categoría en combinación
- [x] 3.3 Agregar el componente `RecipeFilters` entre el header y el grid
- [x] 3.4 Mostrar contador de resultados ("X recetas encontradas") debajo de los filtros
- [x] 3.5 Mostrar estado vacío cuando no hay recetas que coincidan con los filtros

## 4. Verificación

- [x] 4.1 Verificar que TypeScript compila sin errores y la app construye correctamente
