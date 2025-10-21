import Header from "../components/layout/Header";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FlightCard } from "../components/FlightCard";

type Flight = Parameters<typeof FlightCard>[0]["flight"];

export default function Results() {
  const [sp] = useSearchParams();
  const nav = useNavigate();
  const [flights, setFlights] = useState<Flight[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFlights(null); setError(null);
    const params = Object.fromEntries(sp.entries());
    fetch("/api/flights/search", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then((data) => setFlights(data.flights))
      .catch((e) => setError(String(e)));
  }, [sp]);

  const handleSelect = (flight: Flight) => {
    nav("/checkout", {
      state: {
        flight,
        search: Object.fromEntries(sp.entries()),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-white">
        <div className="inner py-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Results</h1>
          <p className="mt-1 text-gray-600">Prices shown are per traveler, inclusive of basic fees.</p>
        </div>
      </section>

      <main>
        <div className="panel">
          <div className="panel-body space-y-4">
            {!flights && !error && <div className="card">Loading…</div>}
            {error && <div className="card text-red-600">Error: {error}</div>}
            {flights && flights.length === 0 && <div className="card">No flights found.</div>}
            {flights?.map((f) => <FlightCard key={f.id} flight={f} onSelect={handleSelect} />)}
          </div>
        </div>

        <div className="h-10" />
      </main>
    </div>
  );
}
