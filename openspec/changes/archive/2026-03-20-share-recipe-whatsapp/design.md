## Context

La página de detalle de receta (`RecipeDetailPage.tsx`) muestra la información completa de una receta. Se necesita agregar un botón que permita compartir la receta por WhatsApp usando la API web de WhatsApp (`https://wa.me/`). Es un cambio contenido en un solo archivo sin dependencias nuevas.

**Estado actual:**
- `RecipeDetailPage.tsx` muestra badges de metadata (categoría, dificultad, tiempo) seguidos de descripción, ingredientes y pasos.
- No existe funcionalidad de compartir.

## Goals / Non-Goals

**Goals:**
- Agregar botón de compartir por WhatsApp en la página de detalle.
- Mensaje pre-formateado con nombre, categoría y enlace.
- Funcional en desktop y móvil.

**Non-Goals:**
- Compartir por otras redes sociales.
- Componente genérico de "share" reutilizable.
- Tracking de compartidos.

## Architecture Decisions

### 1. Usar `https://wa.me/?text=` directamente

**Decisión:** Construir la URL de WhatsApp usando `https://wa.me/?text={encodedMessage}` y abrirla con `window.open` en una nueva pestaña.

**Alternativas consideradas:**
- Web Share API (`navigator.share`) → No todos los navegadores desktop la soportan; limita la experiencia a WhatsApp específicamente.
- Librería de compartir (react-share) → Dependencia innecesaria para un solo botón.

**Razón:** La URL `wa.me` es la API oficial de WhatsApp, funciona en todos los navegadores y dispositivos, y no requiere dependencias. En móvil abre la app directamente, en desktop abre WhatsApp Web.

### 2. Construir el enlace con `window.location.origin`

**Decisión:** Usar `${window.location.origin}/recipes/${recipe.id}` para generar el enlace de la receta en el mensaje.

**Alternativas consideradas:**
- URL hardcodeada → No funciona en diferentes entornos (dev, staging, prod).
- `window.location.href` → Podría incluir query params no deseados.

**Razón:** `window.location.origin` genera la base URL correcta para cualquier entorno.

### 3. Inline en RecipeDetailPage sin componente separado

**Decisión:** Agregar el botón y la función helper directamente en `RecipeDetailPage.tsx`.

**Alternativas consideradas:**
- Componente `ShareWhatsAppButton` separado → Over-engineering para un solo botón con lógica trivial.

**Razón:** La lógica es una función de 3-4 líneas. Extraer un componente agrega complejidad sin beneficio. Si en el futuro se agregan más opciones de compartir, se puede refactorizar entonces.

## Archivos

**Nuevos:** Ninguno.

**Modificados:**
- `src/features/recipes/RecipeDetailPage.tsx` — agregar botón de compartir y función para construir la URL de WhatsApp.

## Risks / Trade-offs

- **[WhatsApp no instalado en desktop]** → `wa.me` redirige a WhatsApp Web, que funciona sin app instalada. Sin riesgo.
- **[Caracteres especiales en nombre/categoría]** → Se usa `encodeURIComponent` para codificar el mensaje. Mitigación directa.
- **[URL de la receta cambia]** → El enlace se genera dinámicamente con `window.location.origin`, por lo que se adapta al entorno.
