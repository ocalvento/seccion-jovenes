# Relevamiento del administrador — 28 de octubre de 2026

Consultas realizadas con la sesión abierta por el usuario. El relevamiento inicial fue de solo lectura. Más tarde el usuario instaló y activó WP STAGING y autorizó crear una copia de pruebas desde WordPress.

## Estado confirmado

- WordPress 7.1.3; tema activo Astra.
- Portada actual: **Home**, ID 2489. La lista de páginas la identifica como página de inicio y no la marca como Elementor.
- **Home 1**, ID 1702, es otra página y sí está marcada como Elementor. No confundirla con la portada vigente.
- Otras páginas publicadas: Próximamente, Novedades y Eventos. Cinco páginas y dieciséis entradas publicadas.
- Dieciocho plugins instalados; ocho activos. Activos relevantes: Spectra Legacy 2.20.5, Elementor 3.35.4, Timeline Block 2.0.0, LiteSpeed Cache 7.9.2 y UpdraftPlus 1.26.14.
- WPForms Lite 2.0.3 está instalado pero desactivado. No se activó ni se comprobó todavía que cubra todos los requisitos del formulario nativo.
- No aparece un plugin de staging en la lista de plugins instalados.

## Copias de seguridad

En la pestaña de UpdraftPlus aparece un conjunto del **13 de noviembre de 2023**. Muestra base de datos, plugins, temas, subidas y otros archivos, con referencia a Google Drive. No hay copias automáticas programadas en ese plugin. Esto no demuestra que el proveedor de hosting no tenga respaldos adicionales.

No se ejecutó una copia nueva, restauración, migración, actualización ni envío a almacenamiento remoto.

## Proveedor por confirmar

La consulta DNS pública devuelve `ns3.hostmar.com` y `ns4.hostmar.com`. La documentación oficial de Donweb identifica ambos como servidores de su infraestructura: https://soporte.donweb.com/es/articles/15901431-dominios-y-zona-dns-cuales-son-los-nameservers-de-donweb

Es un indicio de infraestructura Donweb, no una confirmación de la cuenta contratante o del vendedor: puede existir un revendedor o una administración independiente del DNS. El usuario indicó que desconoce el proveedor.

Donweb documenta WordPress Stage desde Mi cuenta/Ferozo como un servicio adicional con costo. No se contrató ni se presupone que esté disponible: https://soporte.donweb.com/es/articles/15985156-web-hosting-y-wordpress-hosting-usar-wordpress-stage-para-probar-cambios-sin-riesgos

## Copia de pruebas desde WordPress

El usuario instaló y activó **WP STAGING 4.19.0** desde el repositorio de WordPress. Ahora hay diecinueve plugins instalados y nueve activos. Se omitió la solicitud opcional de telemetría del asistente.

Se ejecutó la opción «Crear sitio staging» del asistente. El plugin completó la clonación local en la carpeta `titan`, con tablas separadas de prefijo `wpstg0_`, y confirmó «Tu sitio de staging está listo». URL: https://abogadosdebancos.org.ar/titan/. No se creó un usuario administrador nuevo ni se configuró un destino remoto.

Se abrió la copia y se comprobó que exige credenciales de administrador antes de mostrarla. Quedó pendiente que el usuario inicie sesión en esa copia con sus credenciales existentes. No se modificó todavía su contenido ni el diseño. Evidencia: `screenshots/wp-staging-creado.png`.

Actualización posterior: el usuario inició sesión y se guardó la primera adaptación de Home, Eventos y Novedades en staging. Se activó WPForms Lite sólo en la copia y se creó la solicitud ID 2549. Ver `docs/adaptacion-wordpress-staging.md` para el alcance comprobado, las limitaciones y los pendientes. La sesión y la primera adaptación no equivalen a una publicación sobre la web principal.

## Siguiente paso

La copia puede crearse desde WP STAGING sin conocer el panel del hosting. Identificar al proveedor sigue siendo útil para confirmar respaldos externos, pero no es un requisito para esta vía. El acceso a WordPress ya está verificado.

La conversión se realizará manteniendo Astra/Spectra. La instalación y activación del formulario o código nuevo quedarán para la copia de pruebas, sin sustituir la portada pública durante la preparación.
