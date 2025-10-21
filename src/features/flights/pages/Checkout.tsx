import Header from "../components/layout/Header";
import { useLocation, Link } from "react-router-dom";
import type { Flight } from "../components/FlightCard";
import { hhmm, hm } from "../components/time";

type LocationState = { flight?: Flight; search?: Record<string, string> };

export default function Checkout() {
  const { state } = useLocation() as { state?: LocationState };
  const flight = state?.flight;

  const prefill = {
    first: "Raju",
    last: "Dandigam",
    dob: "1990-01-01",
    email: "raju@example.com",
    cardNumber: "**** 4242",
    cardName: "Raju Dandigam",
    exp: "12/28",
    cvc: "123",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-white">
        <div className="inner py-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>
          <p className="mt-1 text-gray-600">Review your trip, add passenger & payment details, then book.</p>
        </div>
      </section>

      <main className="inner">
        {!flight ? (
          <div className="panel my-6">
            <div className="panel-body p-6">
              <p className="text-gray-700">No flight selected.</p>
              <Link className="btn btn-primary mt-3 inline-block" to="/results">
                Back to results
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="panel lg:hidden">
                <div className="panel-header px-6 py-4">Trip summary</div>
                <div className="panel-body p-6 text-sm text-gray-700 space-y-1">
                  <div className="font-medium">
                    {flight.carrier} • #{flight.id}
                  </div>
                  <div>
                    {flight.from} → {flight.to} ({hm(flight.durationMins)},{" "}
                    {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`})
                  </div>
                  <div>
                    {hhmm(flight.depart)} – {hhmm(flight.arrive)}
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-header px-6 py-4">Passenger details</div>
                <div className="panel-body p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label" htmlFor="first">First name</label>
                    <input id="first" className="input" data-cy="passenger-first" defaultValue={prefill.first} />
                  </div>
                  <div>
                    <label className="label" htmlFor="last">Last name</label>
                    <input id="last" className="input" data-cy="passenger-last" defaultValue={prefill.last} />
                  </div>
                  <div>
                    <label className="label" htmlFor="dob">Date of birth</label>
                    <input id="dob" type="date" className="input" data-cy="passenger-dob" defaultValue={prefill.dob} />
                  </div>
                  <div>
                    <label className="label" htmlFor="email">Email</label>
                    <input id="email" type="email" className="input" data-cy="passenger-email" defaultValue={prefill.email} />
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-header px-6 py-4">Payment</div>
                <div className="panel-body p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="label" htmlFor="card-number">Card number</label>
                    <input
                      id="card-number"
                      className="input"
                      inputMode="numeric"
                      data-cy="card-number"
                      defaultValue={prefill.cardNumber}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label" htmlFor="card-name">Name on card</label>
                    <input id="card-name" className="input" data-cy="card-name" defaultValue={prefill.cardName} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:col-span-2">
                    <div>
                      <label className="label" htmlFor="card-exp">Expiry</label>
                      <input id="card-exp" className="input" data-cy="card-exp" defaultValue={prefill.exp} />
                    </div>
                    <div>
                      <label className="label" htmlFor="card-cvc">CVC</label>
                      <input id="card-cvc" className="input" data-cy="card-cvc" defaultValue={prefill.cvc} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel">
                <div className="panel-header px-6 py-4">Cancellation policy</div>
                <div className="panel-body p-6 text-sm text-gray-700 space-y-2">
                  <p>
                    This fare is <span className="font-medium">non-refundable</span>. Changes permitted with airline fee and fare
                    difference. No-show may forfeit remaining value.
                  </p>
                  <p>Tickets are issued by the operating carrier. See full fare rules at booking confirmation.</p>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="panel sticky top-4">
                <div className="panel-header px-6 py-4">Trip summary</div>
                <div className="panel-body p-6 text-sm text-gray-700 space-y-3">
                  <div className="font-medium">
                    {flight.carrier} • #{flight.id}
                  </div>
                  <div className="flex justify-between">
                    <span>
                      {flight.from} → {flight.to}
                    </span>
                    <span>{hm(flight.durationMins)}</span>
                  </div>
                  <div>
                    {hhmm(flight.depart)} – {hhmm(flight.arrive)} (
                    {flight.stops === 0 ? "Nonstop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`})
                  </div>
                  {flight.baggageNote && <div className="text-gray-500">{flight.baggageNote}</div>}

                  <div className="border-t my-3" />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>
                      {flight.currency} {Math.round(flight.price)}
                    </span>
                  </div>

                  <button
                    className="w-full mt-4 inline-flex items-center justify-center rounded-xl bg-black px-4 py-3 text-white text-base font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black/40"
                    data-cy="book-button"
                  >
                    Book flight
                  </button>

                  <Link to="/results" className="btn btn-ghost w-full mt-2">
                    Back to results
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <div className="h-10" />
    </div>
  );
}
