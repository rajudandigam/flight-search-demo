export const sampleFlights = (params: any) => {
  const { from = "SFO", to = "JFK", depart = "2025-11-02", pax = "1" } = params || {};
  return [
    { id: "UA123", carrier: "United", from, to, depart: `${depart}T08:00:00Z`, arrive: `${depart}T16:20:00Z`, durationMins: 500, stops: 0, price: 428, currency: "USD" },
    { id: "DL456", carrier: "Delta", from, to, depart: `${depart}T09:15:00Z`, arrive: `${depart}T17:35:00Z`, durationMins: 500, stops: 1, price: 399, currency: "USD" },
    { id: "AA789", carrier: "American", from, to, depart: `${depart}T11:05:00Z`, arrive: `${depart}T19:25:00Z`, durationMins: 500, stops: 0, price: 455, currency: "USD" },
  ].map(f => ({ ...f, price: f.price * Number(pax || 1) }));
};
