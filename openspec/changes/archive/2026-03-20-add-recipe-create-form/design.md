## Context

La aplicación Recipe Book actualmente solo soporta lectura de recetas (listado y detalle). Se necesita un formulario de creación para permitir a los usuarios agregar nuevas recetas. El proyecto ya tiene instaladas las dependencias necesarias (React Hook Form, Zod, @hookform/resolvers) pero no las utiliza aún. Este será el primer formulario de la aplicación y establecerá el patrón para futuros formularios.

**Estado actual:**
- `recipesApi.ts` solo tiene query endpoints (GET).
- No existe ningún formulario ni esquema de validación.
- El router tiene 2 rutas: `/` y `/recipes/:id`.

## Goals / Non-Goals

**Goals:**
- Permitir crear recetas completas a través de un formulario validado.
- Establecer el patrón de formularios (React Hook Form + Zod) para el proyecto.
- Listas dinámicas de ingredientes y pasos con agregar/quitar/reordenar.
- Integración con RTK Query mutations para persistencia.

**Non-Goals:**
- Edición de recetas existentes (futuro cambio).
- Upload de imágenes (se usa URL directa).
- Autenticación o autorización.
- Formularios multi-paso o borradores.

## Architecture Decisions

### 1. React Hook Form + Zod para validación de formularios

**Decisión:** Usar `useForm` con `zodResolver` para manejar estado y validación del formulario.

**Alternativas consideradas:**
- Formularios controlados nativos con useState → Demasiado boilerplate para listas dinámicas.
- Formik → No está instalado; React Hook Form ya está en el proyecto.

**Razón:** React Hook Form + Zod ya están instalados y es el patrón definido en la configuración del proyecto. Ofrece validación declarativa, buen rendimiento (renders mínimos) y soporte nativo para `useFieldArray` que es ideal para las listas dinámicas de ingredientes y pasos.

### 2. useFieldArray para listas dinámicas

**Decisión:** Usar `useFieldArray` de React Hook Form para manejar ingredientes y pasos.

**Alternativas consideradas:**
- Estado local con arrays y handlers manuales → Más propenso a bugs, no integrado con la validación.

**Razón:** `useFieldArray` provee `append`, `remove`, `move` directamente integrados con el formulario y la validación. Permite reordenar pasos sin lógica manual.

### 3. Mutation RTK Query con invalidación de cache

**Decisión:** Agregar un mutation endpoint `createRecipe` al `recipesApi` existente, usando `invalidatesTags` para refrescar el listado.

**Alternativas consideradas:**
- Fetch manual con `fetch()` → Pierde integración con el cache de RTK Query.
- Nuevo API slice separado → Innecesario, el endpoint pertenece al mismo dominio.

**Razón:** Seguir el patrón existente del proyecto (un API slice por feature). La invalidación automática de cache garantiza que el listado refleje la nueva receta sin refetch manual.

### 4. Ruta `/recipes/new` antes de `/recipes/:id`

**Decisión:** Registrar la ruta `/recipes/new` antes de `/recipes/:id` en el router para evitar que `new` sea interpretado como un ID.

**Razón:** React Router evalúa rutas en orden. Si `/recipes/:id` va primero, `new` sería capturado como parámetro `id`.

### 5. Esquema Zod en archivo separado

**Decisión:** Crear `recipeForm.schema.ts` con el esquema de validación y el tipo inferido.

**Razón:** Mantiene la separación de responsabilidades. El esquema puede ser reutilizado en un futuro formulario de edición.

## Archivos

**Nuevos:**
- `src/features/recipes/RecipeCreatePage.tsx` — Componente página con formulario completo.
- `src/features/recipes/recipeForm.schema.ts` — Esquema Zod y tipo `RecipeFormData`.

**Modificados:**
- `src/features/recipes/recipesApi.ts` — Agregar mutation `createRecipe`.
- `src/router.tsx` — Agregar ruta `/recipes/new`.
- `src/features/recipes/RecipesPage.tsx` — Agregar botón "Nueva Receta" en el header.

## Risks / Trade-offs

- **[JSON Server acepta cualquier payload]** → El mock API no valida datos del lado servidor. La validación Zod en cliente es la única barrera. Mitigación: validación estricta en el esquema Zod.
- **[Sin ID auto-generado explícito]** → JSON Server genera IDs automáticamente en POST. Esto funciona para el mock pero un backend real necesitaría lógica propia. Mitigación: no enviar `id` en el payload.
- **[Reordenamiento de pasos solo local]** → Los pasos se reordenan en el form pero se guardan como array ordenado. No hay drag-and-drop, solo botones arriba/abajo. Mitigación: funcionalidad suficiente para MVP; drag-and-drop puede agregarse después.
