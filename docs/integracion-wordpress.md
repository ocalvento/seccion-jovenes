# Integración con WordPress sin reemplazar la infraestructura

## Alcance implementado

Este repositorio conserva la vista estática local. La portada y Jóvenes comparten navegación, estilos y JavaScript. `npm run build` genera `index.html` desde `templates/home.html` y el inventario `data/institutional.json`, y valida enlaces, recursos y conservación de contenidos. El 28 de octubre se creó una copia de pruebas con WP STAGING y se guardó allí una primera adaptación de portada, Eventos y Novedades, además del formulario nativo WPForms ID 2549. Ver [alcance y pendientes de staging](adaptacion-wordpress-staging.md). No se cambió el dominio, DNS, hosting ni la portada pública. La gestión dinámica de eventos y la entrega por correo todavía requieren completar su integración y prueba.

## Camino recomendado

Mantener WordPress, Astra y los bloques Spectra que ya construyen la portada pública. Reproducir la disposición aprobada con bloques/patrones editables en una copia de pruebas del sitio. Reutilizar el logo y las imágenes de la biblioteca existente; no volver a subir duplicados si ya tienen un ID de adjunto.

Los tokens al inicio de `assets/styles.css`, las proporciones y los componentes son la referencia visual. No pegar el CSS completo sobre todo WordPress: acotarlo a una clase de la nueva portada (`.committee-home`) o mapearlo a estilos de bloque, para no afectar artículos y páginas existentes. El header y footer deben seguir administrándose desde Astra. Si se necesitan plantillas PHP o personalizaciones de tema, usar un tema hijo, sin editar Astra directamente: [documentación oficial](https://developer.wordpress.org/themes/advanced-topics/child-themes/).

La detección de Elementor en el generador no es una indicación para reconstruir la web en Elementor. Confirmar en el administrador qué editor posee cada página antes de intervenir. Tampoco se propone una arquitectura headless: agregaría una capa que este proyecto no necesita.

## Mapeo de contenidos y funciones

| Componente local | Destino propuesto en WordPress |
|---|---|
| Hero y atajos | Bloques editables de la portada; evento destacado seleccionado por el editor |
| Eventos, jornadas y actividades | Reutilizar la estructura existente y sus URLs. Revisar si son páginas, posts o un tipo de contenido antes de añadir campos |
| Calendario | Fecha civil, inicio/fin, modalidad, sede, expositores, programa, inscripción y estado. Render desde las mismas entradas de eventos, no una agenda duplicada |
| Novedades | Consulta de las entradas/categorías existentes, conservando archivos, permalinks y fechas |
| Autoridades e historia | Bloques de contenido y enlaces a los cinco PDF actuales. Evitar que cada tarjeta sea una página nueva innecesaria |
| Sponsors | Adjuntos actuales, nombre alternativo, destino autorizado, vigencia y orden. Mantener los 21 hasta revisión institucional |
| Jóvenes | Incorporar la página ya desarrollada como página editable; revisar el slug definitivo y redirecciones sólo si hace falta |
| Beneficios y convenios | Páginas/secciones administrables con vigencia, condiciones y contacto; no publicar acuerdos no confirmados |
| Asociate | Formulario nativo de WordPress con los 15 campos relevados como referencia; sin Google Forms |
| Acceso socios | Eliminado por indicación del usuario. No incorporar portal, enlace ni sección de consulta en esta versión |

Si el inventario demuestra que hace falta un tipo de contenido `evento`, registrarlo en un plugin de funcionalidad, no dentro del tema, para conservar los registros al cambiar de apariencia. No registrar otro tipo si ya existe uno equivalente. Ver [tipos de contenido de WordPress](https://developer.wordpress.org/plugins/post-types/registering-custom-post-types/).

## Formulario de asociación

Por corrección expresa del usuario, el formulario se construirá nativamente en WordPress. Google Forms sólo se utilizó como referencia para relevar sus 15 campos obligatorios, opciones de pago y texto de cuota social. Se retiraron tanto el enlace como el iframe y su cargador de la web local.

La maqueta actual usa controles HTML propios del sitio, agrupados en datos personales/contacto, actividad profesional, formación/presentación y cuota social. No guarda ni transmite datos; el botón de envío está deshabilitado y la limitación se informa antes de los campos. No equivale a un formulario instalado en WordPress.

En la copia de pruebas de WordPress: elegir el plugin de formularios compatible con lo ya instalado, recrear los mismos campos y condiciones, definir el receptor administrativo, agregar el aviso de privacidad aprobado y consentimiento, aplicar validación de servidor y protección antispam y comprobar la recepción y el mensaje de confirmación. El mensaje debe confirmar una solicitud recibida, no una admisión automática. Confirmar cuotas y beneficios antes de publicar. Matrícula/jurisdicción y áreas de interés quedan como recomendaciones opcionales, no requisitos incorporados.

## Pasos para puesta en producción

1. Acceder al administrador y a una copia de pruebas; inventariar plugins, campos de eventos, formularios, roles, URLs, editor por página y sistema de socios. Respaldar archivos y base de datos y comprobar restauración.
2. Confirmar las próximas jornadas con sus datos completos y los beneficios/convenios vigentes. El usuario aportó el flyer de la 39.ª Jornada: 13 de noviembre de 2026, Sofitel La Reserva Cardales, y el destino https://forms.gle/p5G7SKbHFKYKR9Ax8 para el botón «Inscripción y programa». No inventar horarios ni un programa independiente del enlace indicado.
3. Implementar el diseño aprobado sobre la copia conservando WordPress y sus contenidos. En la nueva agenda mostrar sólo los eventos de 2026, conforme a la corrección del usuario, sin alterar los documentos históricos ni la Sección Jóvenes. El sitio WordPress original no se modifica desde este repositorio.
4. Probar escritorio, tablet, móvil, menú/teclado, formularios/recepción, calendario, documentos y portales existentes. Revisar accesibilidad y rendimiento con el hosting real; no se informa un puntaje de Lighthouse que no se midió.
5. Conservar los metadatos y canonicals correctos que gestione WordPress. La vista local está marcada `noindex, nofollow`; retirar ese bloqueo sólo en la publicación aprobada y mantenerlo en staging. Incorporar Open Graph con URL/imagen absolutas del dominio real, sitemap y marcado de eventos sólo cuando haya datos confirmados.
6. Publicar dentro de la infraestructura actual tras revisar la versión concreta y su plan de reversión. Mantener dominio, URLs y archivos; si cambia una ruta, añadir la redirección puntual correspondiente.

No es necesario crear una nueva cuenta de hosting, mover el dominio o reemplazar el CMS para aplicar este diseño.
