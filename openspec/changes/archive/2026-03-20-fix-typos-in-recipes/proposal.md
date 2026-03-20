## Why

Las recetas en `db.json` tienen inconsistencias en el formato de unidades de medida de ingredientes. Algunas usan abreviaciones pegadas al número (`500ml`, `200g`, `1kg`) mientras que otras usan unidades escritas con espacio (`1 taza`, `2 cucharadas`). Esto afecta la consistencia visual de la app.

Adicionalmente, hay una receta de prueba (id: 11, "Café Monono") con datos incompletos y una imagen no relacionada que debería eliminarse.

## What Changes

- Normalizar unidades abreviadas en ingredientes: agregar espacio entre número y unidad (`500ml` → `500 ml`, `200g` → `200 g`, `1kg` → `1 kg`).
- Eliminar receta de prueba "Café Monono" (id: 11) del `db.json`.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

Ninguna — es un cambio de datos, no de comportamiento.

## Scope

**IN scope:**
- Normalizar formato de unidades abreviadas (ml, g, kg) en ingredientes.
- Eliminar receta de prueba con datos inválidos.

**OUT of scope:**
- Cambiar unidades escritas ("tazas", "cucharadas") a abreviaciones o viceversa.
- Modificar nombres de recetas, descripciones o pasos.
- Cambios en código fuente.

## Impact

- **Archivo modificado:** `db.json` — correcciones en ingredientes de recetas 1, 2, 4, 5, 7, 8, 10; eliminación de receta 11.
- **Sin impacto en código** — solo datos del mock.
