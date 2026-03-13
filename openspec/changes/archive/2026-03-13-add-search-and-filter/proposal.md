## Why

Con 10 recetas el listado actual es manejable, pero los usuarios necesitan poder encontrar recetas rápidamente por texto o filtrar por categoría (Desayuno, Plato Fuerte, Postre, Snack). Sin búsqueda ni filtros, el usuario debe recorrer visualmente todo el grid.

## What Changes

- Agregar un campo de búsqueda por texto que filtre recetas por nombre y descripción (case-insensitive)
- Agregar un dropdown de filtro por categoría usando datos de `GET /categories`
- Los filtros funcionan en combinación (búsqueda + categoría)
- Mostrar un contador de resultados ("X recetas encontradas")
- Mostrar un estado vacío cuando ninguna receta coincide con los filtros

## Capabilities

### New Capabilities
- `search-and-filter`: Búsqueda por texto y filtro por categoría sobre el listado de recetas, con contador de resultados y estado vacío.

### Modified Capabilities
- `recipe-listing`: El listado ahora muestra recetas filtradas en lugar de todas las recetas, e incluye la barra de búsqueda/filtros entre el header y el grid.

## Impact

- **Código nuevo**: Componentes de búsqueda y filtro, endpoint RTK Query para categorías, lógica de filtrado
- **Código modificado**: `RecipesPage.tsx` (integrar barra de filtros, contador, estado vacío)
- **APIs**: Nuevo consumo de `GET http://localhost:3001/categories` vía RTK Query
- **Dependencias**: Ninguna nueva
