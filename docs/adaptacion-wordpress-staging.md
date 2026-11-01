# Adaptación en la copia de pruebas — 28 de octubre de 2026

Destino: https://abogadosdebancos.org.ar/titan/. Requiere la sesión de administrador existente. No se sustituyó la portada del dominio público.

## Guardado y verificado

- Portada **Home, ID 2489**: diseño aprobado adaptado al contenedor de Astra. Se reutilizaron los recursos de la biblioteca clonada, los 21 sponsors y los cinco documentos históricos. Se subieron los nueve flyers originales de 2026 a la biblioteca de la copia.
- **Eventos, ID 1716**: jornada destacada, calendario, ocho actividades realizadas y una próxima al 28 de octubre de 2026.
- **Novedades, ID 1714**: próxima jornada de noviembre, con su flyer original. Se conservaron los IDs y destinos existentes del menú.
- Encabezado administrado desde Astra: «Acceso socios» reemplazado por «Asociate», con destino a la solicitud. El menú Primary incluye además el acceso para móviles; su duplicado se oculta en escritorio porque Astra ya muestra el CTA.
- Se agregó «Sección Jóvenes» al menú Primary, antes de «Asociate», con destino a `https://abogadosdebancos.org.ar/titan/#jovenes`. Se comprobó en escritorio y móvil. Es un acceso a la sección de la portada; la página completa de Jóvenes sigue pendiente. Evidencia: `screenshots/wp-menu-seccion-jovenes.png`.
- **WPForms Lite 2.0.3** activado sólo en staging. Formulario **ID 2549**, «Solicitud de ingreso al Comité», importado con los 15 campos obligatorios y las tres opciones originales de pago. Está incorporado a Asociate mediante shortcode. Fecha de nacimiento usa texto con máscara DD/MM/AAAA en esta edición Lite.
- Notificación configurada a `administracion@abogadosdebancos.org.ar`; respuesta al correo introducido por el solicitante. Confirmación de solicitud sujeta a revisión, sin admisión automática. No se introdujeron datos reales ni se envió un mensaje de prueba.

## Forma de integración

Se mantuvo Astra, el editor de bloques y los plugins instalados. No hay tema nuevo, acceso directo a la base de datos, API autenticada fuera del navegador ni cambio de hosting. Los componentes HTML ya aprobados se exportan como bloques HTML agrupados, con estilos acotados a `.committee-home` y recursos absolutos de la biblioteca de WordPress. Header y footer continúan en Astra.

Esta primera adaptación conserva la composición del prototipo. Las tarjetas y el JSON del calendario siguen cargados en el contenido de las páginas: **todavía no son una consulta dinámica de entradas de eventos**, ni todos los componentes se editan mediante controles visuales de bloques nativos. Antes de entregar el mantenimiento a editores, falta completar ese mapeo. El calendario calcula el estado por fecha en el navegador; las tarjetas de próximas/realizadas proceden del generador y requieren actualizar la página al cambiar la agenda.

Archivos reproducibles:

- `scripts/export-wordpress.js`: exporta portada, Eventos, Novedades y Jóvenes sin conectarse al sitio.
- `scripts/export-wpforms.js`: prepara los 15 campos para importación nativa.
- `wordpress/staging-media.json`: URLs de los adjuntos e ID del formulario; sin credenciales.
- `wordpress/astra-additional.css`: CSS anterior conservado, más ajustes del CTA móvil y de la barra de administración.

## Comprobaciones realizadas

- Guardado confirmado por WordPress en las tres páginas.
- Calendario: noviembre al abrir, paso a octubre y selección del encuentro del 27 de octubre.
- Formulario integrado: 15 controles obligatorios; envío vacío muestra los 15 errores, sin enviar una solicitud. Opciones de pago visibles y condiciones originales conservadas.
- Carga del flyer principal y de los 21 sponsors comprobada en el navegador. Sin imágenes fallidas entre las cargadas.
- Sin desbordamiento horizontal en escritorio de 1280 px y móvil de 390 px. Menú móvil incluye Asociate y conduce a la sección correcta.
- Capturas: `screenshots/wp-portada-2026.png`, `screenshots/wp-portada-mobile.png`, `screenshots/wp-asociate-mobile.png`, `screenshots/wp-sponsors-2026.png`.

No se certificó todavía la entrega por correo, la persistencia de solicitudes ni una auditoría completa de accesibilidad/rendimiento. WPForms Lite no debe presentarse como un archivo administrativo de solicitudes sin comprobar sus capacidades y la recepción prevista.

## Pendientes

1. Crear la página de Jóvenes e incorporar `wordpress/young-blocks.html`, preservando sus flyers. Los cuatro recursos ya se subieron; el contenido local se mantiene. Una navegación automática a «Añadir página» fue rechazada por la revisión de seguridad del navegador por URL inválida; se pidió al usuario abrir esa pantalla. No se intentó eludir el bloqueo. Mientras tanto, la portada ofrece el contacto de Jóvenes.
2. Completar la edición visual y la gestión de eventos desde contenidos administrables de WordPress.
3. Probar la recepción de una solicitud con un destino de prueba acordado, revisar privacidad y confirmar cuotas antes de abrir el formulario al público.
4. Revisar la versión concreta y el procedimiento de reversión antes de publicar sobre el sitio principal. WP STAGING gratuito no implica transferencia automática a producción.
