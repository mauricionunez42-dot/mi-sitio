# Mi sitio

Sitio personal estático (HTML/CSS/JS puro, sin backend) para publicar información, videos y archivos descargables, con comentarios de visitantes.

## Estructura

```
index.html          → página de inicio (listado de entradas)
post.html           → plantilla que muestra una entrada individual
acerca.html         → página "Acerca de"
assets/css/style.css → toda la paleta de colores y estilos
assets/js/main.js    → lógica que arma las páginas a partir de posts.json
assets/js/posts.json → AQUÍ SE AGREGAN LAS ENTRADAS (no hay que tocar el HTML)
assets/img/logo.svg  → logo (reemplázalo por el tuyo)
downloads/           → aquí van los archivos descargables (PDF, ZIP, etc.)
```

## Cómo publicarlo en internet (GitHub Pages, gratis)

1. Crea una cuenta en GitHub si no tienes una.
2. Crea un repositorio nuevo, por ejemplo `mi-sitio`.
3. Sube todos estos archivos y carpetas a ese repositorio (puedes arrastrarlos desde la web de GitHub, o usar Git).
4. En el repositorio, ve a **Settings → Pages**.
5. En "Source" selecciona la rama `main` y la carpeta `/ (root)`. Guarda.
6. En un par de minutos tu sitio quedará publicado en:
   `https://TU-USUARIO.github.io/mi-sitio/`

## Cómo agregar una nueva entrada

Abre `assets/js/posts.json` y copia uno de los bloques existentes. Cada entrada tiene:

- `id`: identificador único, sin espacios (se usa en la URL).
- `tipo`: `"info"`, `"video"` o `"descarga"` (define el sello de color).
- `titulo`, `fecha`, `resumen`, `contenido` (lista de párrafos).
- `video`: opcional, para incrustar un video de YouTube (`tipo_embed: "youtube"`, `id_o_url` es el ID del video) o un archivo propio (`tipo_embed: "archivo"`).
- `descarga`: opcional, con `nombre`, `ruta` (dentro de `/downloads`) y `peso`.

No hace falta tocar ningún HTML: la entrada aparece automáticamente en el inicio y en su propia página.

## Cómo activar los comentarios (Giscus)

Giscus usa las "Discussions" de tu propio repositorio de GitHub como base de datos de comentarios — es gratis y no necesitas servidor propio.

1. Activa Discussions en tu repositorio: **Settings → General → Features → Discussions**.
2. Ve a https://giscus.app, ingresa los datos de tu repositorio y sigue los pasos.
3. Esa página te dará un bloque de código con 4 valores: `data-repo`, `data-repo-id`, `data-category`, `data-category-id`.
4. Copia esos 4 valores dentro de `post.html`, reemplazando los que dicen `TU-USUARIO/TU-REPOSITORIO` y `PENDIENTE-COPIAR-DE-GISCUS.APP`.

## Cómo agregar archivos descargables de forma segura

Sube el archivo directamente a la carpeta `/downloads` del repositorio y referencia su ruta en `posts.json` (campo `ruta`). Como el archivo vive en tu propio repositorio, el visitante lo descarga directo de tu sitio — sin redirecciones ni anuncios de terceros que podrían ser riesgosos.

## Cómo cambiar la paleta de colores

Todo el color del sitio está centralizado al inicio de `assets/css/style.css`, en el bloque `:root`. Cambia esos valores hexadecimales y se actualiza todo el sitio a la vez.

## Cómo cambiar el logo

Reemplaza `assets/img/logo.svg` por tu propio archivo (puede ser `.svg`, `.png` o `.jpg`; si cambias el nombre o formato, actualiza la ruta `src` en `index.html`, `post.html` y `acerca.html`). El logo se muestra en la esquina superior derecha del encabezado.

## Dominio propio (opcional, más adelante)

Por ahora el sitio usa el subdominio gratuito `usuario.github.io`. Si en el futuro compras un dominio propio, en **Settings → Pages** de GitHub puedes agregarlo en "Custom domain" y GitHub se encarga del resto.
