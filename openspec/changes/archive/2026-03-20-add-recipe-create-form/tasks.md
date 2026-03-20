## 1. Types

- [x] 1.1 Crear `src/features/recipes/recipeForm.schema.ts` con esquema Zod de validación (campos: name, description, ingredients[], steps[], category, difficulty, prepTime, imageUrl) y tipo inferido `RecipeFormData`
- [x] 1.2 Agregar mensajes de error en español a todas las validaciones del esquema Zod

## 2. API

- [x] 2.1 Agregar mutation endpoint `createRecipe` (`POST /recipes`) al API slice existente en `recipesApi.ts` con invalidación de cache del listado
- [x] 2.2 Exportar el hook `useCreateRecipeMutation` desde `recipesApi.ts`

## 3. Components

- [x] 3.1 Crear `src/features/recipes/RecipeCreatePage.tsx` con estructura base: header "Nueva Receta", enlace "Cancelar" que navega a `/`, y formulario conectado con `useForm` + `zodResolver`
- [x] 3.2 Implementar campos básicos: nombre (text input), descripción (textarea), categoría (dropdown con datos del API), dificultad (dropdown: Fácil/Media/Difícil), tiempo de preparación (number input), URL de imagen (text input)
- [x] 3.3 Implementar lista dinámica de ingredientes con `useFieldArray`: agregar, quitar (deshabilitado si queda uno solo), un campo inicial vacío
- [x] 3.4 Implementar lista dinámica de pasos con `useFieldArray`: agregar, quitar (deshabilitado si queda uno solo), reordenar con botones arriba/abajo, un campo inicial vacío
- [x] 3.5 Mostrar errores de validación junto a cada campo con mensajes en español
- [x] 3.6 Implementar submit: llamar mutation, deshabilitar botón con indicador de carga, mostrar error si falla el API, navegar a `/` tras éxito

## 4. Integration

- [x] 4.1 Agregar ruta `/recipes/new` en `src/router.tsx` antes de `/recipes/:id` apuntando a `RecipeCreatePage`
- [x] 4.2 Agregar botón "Nueva Receta" en el header de `RecipesPage.tsx` que navega a `/recipes/new`

## 5. Verificación

- [x] 5.1 Verificar visualmente que el formulario renderiza correctamente, la validación muestra errores, las listas dinámicas funcionan, y la creación persiste la receta en el listado
