// Carga las entradas desde posts.json y las dibuja en pantalla.
// No requiere servidor: funciona con fetch() sobre un archivo estático.

const ETIQUETAS = {
  info:      { clase: "stamp--info",      texto: "Información" },
  video:     { clase: "stamp--video",     texto: "Video" },
  descarga:  { clase: "stamp--descarga",  texto: "Descarga" }
};

function formatearFecha(iso){
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });
}

async function cargarEntradas(){
  const res = await fetch("assets/js/posts.json");
  return res.json();
}

function renderStamp(tipo){
  const info = ETIQUETAS[tipo] || ETIQUETAS.info;
  return `<span class="stamp ${info.clase}">${info.texto}</span>`;
}

// ---------- Página de inicio (index.html) ----------
async function renderListado(){
  const contenedor = document.getElementById("entries-grid");
  if(!contenedor) return;

  const entradas = await cargarEntradas();
  entradas.sort((a,b) => b.fecha.localeCompare(a.fecha));

  contenedor.innerHTML = entradas.map(e => `
    <article class="entry-card">
      ${renderStamp(e.tipo)}
      <h2><a href="post.html?id=${encodeURIComponent(e.id)}">${e.titulo}</a></h2>
      <div class="entry-meta">${formatearFecha(e.fecha)}</div>
      <p class="entry-excerpt">${e.resumen}</p>
    </article>
  `).join("");
}

// ---------- Página de una entrada (post.html) ----------
function embedVideo(video){
  if(!video) return "";
  if(video.tipo_embed === "youtube"){
    return `<iframe class="video-embed" src="https://www.youtube.com/embed/${video.id_o_url}"
      title="Video" allowfullscreen loading="lazy"></iframe>`;
  }
  if(video.tipo_embed === "archivo"){
    return `<video controls src="${video.id_o_url}"></video>`;
  }
  return "";
}

function bloqueDescarga(descarga){
  if(!descarga) return "";
  const esExterno = /^https?:\/\//.test(descarga.ruta);
  const texto = esExterno ? "Abrir en Drive" : "Descargar";
  return `
    <div class="download-box">
      <div class="file-info">
        <strong>${descarga.nombre}</strong>
        ${descarga.peso}
      </div>
      <a class="btn" href="${descarga.ruta}" ${esExterno ? 'target="_blank" rel="noopener"' : "download"}>${texto}</a>
    </div>
    <p class="safety-note">
      ${esExterno ? "Este archivo está alojado en Google Drive." : "Este archivo está alojado directamente en este sitio; no proviene de un enlace externo ni de terceros."}
    </p>
  `;
}

async function renderPost(){
  const contenedor = document.getElementById("post-container");
  if(!contenedor) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const entradas = await cargarEntradas();
  const entrada = entradas.find(e => e.id === id);

  if(!entrada){
    contenedor.innerHTML = `<p>No se encontró esta entrada.</p><p><a href="index.html">Volver al inicio</a></p>`;
    return;
  }

  document.title = entrada.titulo + " — Mi sitio";

  contenedor.innerHTML = `
    <header class="post-header">
      ${renderStamp(entrada.tipo)}
      <h1>${entrada.titulo}</h1>
      <div class="entry-meta">${formatearFecha(entrada.fecha)}</div>
    </header>

    ${embedVideo(entrada.video)}

    <div class="post-body">
      ${entrada.contenido.map(p => `<p>${p}</p>`).join("")}
    </div>

    ${bloqueDescarga(entrada.descarga)}
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderListado();
  renderPost();
});
