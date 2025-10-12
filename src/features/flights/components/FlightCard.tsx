type Flight = {
  id: string; carrier: string;
  depart: string; arrive: string;
  from: string; to: string;
  durationMins: number; stops: number;
  price: number; currency: string;
};

export function FlightCard({ flight }: { flight: Flight }) {
  const d = new Date(flight.depart).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const a = new Date(flight.arrive).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return (
    <div className="card flex items-center justify-between">
      <div>
        <div className="text-sm text-gray-600">{flight.carrier} • {flight.id}</div>
        <div className="text-lg font-semibold">{flight.from} {d} → {flight.to} {a}</div>
        <div className="text-sm text-gray-600">{flight.stops === 0 ? "Nonstop" : `${flight.stops} stop`} • {Math.round(flight.durationMins / 60)}h {flight.durationMins % 60}m</div>
      </div>
      <div className="text-right">
        <div className="text-xl font-bold">{flight.currency} {flight.price.toFixed(0)}</div>
        <div className="text-xs text-gray-500">per traveler</div>
      </div>
    </div>
  );
}
