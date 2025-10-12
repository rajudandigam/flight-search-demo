import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FlightCard } from "../components/FlightCard";

type Flight = Parameters<typeof FlightCard>[0]["flight"];

export default function Results() {
  const [sp] = useSearchParams();
  const [flights, setFlights] = useState<Flight[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFlights(null); setError(null);
    const params = Object.fromEntries(sp.entries());
    fetch("/api/flights/search", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(params) })
      .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
      .then(data => setFlights(data.flights))
      .catch(e => setError(String(e)));
  }, [sp]);

  return (
    <div className="container">
      <h1 className="text-2xl font-semibold mt-10 mb-4">Results</h1>
      {!flights && !error && <div className="card">Loading…</div>}
      {error && <div className="card text-red-600">Error: {error}</div>}
      {flights && flights.length === 0 && <div className="card">No flights found.</div>}
      <div className="space-y-4">
        {flights?.map(f => <FlightCard key={f.id} flight={f} />)}
      </div>
    </div>
  );
}
