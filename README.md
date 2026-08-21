# CSV Studio

Aplicación web estática para limpiar varios archivos CSV directamente en el navegador.

## Funciones
- Elimina columnas cuyo encabezado comienza con `px`.
- Elimina opcionalmente `pyGUID` sin sensibilidad a mayúsculas/minúsculas.
- Conserva el delimitador y el salto de línea detectados.
- Elimina timestamps como `20260812T215952.873 GMT` del nombre de salida.
- Descarga un CSV o un ZIP cuando se procesan varios archivos.
- No envía los CSV a un servidor.

## Ejecutar localmente
Los módulos ES requieren un servidor local:


## Estructura
- `index.html`: estructura de la interfaz.
- `assets/css/styles.css`: estilos propios.
- `assets/js/config.js`: textos y configuración editable.
- `assets/js/app.js`: controlador principal.
- `assets/js/modules/csv.js`: parseo y limpieza CSV.
- `assets/js/modules/files.js`: archivos y descargas.
- `assets/js/modules/dom.js`: utilidades DOM.
- `assets/js/modules/effects.js`: tema y efecto del cursor.
