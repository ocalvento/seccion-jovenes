# Traspaso — sitio del Comité de Abogados de Bancos

Fecha del traspaso: **1 de noviembre de 2026** (Buenos Aires).
Raíz de trabajo: `/Users/octavio/Documents/Seccion Joven`.

Este documento reúne el estado comprobado en archivos locales, Git, documentación y el historial de trabajo «Retomar la página web». El último trabajo documentado en WordPress es del **28 de octubre de 2026**. En esta preparación del traspaso no se ingresó nuevamente al administrador ni se modificó ningún sitio remoto; las versiones, configuraciones y cambios remotos indicados corresponden a ese relevamiento, no a una auditoría nueva del servidor.

Actualización de versionado del 01/11: por pedido posterior del usuario se prepara el commit y push del sitio y su documentación. Las menciones a trabajo sin commit describen el relevamiento anterior a esa operación; consultar Git para el estado posterior. Se agregó `.gitignore` para excluir credenciales/configuración local, documentos internos y renders del torneo, y capturas con sesión administrativa o identidad de cuenta. Esos materiales permanecen en la carpeta local y no acompañan el clon del repositorio. Los nombres y perfiles institucionales públicos del sitio sí se conservan.

## 1. Objetivo y alcance

Modernizar la web institucional del Comité de Abogados de Bancos de la República Argentina, conservando su identidad, contenidos y administración en WordPress. El proyecto empezó como una página de la Sección Jóvenes y evolucionó hacia una portada institucional completa, sin perder `/seccion-joven/`.

La portada prioriza actividades y calendario, la 39.ª Jornada de Derecho Bancario, información institucional, autoridades, documentos históricos, sponsors, Sección Jóvenes y solicitud de asociación. Se conservan los originales de marca y flyers, las 24 autoridades, los cinco enlaces a documentos históricos y los 21 sponsors.

La intención es terminar y revisar la adaptación en una copia de pruebas antes de publicarla en el dominio principal. La versión actual todavía requiere trabajo para que un editor pueda mantener toda la agenda desde contenidos administrables de WordPress.

## 2. Entornos y estado actual

| Entorno | Ubicación | Estado documentado |
|---|---|---|
| Producción | `https://abogadosdebancos.org.ar/` | Conserva la portada pública anterior. Se agregó la herramienta de staging y se creó la copia; el rediseño no se publicó aquí. |
| Administración de producción | `https://abogadosdebancos.org.ar/wp-admin/` | Se accedió con la sesión del usuario para relevar páginas, plugins y respaldos. |
| Copia de pruebas | `https://abogadosdebancos.org.ar/titan/` | Clon creado el 28/10 y luego modificado: Home, Eventos, Novedades, menú y formulario. Se comprobó protección mediante inicio de sesión de administrador. |
| Administración de pruebas | `https://abogadosdebancos.org.ar/titan/wp-admin/` | Lugar donde continuar la integración. No confundir con el administrador principal. |
| Prototipo local | Esta carpeta; vista previa en `http://127.0.0.1:4173/` | HTML/CSS/JS con portada generada, calendario y página de Jóvenes. El formulario local es una maqueta con envío deshabilitado. |
| Repositorio Git | `https://github.com/ocalvento/seccion-jovenes.git` | Existe `origin`, pero la evolución institucional está mayormente sin commit. No alcanza con clonar el remoto para recuperar el estado local actual. |

En staging están guardadas **Home ID 2489**, **Eventos ID 1716** y **Novedades ID 1714**. La página completa de Jóvenes sigue pendiente: el menú lleva provisionalmente a `https://abogadosdebancos.org.ar/titan/#jovenes`, una sección de la portada. Sus cuatro imágenes ya se subieron a staging y su contenido está exportado localmente.

La agenda principal contiene nueve actividades de 2026: ocho flyers aportados por el usuario y la 39.ª Jornada del **13 de noviembre**, en **Sofitel La Reserva Cardales**. En la última versión generada hay ocho actividades realizadas y una próxima. No reutilizar como estado actual los conteos de siete/dos del informe del 22/10.

## 3. Stack y hosting

### Desarrollo local

