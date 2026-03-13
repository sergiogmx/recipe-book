## Context

El listado de recetas (`RecipesPage`) ya funciona: fetchea todas las recetas con RTK Query y las muestra en un grid responsive. Ahora se necesita agregar búsqueda por texto y filtro por categoría. La API mock expone `GET /categories` con 4 categorías (Desayuno, Plato Fuerte, Postre, Snack). El filtrado será client-side ya que todas las recetas se cargan de una vez.

## Goals / Non-Goals

**Goals:**
- Filtrado client-side por texto (nombre + descripción) y categoría
- Fetch de categorías desde la API para el dropdown
- Retroalimentación visual: contador de resultados y estado vacío
- Integración limpia con el `RecipesPage` existente

**Non-Goals:**
- Filtrado server-side (innecesario con ~10 recetas)
- Debounce en la búsqueda (el dataset es pequeño, no hay llamadas a API por cada keystroke)
- Persistir filtros en URL/query params
- Filtro por dificultad o tiempo de preparación

## Decisions

### 1. Filtrado client-side con `useMemo`

Filtrar el array de recetas en el componente usando `useMemo` sobre el resultado de `useGetRecipesQuery`.

**Alternativas consideradas:**
- Query params en RTK Query (`GET /recipes?q=...&category=...`) — JSON Server soporta `q` y filtros, pero agrega complejidad de cache invalidation y latencia por cada cambio de filtro. Con 10 recetas, client-side es instantáneo.
- Estado global con Redux slice — descartado, el estado de filtros es local a la página y no necesita persistencia global.

**Rationale:** Estado local (`useState`) para los filtros + `useMemo` para el filtrado derivado. Simple, predecible, sin re-fetches innecesarios.

### 2. Agregar `getCategories` al API slice existente

Extender `recipesApi` con un nuevo endpoint `getCategories` en lugar de crear un API slice separado.

**Alternativas consideradas:**
- API slice separado `categoriesApi` — descartado porque categorías y recetas comparten el mismo `baseUrl` y dominio lógico. Un solo API slice simplifica el store.

**Rationale:** RTK Query permite múltiples endpoints en un mismo `createApi`. Las categorías son un recurso auxiliar del feature de recetas.

### 3. Componente `RecipeFilters` separado

Extraer la barra de búsqueda y filtro de categoría en un componente `RecipeFilters` que recibe callbacks `onSearchChange` y `onCategoryChange`.

**Rationale:** Mantiene `RecipesPage` enfocado en composición y layout. El componente de filtros es cohesivo y potencialmente reutilizable.

### 4. Estructura de archivos

```
src/features/recipes/
├── RecipeFilters.tsx      # NUEVO: barra de búsqueda + dropdown categoría
├── RecipesPage.tsx        # MODIFICADO: integrar filtros, contador, estado vacío
├── recipesApi.ts          # MODIFICADO: agregar getCategories
├── types.ts               # MODIFICADO: agregar interfaz Category
└── ... (existentes sin cambio)
```

## Risks / Trade-offs

- **[Categorías hardcoded vs API]** → Se usan categorías de la API. Si el fetch de categorías falla, el dropdown se oculta y la búsqueda por texto sigue funcionando. Mitigación: manejo de error independiente.
- **[Rendimiento de filtrado]** → Con `useMemo` y 10 recetas no hay impacto. Si el dataset crece significativamente, se podría migrar a server-side sin cambiar la interfaz de los componentes.
