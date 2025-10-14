import { hm, hhmm } from "./time";

export type Flight = {
  id: string;
  carrier: string;
  from: string; to: string;
  depart: string; arrive: string;
  durationMins: number; stops: number;
  price: number; currency: string;
  baggageNote?: string;
  logoUrl?: string;
};

function CarrierLogo({ src, alt }: { src?: string; alt: string }) {
  if (!src) {
    return (
      <div className="h-12 w-12 rounded-xl bg-gray-900 text-white grid place-items-center text-sm font-semibold">
        ✈️
      </div>
    );
  }
  return (
    <div className="h-12 w-12 rounded-xl bg-white border grid place-items-center overflow-hidden">
      {/* constrain logo to box; many airline logos are wider than tall */}
      <img src={src} alt={`${alt} logo`} className="max-h-10 max-w-[44px] object-contain" loading="lazy" />
    </div>
  );
}

export function FlightCard({ flight }: { flight: Flight }) {
  const d = hhmm(flight.depart);
  const a = hhmm(flight.arrive);
  const stopsLabel = flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`;

  return (
    <article className="w-full bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_220px_180px] gap-4 items-center md:p-4 p-3">
        {/* Left: logo */}
        <div className="flex items-center justify-center md:justify-start">
          <CarrierLogo src={flight.logoUrl} alt={flight.carrier} />
        </div>

        {/* Col 2: times/route + airline name below */}
        <div className="min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="text-lg font-semibold tabular-nums">{d}</div>
            <div className="text-gray-400">—</div>
            <div className="text-lg font-semibold tabular-nums">{a}</div>
            <div className="text-sm text-gray-600 truncate">{flight.from} → {flight.to}</div>
          </div>
          <div className="mt-1 text-sm text-gray-600">{flight.carrier} • <span className="text-gray-500">#{flight.id}</span></div>
          {flight.baggageNote && (
            <div className="mt-1 text-xs text-gray-500">{flight.baggageNote}</div>
          )}
        </div>

        {/* Col 3: duration + stops (own column) */}
        <div className="hidden md:flex md:flex-col md:items-start gap-1">
          <div className="inline-flex items-center gap-2">
            <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-900 text-sm font-medium">
              {hm(flight.durationMins)}
            </span>
          </div>
          <div className="text-sm text-gray-600">{stopsLabel}</div>
        </div>

        {/* Right: price + select */}
        <div className="text-right">
          <div className="text-xl font-bold tabular-nums">{flight.currency} {Math.round(flight.price)}</div>
          <div className="text-xs text-gray-500 mb-2">per traveler</div>
          <button className="btn btn-primary w-full md:w-auto">Select</button>
        </div>
      </div>
    </article>
  );
}
