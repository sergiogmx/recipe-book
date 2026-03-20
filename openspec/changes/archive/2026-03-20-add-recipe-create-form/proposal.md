## Why

Actualmente el libro de recetas solo permite consultar recetas existentes. Los usuarios no tienen forma de agregar sus propias recetas desde la aplicación. Un formulario de creación es la siguiente pieza funcional clave para convertir la app en una herramienta útil y completa.

## What Changes

- Nuevo formulario de creación de recetas con campos: nombre, descripción, ingredientes (agregar/quitar), pasos de preparación (agregar/quitar/reordenar), categoría (dropdown dinámico), dificultad (Fácil/Media/Difícil), tiempo de preparación y URL de imagen.
- Validación de todos los campos requeridos con mensajes de error claros en español.
- Nuevo endpoint mutation `POST /recipes` integrado en el API slice existente con RTK Query.
- Nueva ruta `/recipes/new` para acceder al formulario.
- Botón de acceso al formulario desde la página de listado.

## Capabilities

### New Capabilities

- `recipe-create-form`: Formulario completo para crear nuevas recetas con validación, listas dinámicas de ingredientes y pasos, y envío al API.

### Modified Capabilities

- `routing`: Nueva ruta `/recipes/new` agregada al router.
- `recipe-listing`: Botón/enlace para navegar al formulario de creación.

## Scope

**IN scope:**
- Formulario de creación con todos los campos descritos arriba.
- Validación client-side con mensajes en español.
- Integración con `POST /recipes` para persistir la receta.
- Ruta nueva `/recipes/new` y botón de acceso desde el listado.

**OUT of scope:**
- Edición de recetas existentes.
- Upload de imágenes (se usa URL directa).
- Validación server-side.
- Autenticación o autorización.
- Drag-and-drop para reordenar pasos.
- Borradores o guardado parcial.

## Impacto en features existentes

- **`src/features/recipes/recipesApi.ts`** — se agrega mutation `createRecipe` (`POST /recipes`) al API slice existente.
- **`src/router.tsx`** — se agrega ruta `/recipes/new` antes de `/recipes/:id`.
- **`src/features/recipes/RecipesPage.tsx`** — se agrega botón "Nueva Receta" en el header.

## Impact

- **Archivos nuevos:**
  - `src/features/recipes/RecipeCreatePage.tsx` — página con el formulario
  - `src/features/recipes/recipeForm.schema.ts` — esquema Zod de validación
- **API:** Usa `POST /recipes` de JSON Server (ya soportado por convención).
- **Dependencias:** Usa React Hook Form + Zod + @hookform/resolvers (ya instalados, sin nuevas dependencias).
