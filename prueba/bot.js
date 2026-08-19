(function () {
  const STOP = new Set("el la los las de del y o a en un una unos unas que se por con para como mas más pero sus le ha si porque esta este esto entre cuando muy sin sobre tambien también me hasta hay donde quien desde todo nos durante uno les ni contra otros ese eso ante ellos e mi mí antes algunos qué yo otro otras otra él tanto esa estos mucho quienes nada muchos cual poco ella estar estas algunas algo nosotros".split(" "));

  const SUGGESTIONS = [
    "¿Cómo se cobra con Clover?",
    "¿Cómo facturo a Despegar?",
    "Desayuno de un huésped en Baires",
    "Checklist del turno mañana",
    "¿Qué habitaciones de Milenia no se hacen twin?"
  ];

  const LLM_MISSING = "Para que el asistente responda con IA hay que publicar el sitio en Netlify y cargar GROQ_API_KEY en Site settings → Environment variables. Creá una clave gratis en https://console.groq.com y volvé a desplegar. Mientras tanto no invento respuestas.";

  const state = {
    docs: [],
    chunks: []
  };

  const $ = (id) => document.getElementById(id);

  function root() {
    return $("ippa-bot");
  }

  function isOpen() {
    return root().classList.contains("is-open");
  }

  function setOpen(open) {
    const panel = $("ippa-bot-panel");
    const toggle = $("ippa-bot-toggle");
    root().classList.toggle("is-open", open);
    panel.hidden = !open;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Cerrar asistente iPPA" : "Abrir asistente iPPA");
    if (open) $("ippa-bot-input").focus();
  }

  function setStatus(text) {
    $("ippa-bot-status").textContent = text;
  }

  function addMessage(role, text, sources) {
    const div = document.createElement("div");
    div.className = `ippa-bot-msg ${role}`;
    div.textContent = text;
    if (sources && sources.length) {
      const src = document.createElement("div");
      src.className = "ippa-bot-sources";
      src.textContent = "Fuentes: " + sources.join(" · ");
      div.appendChild(src);
    }
    const box = $("ippa-bot-messages");
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }

  function tokenize(text) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(/[^a-z0-9áéíóúñü]+/i)
      .map((w) => w.replace(/[\u0300-\u036f]/g, ""))
      .filter((w) => w.length > 2 && !STOP.has(w));
  }

  function chunkText(name, text) {
    const clean = text.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n").trim();
    const parts = [];
    const size = 900;
    const overlap = 120;
    for (let i = 0; i < clean.length; i += size - overlap) {
      const slice = clean.slice(i, i + size).trim();
      if (slice.length > 40) parts.push({ name, text: slice });
    }
    return parts;
  }

  function rebuildIndex() {
    state.chunks = state.docs.flatMap((doc) => chunkText(doc.name, doc.text));
  }

  async function extractText(file, buffer) {
    const name = file.name.toLowerCase();
    if (name.endsWith(".pdf")) return extractPdf(buffer);
    if (name.endsWith(".docx")) {
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      return result.value || "";
    }
    if (name.endsWith(".xlsx") || name.endsWith(".csv")) {
      const wb = XLSX.read(buffer, { type: "array" });
      return wb.SheetNames.map((sheet) => {
        const csv = XLSX.utils.sheet_to_csv(wb.Sheets[sheet]);
        return `Hoja ${sheet}\n${csv}`;
      }).join("\n\n");
    }
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(buffer);
  }

  async function extractPdf(buffer) {
    const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
    const pages = [];
    for (let i = 1; i <= pdf.numPages; i += 1) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => item.str).join(" "));
    }
    return pages.join("\n");
  }

  function upsertDoc(name, text) {
    const chars = text.trim().length;
    if (!chars) return;
    state.docs = state.docs.filter((doc) => doc.name !== name);
    state.docs.push({ name, text: text.trim(), chars });
    rebuildIndex();
  }

  async function loadFolderDocs() {
    const res = await fetch("./docs/index.json", { cache: "no-store" });
    if (!res.ok) throw new Error("No encontré docs/index.json");
    const { files } = await res.json();
    for (const name of files || []) {
      const fileRes = await fetch("./docs/" + encodeURIComponent(name), { cache: "no-store" });
      if (!fileRes.ok) continue;
      const buffer = await fileRes.arrayBuffer();
      const text = await extractText({ name }, buffer);
      upsertDoc(name, text);
    }
  }

  function scoreChunk(chunk, queryTokens) {
    const hay = tokenize(chunk.name + " " + chunk.text);
    let score = 0;
    queryTokens.forEach((token) => {
      hay.forEach((word) => {
        if (word === token) score += 3;
        else if (word.includes(token) || token.includes(word)) score += 1;
      });
    });
    return score;
  }

  function retrieve(question, limit = 5) {
    const tokens = tokenize(question);
    return state.chunks
      .map((chunk) => ({ ...chunk, score: scoreChunk(chunk, tokens) }))
      .filter((chunk) => chunk.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  async function askLlm(question, hits) {
    const res = await fetch("/.netlify/functions/prueba-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        chunks: hits.map((hit) => ({ name: hit.name, text: hit.text }))
      })
    });
    let data = {};
    try {
      data = await res.json();
    } catch (err) {
      data = {};
    }
    if (res.status === 404 || res.status === 503 || !res.ok && data.code === "missing_key") {
      throw new Error(data.error || LLM_MISSING);
    }
    if (!res.ok) {
      throw new Error(data.error || "El asistente no pudo responder ahora. Probá de nuevo en un momento.");
    }
    const text = (data.text || "").trim();
    if (!text) throw new Error("El asistente no devolvió una respuesta.");
    return text;
  }

  async function answer(question) {
    const hits = retrieve(question);
    const sources = [...new Set(hits.map((hit) => hit.name))];
    if (!hits.length) {
      return {
        text: "No encontré eso en los documentos de prueba\\docs. Copiá el PDF, Word, txt o Excel ahí, corré actualizar-docs.ps1 y volvé a desplegar.",
        sources: []
      };
    }
    try {
      const text = await askLlm(question, hits);
      return { text, sources };
    } catch (err) {
      const message = err && err.message ? err.message : LLM_MISSING;
      if (/failed to fetch|networkerror|load failed/i.test(message) || err.name === "TypeError") {
        return { text: LLM_MISSING, sources: [] };
      }
      return { text: message, sources: [] };
    }
  }

  async function handleQuestion(question) {
    const q = question.trim();
    if (!q) return;
    if (!isOpen()) setOpen(true);
    addMessage("user", q);
    $("ippa-bot-input").value = "";
    setStatus("Buscando en los documentos…");
    const result = await answer(q);
    addMessage("bot", result.text, result.sources);
    setStatus(`${state.docs.length} documento${state.docs.length === 1 ? "" : "s"}`);
  }

  function bindUi() {
    $("ippa-bot-chips").innerHTML = SUGGESTIONS.map((text) => `<button class="ippa-bot-chip" type="button">${escapeHtml(text)}</button>`).join("");
    $("ippa-bot-chips").addEventListener("click", (event) => {
      if (event.target.matches(".ippa-bot-chip")) handleQuestion(event.target.textContent);
    });

    $("ippa-bot-toggle").addEventListener("click", () => setOpen(!isOpen()));
    $("ippa-bot-close").addEventListener("click", () => setOpen(false));

    $("ippa-bot-form").addEventListener("submit", (event) => {
      event.preventDefault();
      handleQuestion($("ippa-bot-input").value);
    });

    $("ippa-bot-input").addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleQuestion($("ippa-bot-input").value);
      }
    });
  }

  async function boot() {
    if (!root()) return;
    if (window.pdfjsLib) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }
    bindUi();
    addMessage("bot", "Preguntame un procedimiento. La información sale solo de prueba\\docs (PDF, Word, txt o Excel). Corré actualizar-docs.ps1 y desplegá para actualizarla.");
    try {
      await loadFolderDocs();
    } catch (err) {
      console.warn(err);
    }
    rebuildIndex();
    setStatus(`${state.docs.length} documento${state.docs.length === 1 ? "" : "s"}`);
  }

  boot();
})();
