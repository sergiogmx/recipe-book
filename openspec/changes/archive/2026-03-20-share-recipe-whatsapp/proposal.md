## Why

Los usuarios no tienen forma de compartir recetas con amigos o familiares directamente desde la aplicación. WhatsApp es la plataforma de mensajería más usada en Latinoamérica, por lo que agregar un botón de compartir por WhatsApp en la página de detalle es la forma más directa de habilitar esta funcionalidad.

## What Changes

- Nuevo botón "Compartir por WhatsApp" en la página de detalle de receta.
- Al presionarlo, abre WhatsApp (web o app) con un mensaje pre-formateado que incluye nombre de la receta, categoría y enlace a la página de detalle.
- Se usa la API de WhatsApp (`https://wa.me/?text=...`) sin dependencias adicionales.

## Capabilities

### New Capabilities

- `share-whatsapp`: Botón de compartir receta por WhatsApp desde la página de detalle con mensaje pre-formateado.

### Modified Capabilities

- `recipe-detail`: Se agrega un botón de compartir en la sección de metadata de la receta.

## Scope

**IN scope:**
- Botón de compartir por WhatsApp en la página de detalle.
- Mensaje pre-formateado con nombre, categoría y enlace.
- Funciona en desktop (abre WhatsApp Web) y móvil (abre app de WhatsApp).

**OUT of scope:**
- Compartir por otras redes sociales (Facebook, Twitter, etc.).
- Acortar URLs.
- Tracking o analytics de compartidos.
- Compartir desde el listado o las tarjetas.

## Impacto en features existentes

- **`src/features/recipes/RecipeDetailPage.tsx`** — se agrega botón de compartir en la zona de metadata/acciones.

## Impact

- **Archivos nuevos:** Ninguno (la funcionalidad es lo suficientemente pequeña para vivir en el componente existente).
- **API:** No requiere endpoints adicionales.
- **Dependencias:** Ninguna nueva. Usa la API web estándar de WhatsApp.
