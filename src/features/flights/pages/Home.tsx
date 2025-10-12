import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/common/Button";
import { Field, TextInput } from "../../../components/common/Field";
import { useState } from "react";

export default function Home() {
  const nav = useNavigate();
  const [from, setFrom] = useState("SFO");
  const [to, setTo] = useState("JFK");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [pax, setPax] = useState(1);

  return (
    <div className="container">
      <div className="mt-10 card">
        <h1 className="text-2xl font-semibold mb-4">Flight Search</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Field label="From">
            <TextInput value={from} onChange={e => setFrom(e.target.value.toUpperCase())} placeholder="SFO" />
          </Field>
          <Field label="To">
            <TextInput value={to} onChange={e => setTo(e.target.value.toUpperCase())} placeholder="JFK" />
          </Field>
          <Field label="Depart">
            <TextInput type="date" value={date} onChange={e => setDate(e.target.value)} />
          </Field>
          <Field label="Passengers">
            <TextInput type="number" min={1} value={pax} onChange={e => setPax(Number(e.target.value) || 1)} />
          </Field>
        </div>
        <div className="mt-6">
          <Button variant="primary" onClick={() => {
            const qs = new URLSearchParams({ from, to, depart: date, pax: String(pax) }).toString();
            nav(`/results?${qs}`);
          }}>
            Search Flights
          </Button>
        </div>
      </div>
    </div>
  );
}
