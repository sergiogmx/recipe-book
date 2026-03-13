## Why

La aplicación Recipe Book actualmente solo muestra un título estático. Se necesita la página principal con el listado de recetas para que los usuarios puedan explorar las 10 recetas disponibles en la API, visualizando información clave de cada una (imagen, nombre, categoría, dificultad, tiempo) en un formato de cards atractivo.

## What Changes

- Crear el API slice de RTK Query para hacer data fetching de recetas desde `GET /recipes`
- Crear el feature `recipes` con la página de listado como vista principal de la aplicación
- Implementar un componente `RecipeCard` que muestre imagen, nombre, categoría, dificultad y tiempo de preparación
- Crear un grid responsive de cards para visualizar todas las recetas
- Integrar el API slice en el Redux store existente
- Agregar estados de carga y error en el listado

## Capabilities

### New Capabilities
- `recipe-listing`: Página principal que muestra todas las recetas en un grid de cards con imagen, nombre, categoría, dificultad y tiempo de preparación, usando RTK Query para el data fetching.

### Modified Capabilities
_(ninguna — es el primer feature de la aplicación)_

## Impact

- **Código nuevo**: `src/features/recipes/` (componentes, API slice), `src/shared/` (componentes reutilizables si aplica)
- **Código modificado**: `src/store/store.ts` (agregar el API slice reducer y middleware), `src/App.tsx` (renderizar la página de listado)
- **APIs**: Consumo de `GET http://localhost:3001/recipes` vía RTK Query
- **Dependencias**: `@reduxjs/toolkit` ya incluido; RTK Query viene integrado
