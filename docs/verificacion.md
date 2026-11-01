# Verificación de la revisión local

21 de octubre de 2026. No se modificó ni publicó el sitio WordPress.

- `npm run build`: portada generada y validación estática aprobada. Se verifican archivos, títulos, h1 único, IDs, destinos locales, anclas entre páginas, textos alternativos, conservación de las 24 autoridades, cinco PDF y 21 sponsors, y hashes de los 30 recursos originales.
- `npm test`: cuatro pruebas aprobadas. Cubren cambio de fecha en Buenos Aires cerca de medianoche UTC, separación pasado/futuro, años bisiestos, alineación de días y búsqueda en el archivo de eventos.
- `git diff --check`: sin errores de espacios.
- Revisión en navegador de escritorio (1280 px). Vistas de 768, 375 y 320 px comprobadas mediante iframes locales con medición de ancho: sin desborde horizontal. Jóvenes también verificado a 375 y 768 px.
- Menú móvil: abrir, mostrar las secciones y cerrar mediante Escape, con estado ARIA y retorno de foco al botón.
- Calendario: cambio a marzo de 2024 y selección del 21 de marzo. Muestra «Acciones colectivas de consumidor» como archivo, no como próxima actividad. Octubre de 2026 muestra el estado vacío correspondiente a la fuente relevada.
- Asociación: datos ficticios, consentimiento y preparación del `mailto:` correctos. No se abrió el cliente de correo ni se envió una solicitud.
- Recursos: revisión visual del logo institucional y de la grilla completa de sponsors sin recolorear, reemplazar por texto ni alterar sus proporciones.

Capturas guardadas en `screenshots/comite-home-actualizada.png`, `screenshots/comite-sponsors-originales.png` y `screenshots/comite-responsive-320-768.png`.

No se ejecutó una certificación integral de accesibilidad ni una medición Lighthouse. No se probó un backend WordPress, entrega de correo, inicio de sesión de socios ni datos privados, ya que esta versión no está conectada a ellos. La portada mantiene `noindex, nofollow` hasta su integración aprobada.

## Actualización de asociación con formulario oficial

Se verificaron los 15 campos obligatorios y la segunda sección de cuota/forma de pago desde el esquema público del formulario aportado por el usuario. Build, enlaces y sintaxis JavaScript aprobados. Se comprobó en navegador la apertura de la integración y la carga del Google Form con las preguntas reales. No se completó ni envió ninguna respuesta y no se modificó el formulario remoto. Se eliminó la preparación de correos del prototipo anterior. Captura: `screenshots/comite-formulario-oficial.png`.

## Agenda 2026 — actualización del 22 de octubre

Ocho flyers originales aportados por el usuario se sumaron al de la 39.ª Jornada: nueve actividades en total. Build, cuatro pruebas de calendario, enlaces y hashes aprobados. Se comprobó que hay siete tarjetas realizadas y dos próximas a esta fecha, ninguna actividad anterior a 2026 y que el contenido de `main` de la Sección Jóvenes es idéntico al previo. Se retiraron los cinco flyers antiguos de eventos y novedades del inventario activo y de assets/institutional; no se tocaron archivos de Downloads ni los recursos de Jóvenes. En navegador se verificaron el 27 de octubre en el calendario y los enlaces a los flyers locales de 2026.
