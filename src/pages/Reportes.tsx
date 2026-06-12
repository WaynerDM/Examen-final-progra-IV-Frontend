import { useEffect, useState } from "react";

const API_URL = "https://localhost:7098/api/fraud";

interface Fraud {
  id: number;
  impostorDetails: string;
  contactInfo: string;
  comments: string;
  createdAt: string;
}

export default function Reportes() {
  const [reportes, setReportes] = useState<Fraud[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setReportes(data))
      .catch(() => setError("No se pudieron cargar los reportes."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Reportes de Fraude</h1>
        <p className="text-gray-400 mb-8">Listado de todos los reportes registrados.</p>

        {loading && <p className="text-gray-400">Cargando reportes...</p>}
        {error && <p className="text-red-400">{error}</p>}
        {!loading && reportes.length === 0 && (
          <p className="text-gray-400">No hay reportes registrados aún.</p>
        )}

        <div className="space-y-4">
          {reportes.map((r) => (
            <div key={r.id} className="bg-gray-900 rounded-xl p-6 shadow">
              <div className="flex justify-between items-start mb-3">
                <span className="text-xs text-gray-500">
                  {new Date(r.createdAt).toLocaleString()}
                </span>
                <span className="text-xs bg-red-700 text-white px-2 py-1 rounded-full">
                  Reporte #{r.id}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-1"><span className="font-semibold text-white">Impostor:</span> {r.impostorDetails}</p>
              <p className="text-sm text-gray-400 mb-1"><span className="font-semibold text-white">Contacto:</span> {r.contactInfo}</p>
              {r.comments && <p className="text-sm text-gray-400"><span className="font-semibold text-white">Comentarios:</span> {r.comments}</p>}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href="/reportar-estafa" className="text-blue-400 hover:underline text-sm">
            ← Volver al formulario
          </a>
        </div>
      </div>
    </div>
  );
}