- HTML, CSS y JavaScript nativos; sin React, framework de interfaz ni dependencias npm declaradas.
- Node.js para generación, validación, exportación y pruebas; Python 3 para servir la vista previa.
- No hay instalación local completa de WordPress, PHP, base de datos ni tema propio en esta carpeta.
- `scripts/render-home.js` genera `index.html` desde `templates/home.html`, `templates/header.html`, `data/institutional.json` y `data/association-form.json`. También actualiza el encabezado compartido y versiones de assets en `seccion-joven/index.html`, preservando su contenido principal.
- `assets/calendar.js` trabaja con fechas civiles de `America/Argentina/Buenos_Aires`. Las tarjetas de realizadas/próximas se clasifican al generar los archivos; requieren regeneración con el paso del tiempo. El calendario calcula estados en el navegador.
- Las exportaciones WordPress incluyen HTML, CSS acotado a `.committee-home` y scripts dentro del contenido. No constituyen todavía una implementación completa con bloques visuales y consultas dinámicas al CMS.

### WordPress relevado

- WordPress **7.1.3**; Astra activo (versión pública relevada **4.14.1**).
- Spectra Legacy / Ultimate Addons for Gutenberg **2.20.5**.
- Elementor **3.35.4**, Timeline Block **2.0.0**, LiteSpeed Cache **7.9.2**, UpdraftPlus **1.26.14**, entre otros plugins instalados.
- WP STAGING **4.19.0**, instalado y activado por el usuario para crear la copia.
- WPForms Lite **2.0.3**: ya estaba instalado y desactivado en producción; se activó para el formulario **sólo en staging**.
- La portada vigente es **Home, ID 2489**. **Home 1, ID 1702**, es otra página, marcada como Elementor: no editarla por confundirla con la portada.

### Infraestructura

No se cambió dominio, DNS ni hosting. El relevamiento DNS del 28/10 devolvió `ns3.hostmar.com` y `ns4.hostmar.com`, documentados como infraestructura de Donweb. Es una pista, no una confirmación del proveedor contratado: puede haber revendedor o administración de DNS independiente. El usuario indicó que desconoce el proveedor. No hay acceso al panel del hosting, FTP/SSH o base de datos documentado en este proyecto; versiones de PHP/servidor, plan, capacidad y respaldos del proveedor quedan por confirmar.

El repositorio conserva antecedentes de publicación de Jóvenes y la captura `screenshots/github-root-preview.png`. No se verificó en este traspaso un despliegue actual de GitHub Pages ni su URL. GitHub no debe confundirse con el hosting del WordPress institucional.

## 4. Estructura de archivos

```text
Seccion Joven/
├── HANDOFF.md                    Este traspaso
├── README.md                     Arranque y descripción del prototipo
├── package.json                  Comandos locales
├── index.html                    Portada generada: editar la plantilla fuente
├── seccion-joven/index.html       Página completa local de Jóvenes
├── templates/
│   ├── home.html                 Plantilla de portada
│   └── header.html               Navegación compartida local
├── data/
│   ├── institutional.json        Agenda, autoridades, sponsors, fuentes y hashes
│   └── association-form.json     Referencia de los 15 campos y condiciones
├── assets/
│   ├── styles.css / main.js / calendar.js
│   ├── images/                   Cuatro recursos de Jóvenes
│   ├── institutional/            Marca, banners y flyer de la jornada
│   ├── sponsors/                 Logos oficiales
│   └── events-2026/              Ocho flyers de actividades
├── scripts/
│   ├── render-home.js            Generación local
│   ├── validate-static.js        Validación de estructura, enlaces y recursos
│   ├── export-wordpress.js       Genera HTML de las cuatro páginas para staging
│   └── export-wpforms.js          Genera importación de la solicitud
├── tests/calendar.test.js        Cuatro pruebas de calendario
├── wordpress/
│   ├── home-blocks.html / events-blocks.html / news-blocks.html
│   ├── young-blocks.html         Exportación preparada; página pendiente
│   ├── solicitud-wpforms.json    Estructura importable; no contiene solicitudes
│   ├── staging-media.json        URLs de adjuntos de /titan/ y formulario ID 2549
│   └── astra-additional.css      CSS anterior conservado y ajustes de staging
├── docs/                         Auditoría, integración, relevamiento y verificaciones
├── screenshots/                  Evidencia visual local y de WordPress
├── .git/                         Historial parcial del proyecto
├── crear_*padel*.py / crear_*paddle*.py
├── render-onepager-paddle*/ / render-propuesta-padel*/
└── render-resumen-ejecutivo-padel*/ y documentos DOCX/PDF/PNG
```

Los scripts Python, propuestas de torneo de pádel y directorios `render-*` son materiales paralelos de documentos, no componentes ni backups del sitio WordPress. No eliminarlos como parte del traspaso.

