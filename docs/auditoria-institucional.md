# Auditoría comparativa — Comité de Abogados de Bancos

Relevamiento público: 21 de octubre de 2026, Buenos Aires. Referencias: [Inicio](https://abogadosdebancos.org.ar/), [Eventos](https://abogadosdebancos.org.ar/eventos/) y [Novedades](https://abogadosdebancos.org.ar/novedades/). No se accedió al administrador, al servidor ni a datos privados.

## Tecnología comprobada antes de modificar

- Producción: WordPress 7.1.3, tema Astra 4.14.1, Spectra/Ultimate Addons for Gutenberg 2.20.5, slider Swiper y bloque Cool Timeline. El generador también declara Elementor 3.35.4; eso no demuestra que la portada esté construida con Elementor. Sus clases y estilos públicos corresponden a Astra y Spectra.
- Proyecto: HTML estático, CSS y JavaScript nativos. `package.json` sólo ejecuta un validador de archivos. No hay React, PHP, base de datos, tema WordPress ni integración CMS. La raíz era una redirección a `/seccion-joven/`.
- Las portadas mostradas previamente en el chat son propuestas independientes: no habían modificado el proyecto. Incluían colores aproximados, sponsors tipográficos y fechas ilustrativas, inadecuados como versión institucional definitiva.
- Decisión: evolucionar los archivos actuales; convertir la redirección raíz en la portada institucional y conservar la página de Jóvenes, sus imágenes y contenidos. No instalar un framework ni migrar alojamiento.

## Identidad exacta, obtenida del CSS publicado

| Token Astra | Valor exacto | Uso observado |
|---|---|---|
| `--ast-global-color-0` | `#8bbedc` | Celeste institucional |
| `--ast-global-color-1` | `#4696db` | Azul de enlaces y acentos |
| `--ast-global-color-2` | `#333333` | Texto/controles oscuros |
| `--ast-global-color-3` | `#4c4c4c` | Cuerpo y títulos |
| `--ast-global-color-4` | `#F3F6F6` | Fondo suave |
| `--ast-global-color-5` | `#FFFFFF` | Fondo principal |
| `--ast-global-color-6` | `#000000` | Negro auxiliar |
| `--ast-global-color-7` | `#4B4F58` | Gris auxiliar |
| `--ast-global-color-8` | `#a3a3a3` | Bordes/controles secundarios |

No confundir estos tokens con los colores rasterizados de los banners y del logo. Se reutilizan los archivos originales completos, sin recolorearlos. El menú usa además `#2f3034`.

Montserrat, pesos 400, 600 y 700. Escritorio: cuerpo 16 px/1.6, h1 48 px/1.2, h2 40 px/1.2, h3 32 px/1.2; ajustes de tablet 36/30/25 px y móvil 32/26/22 px. El tema aumenta el cuerpo móvil a 17 px. Menú 13 px, peso 600, mayúsculas y padding horizontal 20 px. Logotipo horizontal de 250 × 53 px, con fuente oficial de mayor resolución 713 px.

Header blanco fijo, alturas declaradas de 100 px y 80 px según breakpoint. CSS adicional compensa con 80/100/150 px de padding superior. La adaptación usa header sticky en flujo para evitar compensaciones frágiles y mantiene el logo, el menú y las acciones.

Contenedor Astra declarado de 1920 px; banner con contenido interior de 1024 px, padding de escritorio 70 px vertical/60 px horizontal, 20 px en móvil. Slider mínimo 320 px. Botones rectangulares de borde fino, mayúsculas y espaciado de letras; flechas circulares de 46 px. Footer simple con email, LinkedIn y copyright de 14 px. La nueva grilla limita la lectura a 1180 px y usa espacios de 8/16/24/32/48/72 px: una decisión de modernización, no medidas atribuidas al original.

## Inventario y conservación

| Área | Original | Desarrollo anterior | Resolución |
|---|---|---|---|
| Marca | Logo oficial «60 años» | Logo remoto en Jóvenes; aproximaciones en algunas propuestas | Logo oficial local, sin redibujarlo |
| Hero | Tres banners originales: eventos, asociación, sponsors | Foto verde en Jóvenes; geometría azul aproximada en propuestas | Se reutiliza el banner azul original de asociación, conservando su gráfica y colores; las tres acciones siguen visibles fuera de un carrusel automático |
| Menú | El Comité, Novedades, Eventos, acceso socios | Menú similar, acceso `#` | Inicio y Jóvenes integrados; Asociate principal. Acceso socios eliminado por indicación posterior del usuario |
| Actividades | Archivo público 2022–2024, más reciente 21/03/2024 | Agenda de Jóvenes con 16/07/2026 marcado «Próximo» | Archivo original enlazado y calendario por fecha; no inventar próximas jornadas; corregir estado vencido de Jóvenes |
| Novedades | Dos publicaciones de 2023 | Ausentes de propuestas | Recuperar ambas con fecha visible y enlaces originales, sin anunciar promociones vencidas como vigentes |
| Autoridades | 24 personas, cargos y perfiles | Ausentes o sólo un enlace | Conservar nómina completa y perfiles, incluida fiscalización |
| Historia | Cinco documentos PDF | Ausentes o enlace demostrativo | Conservar los cinco destinos originales |
| Sponsors | 21 imágenes oficiales | Cinco nombres tipográficos | Recuperar las 21 imágenes; grilla accesible sin logos ocultos en carrusel |
| Asociación | Email con asunto/cuerpo | Formulario demostrativo sin envío | Formulario con preparación explícita de correo, hasta integrar un formulario WordPress |
| Acceso socios | `href="#"`, sin portal comprobable | Botón eliminado en una iteración | Eliminado de la nueva versión por indicación expresa del usuario; no se modifica el sitio original |

La entidad conserva su texto institucional completo. Se mantienen enlaces a los archivos íntegros de eventos y novedades: las tarjetas destacadas no sustituyen ni borran publicaciones. Los recursos exactos y su procedencia se registran en `data/institutional.json`.

## Criterios de implementación

1. Mantener Montserrat, paleta, banners y logos oficiales. Evitar logotipos escritos como texto, tipografía serif y tonos marinos/verdosos inventados.
2. Home con actividades primero; no publicar una fecha, sede, expositores o inscripción que no estén confirmados en las fuentes.
3. Separar calendario futuro y archivo: una actividad vencida no puede figurar como próxima. Calcular fechas civiles en `America/Argentina/Buenos_Aires`.
4. Mantener todos los documentos y autoridades. Usar disclosures accesibles cuando ayudan a reducir el largo de la portada, sin omitir contenido.
5. Incluir Jóvenes, beneficios y convenios como extensión; no inventar acuerdos, descuentos ni condiciones de asociación.
6. HTML semántico, foco visible, navegación con teclado, menú móvil con estado ARIA, movimiento reducido y ausencia de animación automática. Los azules oficiales claros se reservan para acentos; el texto pequeño usa grises legibles.
7. Imágenes locales con dimensiones y carga diferida, sin deformación, sin nuevas librerías de interfaz. Metadatos descriptivos y datos estructurados de organización; ninguna URL canónica de producción se cambia desde este prototipo.

## Límites de la evidencia

El sitio público no confirma las próximas jornadas de 2026, convenios vigentes, padrón, proceso de admisión, destino del área privada ni permisos del hosting. El calendario queda preparado con los eventos verificables y estado vacío para meses sin actividades confirmadas. El formulario prepara un correo que el visitante revisa y envía; no registra socios ni simula un envío exitoso. La conexión de CMS y formularios se detalla en `docs/integracion-wordpress.md`.

## Actualización posterior: flyer aportado por el usuario

Se incorporó el flyer original de la 39.ª Jornada de Derecho Bancario, sin recortar ni recrear sus logos. Fecha impresa: 13 de noviembre; sede: Sofitel La Reserva Cardales. Se toma 2026 por el contexto y la mención de los 60 años; el año no aparece junto a la fecha. La jornada queda destacada en la portada y el calendario, separada del archivo público. El botón de inscripción es una consulta por email a administración; no se inventan URL, horarios, expositores ni programa.

## Actualización posterior: solicitud de ingreso oficial

El usuario aportó el formulario vigente de Google Forms. Se relevaron 15 preguntas obligatorias y una segunda sección de cuota social. Se reemplazó el prototipo por email por un enlace al formulario oficial y una integración opcional bajo demanda. Se conserva su receptor existente; no se enviaron solicitudes ni se modificó el Google Form. El inventario y las recomendaciones adicionales están en `data/association-form.json`.

## Corrección de alcance del formulario

El usuario indicó que lo construirá en WordPress. Se retiró la integración con Google Forms y se reutilizó únicamente su inventario de 15 campos en una maqueta propia. El envío permanece deshabilitado hasta conectar el receptor de WordPress.

## Actualización de agenda: sólo 2026, por indicación del usuario

El 22 de octubre se incorporaron ocho flyers aportados por el usuario (marzo a octubre) y se mantuvo el de la 39.ª Jornada de noviembre. La agenda contiene nueve actividades: siete realizadas y dos próximas a esa fecha. Se eliminaron del inventario activo y del proyecto los cinco flyers antiguos de eventos/novedades de 2023–2024 y se retiraron de la agenda los eventos de 2022–2024. Esta indicación posterior reemplaza el criterio inicial de mantener esos flyers en la nueva portada. No se modificó el sitio WordPress publicado ni los documentos históricos, logos de sponsors o la página de Jóvenes. El encuentro de Jóvenes del 16 de julio aparece también en la agenda general porque su flyer está entre los ocho aportados.
