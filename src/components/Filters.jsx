export default function Filters({
  query, setQuery,
  min, max, from, to, setFrom, setTo
}) {
  return (
    <div className="mt-4 space-y-3 rounded-xl border border-slate-800 bg-[#11161d] p-4">
      {/* Search */}
      <input
        type="search"
        placeholder="Search by name, brand, or category…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 outline-none placeholder:text-slate-400"
      />

      {/* Range sliders */}
      <div className="grid gap-2">
        <input
          type="range"
          min={min}
          max={max}
          value={from}
          onChange={(e) => setFrom(Math.min(Number(e.target.value), to))}
          className="w-full accent-blue-600"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={to}
          onChange={(e) => setTo(Math.max(Number(e.target.value), from))}
          className="w-full accent-blue-600"
        />
      </div>

      {/* Numeric fields */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-2 py-1">
          <span className="text-sm text-slate-400">Min</span>
          <input
            type="number"
            value={from}
            min={min}
            max={to}
            onChange={(e) => setFrom(Number(e.target.value))}
            className="w-24 bg-transparent outline-none"
          />
        </label>

        <label className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-2 py-1">
          <span className="text-sm text-slate-400">Max</span>
          <input
            type="number"
            value={to}
            min={from}
            max={max}
            onChange={(e) => setTo(Number(e.target.value))}
            className="w-24 bg-transparent outline-none"
          />
        </label>

        <span className="text-sm text-slate-400">Range: {from} – {to}</span>
      </div>
    </div>
  );
}
