import { useEffect } from "react";

type FareBreakdownItem = {
  label: string;
  amount: number;
};

type FareDetails = {
  total: number;
  airfare: number;
  taxesAndFeesTotal: number;
  breakdown: FareBreakdownItem[];
  note: string;
};

export function FareDetailsModal({
  open,
  onClose,
  fare,
}: {
  open: boolean;
  onClose: () => void;
  fare: FareDetails;
}) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 grid place-items-center px-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          aria-label="Close modal"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">Fare Details</h2>
        <ul className="text-sm space-y-1">
          <li><strong>Total per passenger:</strong> ${fare.total.toFixed(2)}</li>
          <li><strong>Airfare:</strong> ${fare.airfare.toFixed(2)}</li>
          <li><strong>Taxes, fees, and charges:</strong> ${fare.taxesAndFeesTotal.toFixed(2)}</li>
          <ul className="pl-5 list-disc text-gray-700">
            {fare.breakdown.map((item, idx) => (
              <li key={idx}>
                {item.label}: ${item.amount.toFixed(2)}
              </li>
            ))}
          </ul>
        </ul>
        <p className="text-xs text-gray-500 mt-4">{fare.note}</p>
      </div>
    </div>
  );
}
