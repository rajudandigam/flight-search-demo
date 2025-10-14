import { useRef } from "react";
import DestinationCard from "./DestinationCard";

const DESTINATIONS = [
  {
    title: "Paris",
    subtitle: "Île-de-France, France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
    priceHint: "$240|avg. nightly price",
  },
  {
    title: "San Francisco",
    subtitle: "California, USA",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop",
    priceHint: "$287|avg. nightly price",
  },
  {
    title: "Tokyo",
    subtitle: "Kantō, Japan",
    image:
      "https://images.unsplash.com/photo-1557409518-691ebcd96038?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
    priceHint: "$210|avg. nightly price",
  },
  {
    title: "New York",
    subtitle: "New York, USA",
    image:
      "https://images.unsplash.com/photo-1546436836-07a91091f160?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1748",
    priceHint: "$305|avg. nightly price",
  },
  {
    title: "Honolulu",
    subtitle: "Hawaii, USA",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    priceHint: "$268|avg. nightly price",
  },
  {
    title: "London",
    subtitle: "England, UK",
    image:
      "https://images.unsplash.com/photo-1473959383417-1a23b4f7f04d?q=80&w=1600&auto=format&fit=crop",
    priceHint: "$280|avg. nightly price",
  },
];


export default function Discover() {
  const scroller = useRef<HTMLDivElement>(null);

  const scrollBy = (delta: number) => {
    scroller.current?.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section className="inner mt-10 md:mt-12">
      <header className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Explore stays in popular destinations
          </h2>
          <p className="mt-1 text-gray-600 text-sm">
            Average prices based on the current calendar month
          </p>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            aria-label="Scroll left"
            className="h-9 w-9 rounded-full border bg-white hover:bg-gray-50 grid place-items-center"
            onClick={() => scrollBy(-320)}
          >
            ‹
          </button>
          <button
            aria-label="Scroll right"
            className="h-9 w-9 rounded-full border bg-white hover:bg-gray-50 grid place-items-center"
            onClick={() => scrollBy(320)}
          >
            ›
          </button>
        </div>
      </header>

      <div
        ref={scroller}
        className="mt-4 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <style>{`.mt-4::-webkit-scrollbar{display:none}`}</style>
        {DESTINATIONS.map((d) => (
          <div key={d.title} className="snap-start">
            <DestinationCard {...d} />
          </div>
        ))}
      </div>
    </section>
  );
}
