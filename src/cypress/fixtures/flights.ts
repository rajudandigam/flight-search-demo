export type SearchParams = {
  from?: string; to?: string; depart?: string; pax?: number | string; cabin?: string; tripType?: string;
};

export function buildFlights(params: SearchParams = {}, n = 4) {
  const from = params.from ?? 'SFO';
  const to = params.to ?? 'JFK';
  return Array.from({ length: n }, (_, i) => ({
    id: `${from}${to}-${i + 1}`,
    carrier: i % 2 ? 'United' : 'American',
    from, to,
    depart: new Date(Date.now() + (i + 1) * 45 * 60 * 1000).toISOString(),
    arrive: new Date(Date.now() + (i + 1) * 45 * 60 * 1000 + 6 * 3600 * 1000).toISOString(),
    durationMins: 360 + i * 15,
    stops: i % 3 === 0 ? 1 : 0,
    price: 420 + i * 35,
    currency: 'USD',
  }));
}
