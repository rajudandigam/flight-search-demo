type Props = {
  image: string;
  title: string;
  subtitle?: string;
  priceHint?: string;
};

export default function DestinationCard({ image, title, subtitle, priceHint }: Props) {
  return (
    <article className="w-[280px] shrink-0 rounded-2xl border bg-white shadow-sm overflow-hidden hover:shadow-md focus-within:shadow-md transition-shadow">
      <div className="h-40 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        {priceHint && (
          <div className="mt-2">
            <div className="text-lg font-bold">{priceHint.split('|')[0]}</div>
            <div className="text-xs text-gray-500">{priceHint.split('|')[1]}</div>
          </div>
        )}
      </div>
    </article>
  );
}
