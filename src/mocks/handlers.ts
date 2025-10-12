import { http, HttpResponse } from "msw";
import { sampleFlights } from "./flights.fixtures";

export const handlers = [
  http.post("/api/flights/search", async ({ request }) => {
    const body = await request.json().catch(() => ({}));
    const flights = sampleFlights(body);
    return HttpResponse.json({ flights }, { status: 200 });
  }),
];