## 5. Copias y backups: qué existe y dónde

| Elemento | Fecha / ubicación | Alcance y límites |
|---|---|---|
| Clon WP STAGING creado durante el trabajo | 28/10/2026; `https://abogadosdebancos.org.ar/titan/`; carpeta `titan` en el servidor y tablas de prefijo `wpstg0_` | Clonación completada y luego editada. Está en la misma infraestructura; no es un respaldo externo ni una copia inmutable del sitio previo. No se dispone de la ruta absoluta del servidor. |
| Respaldo histórico de UpdraftPlus | 13/11/2023, visible en el administrador principal, con referencia a Google Drive | Figuraban base de datos, plugins, temas, subidas y otros archivos. No se comprobó restauración, descarga, integridad ni ruta/carpeta concreta en Drive. No había copias automáticas programadas en ese plugin según el relevamiento. |
| Copia de trabajo local | `/Users/octavio/Documents/Seccion Joven` | Prototipo, recursos, documentación, capturas y exportaciones. No contiene una copia completa de WordPress ni su base de datos. |
| Historial Git | `.git/` local y remoto `ocalvento/seccion-jovenes` | HEAD local `1b4f722` del 13/07/2026, rama `main`; la referencia local `origin/main` apunta al mismo commit. No se hizo fetch en este traspaso. Gran parte del trabajo posterior no está versionada. |
| Exportaciones reproducibles | `wordpress/` dentro de la raíz | HTML de páginas y esquema WPForms. No incluyen toda la configuración del sitio, menú, base de datos, adjuntos ni solicitudes recibidas. |
| Recursos y evidencia | `assets/`, `data/institutional.json`, `screenshots/` | Copias de imágenes utilizadas, fuentes/hashes y capturas. Los cinco documentos históricos siguen como enlaces remotos; no confundir los PDF del torneo con esos documentos. |

**No consta la ejecución de un backup nuevo completo con UpdraftPlus ni su descarga o envío remoto, y no se probó ninguna restauración.** No se encontraron archivos de respaldo `.zip`, `.sql`, `.gz`, `.wpress` o `.bak` dentro del proyecto. Esto no descarta copias que pueda tener el proveedor o el usuario fuera de esta carpeta. El historial también registra una descarga temporal de un esquema de formulario como referencia, sin una ubicación persistente documentada: usar la exportación reproducible `wordpress/solicitud-wpforms.json` para continuar.

En esta tarea se creó únicamente este documento; no se generó otro backup. Para trasladar el trabajo a otra herramienta, conservar la carpeta completa: **un clon del remoto omitiría archivos esenciales actualmente sin seguimiento**.

## 6. Cambios en el WordPress remoto

### Sitio principal / producción

Sí hubo cambios técnicos: el usuario instaló y activó WP STAGING 4.19.0; después se ejecutó la creación del clon `/titan/`, con archivos y tablas separados. Se omitió la telemetría opcional del asistente. No se creó un nuevo administrador ni un destino remoto.

No consta publicación del rediseño sobre la portada principal, cambio de sus menús/contenidos, activación de WPForms en producción, actualización del núcleo/tema, migración, restauración ni cambio de hosting/DNS. La frase «no se modificó el sitio publicado» en documentos iniciales se refiere al contenido/diseño y a esa etapa: no debe interpretarse como ausencia total de cambios posteriores, porque se agregó el plugin y el clon.

### Sólo en `/titan/`

- Se guardó el diseño adaptado en Home 2489, Eventos 1716 y Novedades 1714, conservando IDs y destinos existentes.
- Se reutilizó la biblioteca clonada, incluidos sponsors y documentos; se subieron los nueve flyers de 2026 y los cuatro recursos de Jóvenes.
- Astra mantiene el encabezado y pie. «Acceso socios» se reemplazó por «Asociate»; el menú móvil también ofrece esa acción. El duplicado del CTA se oculta en escritorio mediante CSS.
- Se agregó «Sección Jóvenes» al menú Primary antes de «Asociate», con destino provisional a `#jovenes` de la portada. Comprobado en escritorio y móvil, aunque el último turno del chat terminó por límite de uso después de guardar estos cambios.
- Se separaron **Inscripción** y **Programa** en dos botones en Home y Eventos. Por la última indicación del usuario, ambos apuntan por ahora a `https://forms.gle/p5G7SKbHFKYKR9Ax8`. No existe un programa independiente verificado.
- Se activó WPForms Lite y se creó/importó **Solicitud de ingreso al Comité, ID 2549**, integrada por shortcode. Son 15 campos obligatorios y tres opciones originales de pago; fecha de nacimiento como texto con máscara DD/MM/AAAA.
- Notificación a `administracion@abogadosdebancos.org.ar`, respuesta al correo del solicitante y confirmación de solicitud sujeta a revisión, sin admisión automática. No se cargaron datos reales ni se envió una solicitud de prueba.
- El CSS adicional conserva el previo y añade ajustes para CTA móvil y barra de administración; referencia en `wordpress/astra-additional.css`.

