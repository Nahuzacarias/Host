const MISSING_KEY =
  "Para que el asistente responda con IA hay que cargar GROQ_API_KEY en Netlify: Site settings → Environment variables. Creá una clave gratis en https://console.groq.com y volvé a desplegar. No invento respuestas sin esa clave.";

function corsHeaders(event) {
  const origin = event.headers.origin || event.headers.Origin || "*";
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
    Vary: "Origin"
  };
}

function json(event, statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders(event),
    body: JSON.stringify(body)
  };
}

function clip(value, max) {
  const text = String(value || "").trim();
  return text.length > max ? text.slice(0, max) : text;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(event), body: "" };
  }
  if (event.httpMethod !== "POST") {
    return json(event, 405, { error: "Usá POST." });
  }

  const key = process.env.GROQ_API_KEY;
  if (!key) {
    return json(event, 503, { error: MISSING_KEY, code: "missing_key" });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (err) {
    return json(event, 400, { error: "Pedido inválido." });
  }

  const question = clip(payload.question, 2000);
  const rawChunks = Array.isArray(payload.chunks) ? payload.chunks : [];
  const chunks = rawChunks.slice(0, 6).map((chunk) => ({
    name: clip(chunk && chunk.name, 120) || "documento",
    text: clip(chunk && chunk.text, 1200)
  })).filter((chunk) => chunk.text);

  if (!question) {
    return json(event, 400, { error: "Falta la pregunta." });
  }
  if (!chunks.length) {
    return json(event, 200, {
      text: "No hay contexto de prueba\\docs para responder. No invento la información."
    });
  }

  const context = chunks.map((chunk, i) => `[${i + 1} ${chunk.name}]\n${chunk.text}`).join("\n\n");

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content: "Sos el asistente interno de host de iPPA Hoteles. Respondé en español, claro y en pasos. Usá SOLO el contexto. Si no está, decí que no está en los documentos. No inventes."
          },
          {
            role: "user",
            content: `Pregunta: ${question}\n\nContexto:\n${context}`
          }
        ]
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const groqMsg = data.error && data.error.message ? data.error.message : "";
      return json(event, 502, {
        error: groqMsg
          ? `Groq no respondió: ${groqMsg}`
          : "Groq no respondió. Revisá el cupo diario o volvé a intentar."
      });
    }

    const text = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content || "").trim();
    if (!text) {
      return json(event, 502, { error: "Groq no devolvió texto." });
    }
    return json(event, 200, { text });
  } catch (err) {
    return json(event, 502, { error: "No se pudo contactar a Groq." });
  }
};
