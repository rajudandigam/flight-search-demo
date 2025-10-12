import { FlightCard } from './FlightCard';
export default { title: 'Flights/FlightCard', component: FlightCard };

const base = {
  id: "UA123", carrier: "United", from: "SFO", to: "JFK",
  depart: "2025-11-02T08:00:00Z", arrive: "2025-11-02T16:20:00Z",
  durationMins: 500, stops: 0, price: 428, currency: "USD"
};

export const Default = { args: { flight: base } };
