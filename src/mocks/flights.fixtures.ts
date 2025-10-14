const LOGOS: Record<string, string> = {
  American: "https://1000logos.net/wp-content/uploads/2016/10/American-Airlines-Logo-500x313.png",
  Delta: "https://1000logos.net/wp-content/uploads/2017/09/Delta-Air-Lines-Logo-500x313.png",
  United: "https://1000logos.net/wp-content/uploads/2017/06/United-Airlines-Logo-500x313.png",
  Qatar: "https://1000logos.net/wp-content/uploads/2020/03/Qatar-Airways-Logo-500x313.png",
  Singapore: "https://1000logos.net/wp-content/uploads/2020/04/Singapore-Airlines-Logo-500x313.png",
};

export const sampleFlights = (params: any) => {
  const { from = "SFO", to = "JFK", depart = "2025-11-02", pax = "1" } = params || {};
  const flights = [
    { id: "UA123", carrier: "United", from, to, depart: `${depart}T08:00:00Z`, arrive: `${depart}T16:20:00Z`, durationMins: 500, stops: 0, price: 428, currency: "USD" },
    { id: "DL456", carrier: "Delta", from, to, depart: `${depart}T09:15:00Z`, arrive: `${depart}T17:35:00Z`, durationMins: 500, stops: 1, price: 399, currency: "USD" },
    { id: "AA789", carrier: "American", from, to, depart: `${depart}T11:05:00Z`, arrive: `${depart}T19:25:00Z`, durationMins: 500, stops: 0, price: 455, currency: "USD" },
    { id: "QR212", carrier: "Qatar", from, to, depart: `${depart}T12:40:00Z`, arrive: `${depart}T21:05:00Z`, durationMins: 505, stops: 1, price: 472, currency: "USD" },
    { id: "SQ318", carrier: "Singapore", from, to, depart: `${depart}T13:30:00Z`, arrive: `${depart}T22:10:00Z`, durationMins: 520, stops: 0, price: 489, currency: "USD" },
    { id: "UA221", carrier: "United", from, to, depart: `${depart}T14:05:00Z`, arrive: `${depart}T22:30:00Z`, durationMins: 505, stops: 0, price: 438, currency: "USD" },
    { id: "DL778", carrier: "Delta", from, to, depart: `${depart}T15:10:00Z`, arrive: `${depart}T23:40:00Z`, durationMins: 510, stops: 1, price: 392, currency: "USD" },
  ];

  return flights.map(f => ({
    ...f,
    price: f.price * Number(pax || 1),
    logoUrl: LOGOS[f.carrier] ?? undefined,
  }));
};
