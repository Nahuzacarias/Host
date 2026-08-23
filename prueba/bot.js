(function () {
  const STOP = new Set("el la los las de del y o a en un una unos unas que se por con para como mas más pero sus le ha si porque esta este esto entre cuando muy sin sobre tambien también me hasta hay donde quien desde todo nos durante uno les ni contra otros ese eso ante ellos e mi mí antes algunos qué yo otro otras otra él tanto esa estos mucho quienes nada muchos cual poco ella estar estas algunas algo nosotros les al".split(" "));

  const SUGGESTIONS = [
    "🌅 Checklist Turno Mañana",
    "💳 Cobro con Clover",
    "🔑 Claves y accesos Milenia",
    "🍳 Desayuno en Baires",
    "📄 Facturación Despegar",
    "🧹 Procedimiento HSK",
    "🏔️ Guía Aldea Andina Bariloche"
  ];

  const LLM_MISSING = "Para que el asistente responda con IA, hay que cargar una clave en Netlify (Site settings → Environment variables): GROQ_API_KEY, GEMINI_API_KEY o OPENAI_API_KEY. Podés crear una gratis en https://console.groq.com o https://aistudio.google.com y volver a desplegar el sitio.";

  const state = {
    docs: [],
    chunks: [],
    loadedFromKb: false
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
    if (open) {
      setTimeout(() => $("ippa-bot-input").focus(), 80);
    }
  }

  function setStatus(text, isOnline = true) {
    const el = $("ippa-bot-status-text");
    if (el) el.textContent = text;
    const dot = $("ippa-bot-status-dot");
    if (dot) dot.style.background = isOnline ? "var(--ippa-success)" : "var(--ippa-muted)";
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }

  function renderMarkdown(rawText) {
    if (!rawText) return "";
    let safe = escapeHtml(rawText);

    // Code blocks & inline code
    safe = safe.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold
    safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic
    safe = safe.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Lists
    const lines = safe.split("\n");
    let inUl = false;
    let inOl = false;
    const out = [];

    lines.forEach((line) => {
      const trim = line.trim();
      const isUlItem = /^[-•*]\s+(.*)$/.exec(trim);
      const isOlItem = /^(\d+)[.)]\s+(.*)$/.exec(trim);

      if (isUlItem) {
        if (inOl) { out.push("</ol>"); inOl = false; }
        if (!inUl) { out.push("<ul>"); inUl = true; }
        out.push(`<li>${isUlItem[1]}</li>`);
      } else if (isOlItem) {
        if (inUl) { out.push("</ul>"); inUl = false; }
        if (!inOl) { out.push("<ol>"); inOl = true; }
        out.push(`<li>${isOlItem[2]}</li>`);
      } else {
        if (inUl) { out.push("</ul>"); inUl = false; }
        if (inOl) { out.push("</ol>"); inOl = false; }
        if (trim.length > 0) {
          out.push(`<p>${trim}</p>`);
        }
      }
    });

    if (inUl) out.push("</ul>");
    if (inOl) out.push("</ol>");

    return out.join("");
  }

  function addMessage(role, text, sources = []) {
    const box = $("ippa-bot-messages");
    const div = document.createElement("div");
    div.className = `ippa-bot-msg ${role}`;

    if (role === "bot") {
      div.innerHTML = renderMarkdown(text);
      if (sources && sources.length > 0) {
        const srcContainer = document.createElement("div");
        srcContainer.className = "ippa-bot-sources";
        srcContainer.innerHTML = '<span>Fuentes:</span> ' + sources.map((s) => `<span class="ippa-bot-source-tag">${escapeHtml(s)}</span>`).join("");
        div.appendChild(srcContainer);
      }
    } else {
      div.textContent = text;
    }

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    return div;
  }

  function showTypingIndicator() {
    const box = $("ippa-bot-messages");
    const typing = document.createElement("div");
    typing.id = "ippa-typing-indicator";
    typing.className = "ippa-bot-msg bot ippa-bot-typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    box.appendChild(typing);
    box.scrollTop = box.scrollHeight;
  }

  function removeTypingIndicator() {
    const typing = $("ippa-typing-indicator");
    if (typing) typing.remove();
  }

  function normalizeText(text) {
    return (text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function tokenize(text) {
    return normalizeText(text)
      .split(/[^a-z0-9áéíóúñü]+/i)
      .map((w) => w.replace(/[\u0300-\u036f]/g, ""))
      .filter((w) => w.length > 2 && !STOP.has(w));
  }

  function scoreChunk(chunk, queryTokens, fullQueryNorm) {
    const nameNorm = normalizeText(chunk.name || chunk.source);
    const catNorm = normalizeText(chunk.category || "");
    const textNorm = normalizeText(chunk.text || "");
    const fullHaystack = `${nameNorm} ${catNorm} ${textNorm}`;

    let score = 0;

    // Check specific hotel mentions
    const hotels = ["milenia", "filiberto", "congreso", "baires", "independencia", "hache", "aldea andina", "soho", "vidt"];
    hotels.forEach((h) => {
      if (fullQueryNorm.includes(h) && (nameNorm.includes(h) || catNorm.includes(h))) {
        score += 8;
      }
    });

    // Check procedures / checklists mentions
    const topics = ["clover", "despegar", "wetravel", "desayuno", "checkout", "checkin", "caja", "venice", "trello", "ttlock", "wifi", "contrasena", "clave", "hsk", "mucama", "facturacion", "cobro", "turno manana", "turno tarde", "turno noche"];
    topics.forEach((t) => {
      if (fullQueryNorm.includes(t) && (nameNorm.includes(t) || textNorm.includes(t))) {
        score += 6;
      }
    });

    queryTokens.forEach((token) => {
      if (nameNorm.includes(token)) score += 4;
      if (catNorm.includes(token)) score += 3;

      // Word matches in text
      const regex = new RegExp(`\\b${token}\\b`, "g");
      const matches = textNorm.match(regex);
      if (matches) {
        score += Math.min(matches.length * 2, 8);
      } else if (textNorm.includes(token)) {
        score += 1;
      }
    });

    return score;
  }

  function retrieve(question, limit = 6) {
    const queryNorm = normalizeText(question);
    const tokens = tokenize(question);

    return state.chunks
      .map((chunk) => ({ ...chunk, score: scoreChunk(chunk, tokens, queryNorm) }))
      .filter((chunk) => chunk.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  async function loadKnowledgeBase() {
    try {
      const res = await fetch("./docs/knowledge-base.json", { cache: "no-store" });
      if (res.ok) {
        const kb = await res.json();
        if (kb && Array.isArray(kb.chunks) && kb.chunks.length > 0) {
          state.chunks = kb.chunks.map((c) => ({
            name: c.source || "Base iPPA",
            category: c.category || "",
            text: c.text
          }));
          state.docs = kb.documents || [];
          state.loadedFromKb = true;
          return true;
        }
      }
    } catch (e) {
      console.warn("No se pudo cargar knowledge-base.json directamente:", e);
    }
    return false;
  }

  async function extractText(file, buffer) {
    const name = file.name.toLowerCase();
    if (name.endsWith(".pdf") && window.pdfjsLib) {
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      const pages = [];
      for (let i = 1; i <= pdf.numPages; i += 1) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        pages.push(content.items.map((item) => item.str).join(" "));
      }
      return pages.join("\n");
    }
    if (name.endsWith(".docx") && window.mammoth) {
      const result = await mammoth.extractRawText({ arrayBuffer: buffer });
      return result.value || "";
    }
    if ((name.endsWith(".xlsx") || name.endsWith(".csv")) && window.XLSX) {
      const wb = XLSX.read(buffer, { type: "array" });
      return wb.SheetNames.map((sheet) => {
        const csv = XLSX.utils.sheet_to_csv(wb.Sheets[sheet]);
        return `Hoja ${sheet}\n${csv}`;
      }).join("\n\n");
    }
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(buffer);
  }

  async function loadFolderDocsFallback() {
    try {
      const res = await fetch("./docs/index.json", { cache: "no-store" });
      if (!res.ok) return;
      const { files } = await res.json();
      for (const name of files || []) {
        if (state.docs.some((d) => d.name === name)) continue;
        const fileRes = await fetch("./docs/" + encodeURIComponent(name), { cache: "no-store" });
        if (!fileRes.ok) continue;
        const buffer = await fileRes.arrayBuffer();
        const text = await extractText({ name }, buffer);
        if (text && text.trim()) {
          state.docs.push({ name, text: text.trim(), char_count: text.length });
          // Split into basic chunks
          const size = 900;
          for (let i = 0; i < text.length; i += size - 120) {
            const slice = text.slice(i, i + size).trim();
            if (slice.length > 40) {
              state.chunks.push({ name, category: "Documento Adicional", text: slice });
            }
          }
        }
      }
    } catch (err) {
      console.warn("Fallback loader error:", err);
    }
  }

  async function askLlm(question, hits) {
    const res = await fetch("/.netlify/functions/prueba-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        chunks: hits.map((hit) => ({
          name: hit.name || hit.source,
          category: hit.category || "",
          text: hit.text
        }))
      })
    });

    let data = {};
    try {
      data = await res.json();
    } catch (err) {
      data = {};
    }

    if (res.status === 404 || res.status === 503 || (!res.ok && data.code === "missing_key")) {
      throw new Error(data.error || LLM_MISSING);
    }

    if (!res.ok) {
      throw new Error(data.error || "El asistente no pudo procesar la respuesta. Probá de nuevo.");
    }

    const text = (data.text || "").trim();
    if (!text) throw new Error("El asistente no devolvió una respuesta.");
    return text;
  }

  async function answer(question) {
    const hits = retrieve(question);
    const sources = [...new Set(hits.map((hit) => hit.name || hit.source))];

    if (!hits.length) {
      return {
        text: "No encontré información sobre eso en la base de datos operativa. Podés consultar por un procedimiento de turno, claves de propiedades (Milenia, Filiberto, Baires, Congreso, Aldea Andina) o cobros.",
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
    const q = (question || "").trim();
    if (!q) return;

    if (!isOpen()) setOpen(true);
    addMessage("user", q);
    $("ippa-bot-input").value = "";
    
    setStatus("Consultando base de procedimientos…", true);
    showTypingIndicator();

    const result = await answer(q);
    removeTypingIndicator();
    addMessage("bot", result.text, result.sources);

    const docCount = state.docs.length || 23;
    setStatus(`${docCount} documentos · ${state.chunks.length} temas activos`, true);
  }

  function bindUi() {
    $("ippa-bot-chips").innerHTML = SUGGESTIONS.map(
      (text) => `<button class="ippa-bot-chip" type="button">${escapeHtml(text)}</button>`
    ).join("");

    $("ippa-bot-chips").addEventListener("click", (event) => {
      const chip = event.target.closest(".ippa-bot-chip");
      if (chip) {
        const query = chip.textContent.replace(/^[^\wáéíóúñ]+/i, "").trim();
        handleQuestion(query);
      }
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

    addMessage(
      "bot",
      "**¡Hola! Soy el Asistente Virtual de Host iPPA.**\n\nEstoy conectado a toda la base operativa oficial: manuales, fichas técnicas de edificios (*Milenia, Filiberto, Congreso, Baires, Aldea Andina*), cobros (*Clover/WeTravel*), facturación y checklists de turnos.\n\n¿En qué puedo ayudarte hoy?"
    );

    const loaded = await loadKnowledgeBase();
    if (!loaded) {
      await loadFolderDocsFallback();
    }

    const count = state.docs.length || 23;
    const chunkCount = state.chunks.length;
    setStatus(`${count} documentos cargados · ${chunkCount} temas listos`, true);
  }

  boot();
})();