## 7. Decisiones que deben conservarse

- Mantener WordPress, Astra/Spectra e infraestructura actual. No se decidió migrar a otro CMS, framework, hosting, arquitectura headless o Elementor.
- Conservar Montserrat y paleta oficial: celeste `#8bbedc`, azul `#4696db`, textos `#333333`/`#4c4c4c`, fondo `#F3F6F6`. Reutilizar logos y banners originales, sin recrearlos ni recolorearlos.
- Preservar documentos históricos, autoridades, sponsors, archivo WordPress y contenido/imágenes de Jóvenes. La nueva agenda principal muestra sólo 2026; los cinco flyers antiguos se retiraron del inventario activo y assets institucionales por pedido del usuario, no se borró el archivo histórico de WordPress.
- Eliminar «Acceso socios» de la nueva versión; «Asociate» es la acción principal. No crear un portal de socios sin una decisión nueva.
- Asociación nativa en WordPress, **sin enlace ni iframe de Google Forms para la solicitud de ingreso**. El Google Form original quedó sólo como fuente del esquema en `data/association-form.json`. Esto es distinto del enlace de inscripción/programa de la jornada, que se conserva por indicación expresa.
- No añadir requisitos, convenios, beneficios, fechas, horarios o programa no confirmados. El año 2026 de la jornada se infirió por el contexto de los 60 años: el flyer no imprime el año junto a la fecha; está registrado en los datos.
- Mantener header/footer administrados en Astra y estilos del contenido acotados. Si hicieran falta personalizaciones PHP, la guía propone tema hijo o plugin de funcionalidad, sin editar Astra directamente.
- Prototipo con `noindex, nofollow`; mantener protegido y fuera de indexación el staging. Revisar indexación y metadatos al preparar producción.

## 8. Cómo continuar localmente y validaciones

Desde la raíz, con Node.js/npm y Python 3 disponibles:

```sh
npm run dev
```

Para generar o validar cambios:

```sh
npm run build
npm run lint
npm test
node scripts/export-wpforms.js
node scripts/export-wordpress.js
```

No hay dependencias npm declaradas que instalar. `build` reescribe la portada y elementos compartidos de Jóvenes; editar las fuentes antes de regenerar. Para actualizar exportaciones, ejecutar el generador local antes de `export-wordpress.js`. Los exportadores escriben archivos locales: **no suben ni sincronizan nada con WordPress**. Cambiar el JSON de WPForms tampoco actualiza un formulario ya importado en el sitio.

El **01/11/2026** se ejecutaron `npm run lint` y `npm test`: validación estática aprobada y **4/4 pruebas** aprobadas. No se regeneraron archivos ni exportaciones durante este traspaso.

Las verificaciones previas documentan build aprobado, revisión responsive local y en staging, calendario, imágenes, menú y validación de los 15 campos vacíos. Capturas útiles: `wp-staging-creado.png`, `wp-portada-2026.png`, `wp-portada-mobile.png`, `wp-asociate-mobile.png`, `wp-sponsors-2026.png`, `wp-inscripcion-programa-separados.png` y `wp-menu-seccion-jovenes.png`, todas en `screenshots/`. No hay certificación integral de accesibilidad, Lighthouse ni prueba de recepción de correo.

## 9. Pendientes para la siguiente herramienta

