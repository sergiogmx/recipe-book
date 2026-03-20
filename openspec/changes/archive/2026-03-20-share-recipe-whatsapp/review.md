# Pre-Implementation Review

## Security
- [ ] La URL de WhatsApp se construye con `encodeURIComponent` para prevenir inyección de contenido en el mensaje
- [ ] El enlace usa `https://wa.me/` (HTTPS) para evitar redirecciones inseguras
- [ ] `window.open` con `_blank` debe incluir `noopener` para prevenir acceso al `window.opener`

## Performance
- [ ] No se agregan dependencias nuevas — impacto en bundle size: cero
- [ ] La función de construir la URL es síncrona y trivial — sin impacto en rendering
- [ ] No se hacen llamadas adicionales al API

## Accessibility
- [ ] El botón debe tener texto descriptivo visible ("Compartir por WhatsApp")
- [ ] Incluir `aria-label` si el botón usa icono además de texto
- [ ] El botón debe ser alcanzable por teclado (elemento `<a>` o `<button>` nativo)
- [ ] Asegurar contraste suficiente del botón contra el fondo (verificar ratio WCAG AA)

## Testing
- [ ] Verificar que el mensaje contiene nombre de receta, categoría y URL correcta
- [ ] Verificar que caracteres especiales (acentos, ñ, emojis) se codifican correctamente
- [ ] Verificar que el botón no aparece durante estados de carga o error
- [ ] Probar en móvil que abre la app de WhatsApp
- [ ] Probar en desktop que abre WhatsApp Web en nueva pestaña

## Notes
- El cambio es de bajo riesgo: un solo archivo modificado, sin estado, sin API calls.
- Considerar agregar `rel="noopener noreferrer"` si se implementa como enlace `<a>`.
