## Why

El listado de recetas muestra solo un resumen (imagen, nombre, categoría, dificultad, tiempo). El usuario no puede ver los ingredientes ni los pasos de preparación sin salir de la app. Agregar una página de detalle permite consultar toda la información de una receta y es el paso natural antes de funcionalidades futuras como edición o favoritos.

## What Changes

- Agregar `react-router-dom` como dependencia para habilitar navegación entre vistas
- Configurar rutas: `/` para el listado y `/recipes/:id` para el detalle
- Crear endpoint RTK Query `getRecipeById` para obtener una receta individual (`GET /recipes/:id`)
- Crear página `RecipeDetailPage` que muestre: imagen grande, nombre, descripción, lista de ingredientes, pasos numerados, badges de categoría/dificultad/tiempo, y botón para volver al listado
- Hacer las `RecipeCard` del listado clickeables con navegación al detalle

## Capabilities

### New Capabilities

- `recipe-detail`: Vista de detalle de una receta individual con navegación desde el listado, data fetching por ID, y presentación completa de todos los campos
- `routing`: Configuración de React Router con rutas para listado y detalle

### Modified Capabilities

- `recipe-listing`: Las cards del listado pasan a ser enlaces navegables hacia la vista de detalle

## Impact

- **Dependencias**: Se agrega `react-router-dom`
- **Código**: `App.tsx` se modifica para incluir el router. `RecipeCard` se envuelve en un enlace. Se crean nuevos archivos en `src/features/recipes/` para la página de detalle
- **API**: Se agrega endpoint RTK Query para `GET /recipes/:id` (ya soportado por JSON Server)
- **Store**: `recipesApi` se extiende con el nuevo endpoint
