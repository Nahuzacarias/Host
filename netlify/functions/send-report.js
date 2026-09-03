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
  return String(value || "").trim().slice(0, max);
}

function buildFormData(nombre, asunto, descripcion, attachment) {
  const form = new FormData();
  form.append("Nombre y apellido", nombre);
  form.append("Asunto", asunto);
  form.append("Descripción", descripcion);
  form.append("_subject", "[Host iPPA] " + asunto);
  form.append("_template", "table");
  form.append("_captcha", "false");
  if (attachment && attachment.data && attachment.filename) {
    const bytes = Buffer.from(attachment.data, "base64");
    const blob = new Blob([bytes], {
      type: attachment.contentType || "application/octet-stream"
    });
    form.append("Adjunto", blob, String(attachment.filename).slice(0, 180));
  }
  return form;
}

async function postToMailbox(email, formData) {
  const res = await fetch("https://formsubmit.co/ajax/" + encodeURIComponent(email), {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData
  });
  const payload = await res.json().catch(() => ({}));
  const ok = res.ok || payload.success === true || payload.success === "true";
  if (!ok) {
    const message = payload.message || "No se pudo enviar el mail a " + email + ".";
    const error = new Error(message);
    error.status = res.status;
    throw error;
  }
  return payload;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(event), body: "" };
  }
  if (event.httpMethod !== "POST") {
    return json(event, 405, { error: "Usá POST." });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return json(event, 400, { error: "El aviso no tiene un formato válido." });
  }

  const nombre = clip(payload.nombre, 120);
  const asunto = clip(payload.asunto, 160);
  const descripcion = clip(payload.descripcion, 4000);
  const attachment = payload.attachment || null;

  if (!nombre || !asunto || !descripcion) {
    return json(event, 400, {
      error: "Completá asunto, descripción y nombre y apellido."
    });
  }

  if (attachment && attachment.data) {
    const size = Buffer.byteLength(String(attachment.data), "base64");
    if (size > 4 * 1024 * 1024) {
      return json(event, 413, { error: "El adjunto no puede superar los 4 MB." });
    }
  }

  try {
    await postToMailbox(
      "asistente.operaciones@ippa-hoteles.com",
      buildFormData(nombre, asunto, descripcion, attachment)
    );
    return json(event, 200, { ok: true });
  } catch (error) {
    return json(event, error.status || 502, {
      error: error.message || "No se pudo enviar el aviso."
    });
  }
};
