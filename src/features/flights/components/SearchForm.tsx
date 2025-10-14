import { useState, useEffect, type FormEvent } from "react";
import { Button } from "../../../components/common/Button";
import { Field, TextInput } from "../../../components/common/Field";

export type TripType = "ONE_WAY" | "ROUND_TRIP" | "MULTI_CITY";

export type SearchFormProps = {
  initial?: { from?: string; to?: string; depart?: string; pax?: number; cabin?: string; tripType?: TripType };
  showCorpPolicyBanner?: boolean;
  multiCityEnabled?: boolean;
  onSubmit?: (payload: any) => void;
};

export function SearchForm({ initial, showCorpPolicyBanner, multiCityEnabled = true, onSubmit }: SearchFormProps) {
  const today = new Date(); today.setDate(today.getDate() + 7);
  const d7 = today.toISOString().slice(0, 10);

  const [from, setFrom] = useState(initial?.from ?? "");
  const [to, setTo] = useState(initial?.to ?? "");
  const [depart, setDepart] = useState(initial?.depart ?? d7);
  const [pax, setPax] = useState(initial?.pax ?? 1);
  const [cabin, setCabin] = useState(initial?.cabin ?? "ECONOMY");
  const [tripType, setTripType] = useState<TripType>(initial?.tripType ?? "ONE_WAY");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setErrors([]);
    if (!from.trim()) setErrors(e => [...e, "From is required"]);
    if (!to.trim()) setErrors(e => [...e, "To is required"]);
    if (from.trim() && to.trim() && from.toUpperCase() === to.toUpperCase()) setErrors(e => [...e, "From and To cannot match"]);
    if (new Date(depart) < new Date(new Date().toISOString().slice(0, 10))) setErrors(e => [...e, "Depart date cannot be in the past"]);
    if (pax < 1) setErrors(e => [...e, "Passengers must be at least 1"]);
  }, [from, to, depart, pax]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (errors.length) return;
    const payload = { from: from.toUpperCase(), to: to.toUpperCase(), depart, pax, cabin, tripType };
    onSubmit?.(payload);
  };

  return (
    <form className="card space-y-4" onSubmit={submit} aria-label="Flight Search Form">
      <h2 className="text-xl font-semibold">Flight Search</h2>

      {showCorpPolicyBanner && (
        <div role="status" aria-live="polite" className="rounded-xl border border-amber-300 bg-amber-50 p-2 text-amber-900">
          Corporate policy: Premium Economy or above requires approval.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Field label="From">
          <TextInput aria-label="From" value={from} onChange={e => setFrom(e.target.value.toUpperCase())} placeholder="SFO" />
        </Field>
        <Field label="To">
          <TextInput aria-label="To" value={to} onChange={e => setTo(e.target.value.toUpperCase())} placeholder="JFK" />
        </Field>
        <Field label="Depart">
          <TextInput aria-label="Depart" type="date" value={depart} onChange={e => setDepart(e.target.value)} />
        </Field>
        <Field label="Passengers">
          <TextInput aria-label="Passengers" type="number" min={1} value={pax} onChange={e => setPax(Number(e.target.value) || 1)} />
        </Field>
        <Field label="Cabin">
          <select aria-label="Cabin" className="input" value={cabin} onChange={e => setCabin(e.target.value)}>
            <option>ECONOMY</option><option>PREMIUM_ECONOMY</option><option>BUSINESS</option><option>FIRST</option>
          </select>
        </Field>
      </div>

      <fieldset className="flex gap-3" aria-label="Trip Type">
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="tt" checked={tripType === 'ONE_WAY'} onChange={() => setTripType('ONE_WAY')} /> One-way
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="radio" name="tt" checked={tripType === 'ROUND_TRIP'} onChange={() => setTripType('ROUND_TRIP')} /> Round-trip
        </label>
        <label className={`inline-flex items-center gap-2 ${!multiCityEnabled ? 'opacity-50' : ''}`} title={!multiCityEnabled ? 'Disabled by org policy' : ''}>
          <input type="radio" name="tt" disabled={!multiCityEnabled} checked={tripType === 'MULTI_CITY'} onChange={() => setTripType('MULTI_CITY')} /> Multi-city
        </label>
      </fieldset>

      {errors.length > 0 && (
        <div role="alert" aria-live="assertive" className="rounded-xl border border-red-300 bg-red-50 p-2 text-red-800">
          <ul className="list-disc pl-5">{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      )}

      <div>
        <Button variant="primary" type="submit" aria-disabled={errors.length > 0} disabled={errors.length > 0}>Search Flights</Button>
      </div>
    </form>
  );
}
