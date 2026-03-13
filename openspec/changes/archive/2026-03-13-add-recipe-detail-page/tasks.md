## 1. Setup y Routing

- [x] 1.1 Instalar `react-router-dom` como dependencia
- [x] 1.2 Crear `src/router.tsx` con `createBrowserRouter` definiendo rutas: `/` → `RecipesPage`, `/recipes/:id` → `RecipeDetailPage`, catch-all → redirect a `/`
- [x] 1.3 Modificar `App.tsx` para reemplazar `<RecipesPage />` con `<RouterProvider>` usando el router de `src/router.tsx`

## 2. API y Data Fetching

- [x] 2.1 Agregar endpoint `getRecipeById` en `recipesApi.ts` que llame a `GET /recipes/:id` y retorne un `Recipe`
- [x] 2.2 Exportar el hook `useGetRecipeByIdQuery` desde `recipesApi.ts`

## 3. Página de Detalle

- [x] 3.1 Crear `src/features/recipes/RecipeDetailPage.tsx` que extraiga el `id` de los params de la ruta con `useParams`
- [x] 3.2 Implementar data fetching usando `useGetRecipeByIdQuery` con estados de loading, error y not found
- [x] 3.3 Implementar layout de detalle: imagen hero, nombre como heading, descripción, badges de categoría/dificultad/tiempo
- [x] 3.4 Implementar sección de ingredientes como lista con viñetas bajo heading "Ingredientes"
- [x] 3.5 Implementar sección de pasos como lista numerada bajo heading "Preparación"
- [x] 3.6 Agregar botón de volver al listado visible en todos los estados (loading, error, contenido) usando `<Link to="/">`

## 4. Navegación desde Listado

- [x] 4.1 Modificar `RecipeCard.tsx` para envolver el contenido en `<Link to={/recipes/${recipe.id}}>` manteniendo los estilos visuales existentes