1. **Preservar el trabajo local.** Copiar íntegramente esta carpeta y revisar los cambios antes de incorporarlos a Git. Actualmente hay archivos modificados y numerosos archivos sin seguimiento, incluidos datos, plantillas, scripts, recursos y exportaciones necesarios.
2. Retomar sesión en el administrador de **`/titan/`** y contrastar su contenido con los archivos exportados. Las sesiones del navegador de la herramienta anterior no se transfieren con este directorio.
3. Crear la página completa de Jóvenes e integrar `wordpress/young-blocks.html`; acordar slug, verificar sus flyers y actualizar menú/enlaces. El intento anterior de abrir «Añadir página» fue rechazado por la revisión automática del navegador por URL inválida; no es evidencia de un error de WordPress ni de falta de permisos. No quedó creada la página.
4. Completar el mantenimiento visual en bloques y la agenda desde contenidos administrables. Inspeccionar primero la estructura real de eventos/posts existente; reutilizarla antes de crear nuevos tipos. Calendario, tarjetas y destacados deben compartir una fuente de datos.
5. Completar y probar el formulario: recepción con un destino de prueba acordado, correo saliente, validación, antispam, aviso de privacidad/consentimiento y tratamiento/persistencia de solicitudes. Verificar cuotas y beneficio de Jóvenes con la administración. No asumir que WPForms Lite mantiene un archivo administrativo de entradas.
6. Confirmar contenido vigente: autoridades/sponsors, condiciones de asociación y datos de la jornada. Si el Comité aporta un destino específico para «Programa», actualizarlo; actualmente ambos botones usan el mismo enlace por la instrucción recibida.
7. Identificar proveedor y responsable del hosting; obtener respaldo completo reciente, fuera del entorno de trabajo, y comprobar restauración. Verificar también disponibilidad/estado del respaldo histórico de Drive.
8. Revisar accesibilidad, teclado, móvil, rendimiento, caché y comportamiento de scripts/shortcode en WordPress. Confirmar protección e indexación de staging.
9. Preparar una versión concreta para publicar y un procedimiento de reversión. Revisar URLs de imágenes/enlaces que hoy contienen `/titan/`, menú, IDs, formulario y opciones de Astra. La guía deja pendiente definir la transferencia: **no se configuró ni probó un push a producción con WP STAGING gratuito**.
10. Publicar sólo cuando se revise y autorice esa versión. Conservar URLs, archivos históricos y metadatos; retirar el `noindex` correspondiente en producción y mantenerlo en pruebas. Este pedido de handoff no realiza ni autoriza por sí mismo una publicación.

## 10. Riesgos y límites principales

- **Pérdida de trabajo:** el remoto y el último commit son anteriores al rediseño; la carpeta local es esencial para recuperar el trabajo completo.
- **Recuperación no comprobada:** staging comparte servidor y ya fue editado; no reemplaza un backup externo reciente. No hay restauración probada.
- **Confusión de entornos/páginas:** mismo dominio, IDs clonados y dos páginas llamadas Home/Home 1. Comprobar `/titan/` y el ID antes de guardar.
- **Datos personales y entrega:** la solicitud recoge DNI, domicilio y otros datos; la recepción, persistencia y condiciones de privacidad todavía no están certificadas.
- **Contenido que envejece:** las tarjetas se fijan al generar; el año de la jornada fue inferido y las cuotas provienen de un relevamiento anterior. Los informes de octubre describen etapas, no siempre el último estado.
- **Dependencia de staging:** los HTML exportados contienen URLs absolutas de `/titan/` y el ID 2549. Copiarlos sin revisar puede dejar recursos, navegación o formularios apuntando a pruebas.
- **Edición y compatibilidad:** HTML/CSS/JS incrustados no equivalen a bloques visuales completos; permisos, filtrado de scripts, caché o cambios de tema/plugins pueden afectar el resultado.
- **Información de infraestructura incompleta:** no se confirmó proveedor contractual, panel, recursos disponibles, respaldos externos ni versiones del servidor. No hay credenciales incluidas en este documento.

## 11. Fuentes para ampliar

- `docs/adaptacion-wordpress-staging.md`: alcance de la adaptación, IDs, verificaciones y pendientes del 28/10.
- `docs/relevamiento-wordpress-admin.md`: inventario, backup histórico, indicio de hosting y creación del clon.
- `docs/integracion-wordpress.md`: estrategia de integración, mapeo de contenidos y publicación. Algunas referencias a un botón combinado son anteriores a la decisión final de separarlo.
- `docs/auditoria-institucional.md`: identidad exacta, inventario, conservación y decisiones iniciales.
- `docs/verificacion.md`: pruebas de etapas anteriores; las primeras referencias a mailto/Google Forms fueron reemplazadas por la decisión final de formulario nativo.
- `data/institutional.json`, `data/association-form.json`, `wordpress/staging-media.json`: fuentes y datos reproducibles.

Ante diferencias entre textos de etapas anteriores, tomar como referencia las decisiones finales resumidas aquí y verificar el estado real de staging antes de cambiarlo.
