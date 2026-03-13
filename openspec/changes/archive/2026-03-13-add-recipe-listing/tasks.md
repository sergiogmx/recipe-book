## 1. Tipos y API Slice

- [x] 1.1 Crear `src/features/recipes/types.ts` con la interfaz `Recipe` (id, name, description, ingredients, steps, category, difficulty, prepTime, imageUrl)
- [x] 1.2 Crear `src/features/recipes/recipesApi.ts` con el API slice de RTK Query y el endpoint `getRecipes` contra `GET /recipes`
- [x] 1.3 Registrar el reducer y middleware del API slice en `src/store/store.ts`

## 2. Componentes

- [x] 2.1 Crear `src/features/recipes/RecipeCard.tsx` que muestre imagen, nombre, categoría, dificultad y tiempo de preparación con fallback para imagen rota
- [x] 2.2 Crear `src/features/recipes/RecipesPage.tsx` con el grid responsive (1/2/3 columnas), estados de carga y error, y header de la aplicación
- [x] 2.3 Crear helper para formatear tiempo de preparación (ej: 90 → "1h 30min", 25 → "25 min")

## 3. Integración

- [x] 3.1 Actualizar `src/App.tsx` para renderizar `RecipesPage` como vista principal
- [x] 3.2 Verificar que la app carga recetas correctamente desde JSON Server y muestra el grid de cards
