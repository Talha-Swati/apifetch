export default function ProductCard({ p }) {
  return (
    <li className="rounded-xl border border-slate-800 bg-[#141a22] overflow-hidden hover:-translate-y-0.5 transition transform">
      <div className="grid h-40 place-items-center bg-[#0f141b]">
        <img
          src={p.thumbnail}
          alt={p.title}
          className="max-h-40 w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="p-3 space-y-1">
        <h3 className="text-sm font-semibold leading-tight line-clamp-2" title={p.title}>
          {p.title}
        </h3>
        <p className="text-xs text-slate-400">
          {p.brand} • {p.category}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="font-bold text-green-300">${p.price}</span>
          <span className="text-xs text-yellow-300">★ {p.rating}</span>
        </div>
      </div>
    </li>
  );
}
