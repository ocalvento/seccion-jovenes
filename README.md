# Comité de Abogados de Bancos — evolución institucional

Prototipo local de la portada institucional, integrado al proyecto HTML/CSS/JS existente. Conserva `/seccion-joven/`. No está conectado al administrador WordPress ni modifica el sitio publicado.

```sh
npm run build
npm test
npm run dev
```

Abrir `http://127.0.0.1:4173/`. No hay dependencias npm para instalar; la vista previa usa Python 3. La portada se genera desde `templates/home.html`, `data/institutional.json` y `data/association-form.json`; editar la plantilla, no el `index.html` generado. El generador comparte sólo el header con Jóvenes y conserva su contenido.

- [Auditoría comparativa](docs/auditoria-institucional.md): medidas, colores exactos, inventario y decisiones anteriores a la implementación.
- [Integración WordPress](docs/integracion-wordpress.md): mantener Astra/Spectra y CMS, mapear contenidos y probar en staging.
- `data/institutional.json`: fuentes, fechas de relevamiento y hashes de los recursos institucionales y flyers de 2026.

El calendario utiliza fechas civiles de Buenos Aires. La 39.ª Jornada de Derecho Bancario, el 13 de noviembre en Sofitel La Reserva Cardales, se incorpora desde el flyer aportado por el usuario. Se toma 2026 por el contexto de los 60 años; el flyer no imprime el año junto a la fecha. El calendario abre en el mes de la próxima actividad. Asociate contiene una maqueta nativa de los 15 campos relevados como referencia. Por indicación del usuario, no hay integración ni enlaces a Google Forms en la web; la recepción se implementará en WordPress. El envío local está deshabilitado y no se guardan datos. Por indicación del usuario se eliminó el acceso socios de la página, menús y pie; se mantiene Asociate como acción principal.

La portada lleva `noindex, nofollow` por ser una revisión local. Antes de integrarla en producción se deben confirmar contenidos vigentes y conectar la gestión de eventos de WordPress y verificar la recepción del formulario oficial.

La agenda principal muestra sólo 2026: ocho flyers aportados posteriormente más la jornada del 13 de noviembre. Los flyers y eventos anteriores se retiraron por instrucción expresa del usuario. La Sección Jóvenes mantiene su contenido y sus imágenes.
