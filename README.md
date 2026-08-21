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

```bash
python3 -m http.server 8080
```

Abre `http://localhost:8080`.

## Publicar en GitHub Pages
1. Sube todo el contenido de esta carpeta a la rama `main`.
2. En GitHub abre **Settings > Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Selecciona `main` y `/ (root)`.
5. Guarda y espera la publicación.

> GitHub Pages público no restringe por sí mismo el acceso a usuarios de tu organización. Si el repositorio o la aplicación debe ser estrictamente interna, valida la política de GitHub Enterprise de tu organización o utiliza Azure Static Web Apps con Microsoft Entra ID.

## Estructura
- `index.html`: estructura de la interfaz.
- `assets/css/styles.css`: estilos propios.
- `assets/js/config.js`: textos y configuración editable.
- `assets/js/app.js`: controlador principal.
- `assets/js/modules/csv.js`: parseo y limpieza CSV.
- `assets/js/modules/files.js`: archivos y descargas.
- `assets/js/modules/dom.js`: utilidades DOM.
- `assets/js/modules/effects.js`: tema y efecto del cursor.
