import { useState } from "react";
import { hm, hhmm } from "./time";
import { FareDetailsModal } from "./FareDetailsModal";

export type FareDetails = {
  total: number;
  airfare: number;
  taxesAndFeesTotal: number;
  breakdown: { label: string; amount: number }[];
  note: string;
};

export type Flight = {
  id: string;
  carrier: string;
  from: string;
  to: string;
  depart: string;
  arrive: string;
  durationMins: number;
  stops: number;
  price: number;
  currency: string;
  baggageNote?: string;
  logoUrl?: string;
  fareDetails?: FareDetails;
};

type Props = {
  flight: Flight;
  onSelect?: (flight: Flight) => void;
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
      <img
        src={src}
        alt={`${alt} logo`}
        className="max-h-10 max-w-[44px] object-contain"
        loading="lazy"
      />
    </div>
  );
}

export function FlightCard({ flight, onSelect }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const d = hhmm(flight.depart);
  const a = hhmm(flight.arrive);
  const isLongHaul = flight.durationMins >= 600;
  const stopsLabel =
    flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`;

  return (
    <>
      <article data-cy={`flight-card-${flight.id}`} className="w-full bg-white rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 md:grid-cols-[80px_1fr_160px_140px_120px] gap-4 items-center md:p-4 p-3">

          <div className="flex items-center justify-center md:justify-start">
            <CarrierLogo src={flight.logoUrl} alt={flight.carrier} />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="text-lg font-semibold tabular-nums">{d}</div>
              <div className="text-gray-400">—</div>
              <div className="text-lg font-semibold tabular-nums">{a}</div>
              <div className="text-sm text-gray-600 truncate">
                {flight.from} → {flight.to}
              </div>
            </div>
            <div className="mt-1 text-sm text-gray-600">
              {flight.carrier} • <span className="text-gray-500">#{flight.id}</span>
            </div>
            {flight.baggageNote && (
              <div className="mt-1 text-xs text-gray-500">{flight.baggageNote}</div>
            )}
          </div>

          <div className="hidden md:flex md:flex-col md:items-start gap-1">
            <div className="inline-flex items-center gap-2">
              <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-900 text-sm font-medium">
                {hm(flight.durationMins)}
              </span>

              {isLongHaul && (
                <span
                  data-testid="longhaul-badge"
                  className="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-800 text-xs font-medium"
                >
                  Long-haul
                </span>
              )}
            </div>
            <div className="text-sm text-gray-600">{stopsLabel}</div>
          </div>

          <div className="flex flex-col items-end md:items-start text-right md:text-left">
            <div className="text-xl font-bold tabular-nums">
              {flight.currency} {Math.round(flight.price)}
            </div>
            <div className="text-xs text-gray-500">per traveler</div>
            <button
              data-cy="fare-details-button"
              className="text-sm text-blue-600 hover:underline mt-1"
              onClick={() => setModalOpen(true)}
            >
              View Fare Details
            </button>
          </div>

          <div className="text-right md:text-left">
            <button data-cy="select-button" className="btn btn-primary w-full md:w-auto" onClick={() => onSelect?.(flight)}>Select</button>
          </div>

        </div>
      </article>

      {modalOpen && flight.fareDetails && (
        <FareDetailsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          fare={flight.fareDetails}
        />
      )}
    </>
  );
}
