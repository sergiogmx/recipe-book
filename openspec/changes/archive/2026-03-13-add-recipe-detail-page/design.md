## Context

La app actualmente tiene una sola vista (`RecipesPage`) que muestra un grid de `RecipeCard` con filtros de búsqueda y categoría. No existe routing — `App.tsx` renderiza `RecipesPage` directamente. La API mock (JSON Server) ya soporta `GET /recipes/:id` sin cambios. El tipo `Recipe` ya contiene todos los campos necesarios para la vista de detalle (ingredients, steps, etc.).

## Goals / Non-Goals

**Goals:**
- Habilitar navegación client-side entre listado y detalle sin recargas de página
- Mostrar toda la información de una receta en una vista dedicada y bien estructurada
- Mantener consistencia visual con el diseño existente (Tailwind, badges, tipografía)
- Preservar el estado de filtros del listado al volver desde el detalle

**Non-Goals:**
- Edición o eliminación de recetas (funcionalidad futura)
- Recetas favoritas o guardadas
- Compartir recetas por URL con metadata (SEO/OG tags)
- Navegación entre recetas (anterior/siguiente)
- Animaciones de transición entre vistas

## Decisions

### 1. React Router v7 con `createBrowserRouter`

**Decisión**: Usar `react-router-dom` v7 con la API de data router (`createBrowserRouter`).

**Alternativas consideradas**:
- **TanStack Router**: Más type-safe pero agrega complejidad innecesaria para 2 rutas. Sobreingeniería para el alcance actual.
- **Navegación manual con estado**: Sin dependencia extra pero reimplementa mal lo que React Router ya resuelve (history, params, back button).

**Razón**: React Router es el estándar de facto en React, tiene excelente integración con el ecosistema y es suficiente para las necesidades actuales y futuras del proyecto.

### 2. Endpoint RTK Query dedicado para detalle

**Decisión**: Agregar `getRecipeById` como endpoint separado en `recipesApi` que llame a `GET /recipes/:id`.

**Alternativas consideradas**:
- **Seleccionar de la cache de `getRecipes`**: Evita request extra pero falla si el usuario navega directamente a `/recipes/:id` sin pasar por el listado. También acopla el detalle al listado.

**Razón**: Un endpoint dedicado es más robusto — funciona con navegación directa, deep links y refresh. RTK Query maneja el cache automáticamente, así que si la receta ya fue cargada por el listado, no hay request duplicado.

### 3. Estructura de archivos dentro de `features/recipes/`

**Decisión**: Crear `RecipeDetailPage.tsx` en `src/features/recipes/` al mismo nivel que `RecipesPage.tsx`. El router se configura en `src/router.tsx`.

**Alternativas consideradas**:
- **Carpeta separada `features/recipe-detail/`**: Mayor separación pero fragmenta una feature que comparte tipos, API y contexto.

**Razón**: Ambas vistas operan sobre el mismo dominio y comparten `recipesApi`, `types.ts` y utilidades como `formatPrepTime`. Mantenerlas juntas reduce duplicación y es coherente con la arquitectura feature-based existente.

### 4. Navegación con `<Link>` en RecipeCard

**Decisión**: Envolver el contenido de `RecipeCard` con `<Link to={/recipes/${recipe.id}}>` de React Router.

**Alternativas consideradas**:
- **`onClick` + `useNavigate`**: Funcional pero pierde beneficios de accesibilidad de `<a>` (hover preview, abrir en nueva pestaña, etc.).

**Razón**: `<Link>` renderiza un `<a>` semántico, es más accesible y permite comportamientos estándar del navegador (click derecho → abrir en nueva pestaña).

## Risks / Trade-offs

- **Nueva dependencia (`react-router-dom`)** → Es una dependencia estándar y madura del ecosistema React. El riesgo es mínimo.
- **Pérdida de estado de filtros al navegar** → React Router mantiene los componentes montados según la configuración de rutas. Los filtros del listado se mantienen en el estado del componente mientras no se desmonte. Si se requiere persistencia más robusta, se puede mover a query params en el futuro.
- **Carga individual de receta vs cache** → RTK Query cachea por defecto. Si el usuario viene del listado, la receta ya puede estar en cache del endpoint `getRecipes`, pero `getRecipeById` hará su propio request. Esto es aceptable por simplicidad y porque garantiza datos frescos.
