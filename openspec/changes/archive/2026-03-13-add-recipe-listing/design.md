## Context

La aplicación Recipe Book tiene un shell mínimo (`App.tsx` con un título estático) y un Redux store vacío. La API mock (JSON Server) ya está configurada con 10 recetas en `db.json`, cada una con: id, name, description, ingredients, steps, category, difficulty, prepTime e imageUrl. Se necesita construir el primer feature real: el listado de recetas.

## Goals / Non-Goals

**Goals:**
- Implementar data fetching de recetas usando RTK Query como el patrón estándar del proyecto
- Mostrar las recetas en un grid responsive de cards con la información clave
- Manejar correctamente estados de carga y error
- Establecer la estructura de carpetas `features/recipes/` como referencia para futuros features

**Non-Goals:**
- Filtrado o búsqueda de recetas (será un feature posterior)
- Vista de detalle de receta individual
- Paginación (10 recetas no la requieren)
- CRUD de recetas (solo lectura)

## Decisions

### 1. RTK Query API Slice en `features/recipes/`

Crear `recipesApi.ts` dentro del feature en lugar de una carpeta global de APIs.

**Alternativas consideradas:**
- API slice global en `src/store/api.ts` — descartado porque el proyecto usa arquitectura por dominio (`features/`), y colocar el API slice junto al feature mantiene la cohesión.

**Rationale:** Cada feature encapsula su propio data fetching. Si en el futuro se necesita un `baseApi` compartido, se puede extraer entonces.

### 2. Tipos TypeScript junto al API slice

Definir la interfaz `Recipe` en un archivo `types.ts` dentro de `features/recipes/`.

**Rationale:** Los tipos del dominio viven con el feature. Evita un directorio global de tipos que se vuelve un cajón de sastre.

### 3. Grid responsive con Tailwind CSS

Usar grid de Tailwind con breakpoints: 1 columna en móvil, 2 en tablet, 3 en desktop.

**Alternativas consideradas:**
- CSS Grid manual — descartado, Tailwind ya provee utilidades de grid y es el estándar del proyecto.

### 4. Estructura de componentes

```
src/features/recipes/
├── RecipesPage.tsx       # Página contenedora (fetch + layout)
├── RecipeCard.tsx         # Card individual de receta
├── recipesApi.ts          # RTK Query API slice
└── types.ts               # Interfaces del dominio
```

**Rationale:** Separar la card como componente propio permite reutilizarla en futuras vistas (búsqueda, favoritos, etc.).

## Risks / Trade-offs

- **[Imágenes placeholder]** → Las recetas usan URLs de `placehold.co`. No se necesita manejo de fallback complejo ahora, pero el componente debe manejar error de carga de imagen graciosamente.
- **[Sin paginación]** → Con 10 recetas no es problema. Si la API crece, se necesitará paginación. Mitigación: el endpoint RTK Query es fácil de extender con params.
- **[Textos en español]** → La UI y los datos están en español. No se implementa i18n por ahora.
