import { useState } from "react";

const API_URL = "https://waynerexamenfinal.runasp.net/api/fraud";

export default function ReportarFraude() {
  const [form, setForm] = useState({
    impostorDetails: "",
    contactInfo: "",
    comments: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!form.impostorDetails || !form.contactInfo) {
      setError("Los campos Detalles del Impostor y Contacto son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Error al enviar el reporte.");

      setSuccess(true);
      setForm({ impostorDetails: "", contactInfo: "", comments: "" });
    } catch {
      setError("No se pudo enviar el reporte. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Reportar Fraude</h1>
        <p className="text-gray-400 mb-6">Completá el formulario para registrar un reporte de fraude.</p>

        {success && (
          <div className="bg-green-600 text-white px-4 py-3 rounded-lg mb-4">
            ✅ Reporte enviado exitosamente.
          </div>
        )}
        {error && (
          <div className="bg-red-600 text-white px-4 py-3 rounded-lg mb-4">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Detalles del Impostor *</label>
            <input
              type="text"
              name="impostorDetails"
              value={form.impostorDetails}
              onChange={handleChange}
              placeholder="Describí al impostor"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Contacto del Impostor *</label>
            <input
              type="text"
              name="contactInfo"
              value={form.contactInfo}
              onChange={handleChange}
              placeholder="Número, correo o usuario"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Comentarios</label>
            <textarea
              name="comments"
              value={form.comments}
              onChange={handleChange}
              placeholder="Describí el caso con más detalle"
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Enviando..." : "Enviar Reporte"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/reportes" className="text-blue-400 hover:underline text-sm">
            Ver todos los reportes →
          </a>
        </div>
      </div>
    </div>
  );
}