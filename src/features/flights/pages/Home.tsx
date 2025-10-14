import Header from "../components/layout/Header";
import { SearchForm } from "../components/SearchForm";
import { useNavigate } from "react-router-dom";
import Discover from "../../discover/Discover";

export default function Home() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <section className="bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40">
        <div className="inner py-10 md:py-14">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">Find your next flight—fast.</h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Compare options across airlines and book with confidence. Simple search, clean results.
          </p>
        </div>
      </section>

      <main>
        <div className="panel">
          <div className="panel-body">
            <SearchForm
              onSubmit={(payload) => {
                const qs = new URLSearchParams({
                  from: payload.from,
                  to: payload.to,
                  depart: payload.depart,
                  pax: String(payload.pax),
                  cabin: payload.cabin,
                  tripType: payload.tripType,
                }).toString();
                nav(`/results?${qs}`);
              }}
              multiCityEnabled={false}
            />
          </div>
        </div>

        <Discover />

        <div className="h-10" />
      </main>
    </div>
  );
}
