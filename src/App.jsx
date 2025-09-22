import { useEffect, useMemo, useState } from "react";
import Filters from "./components/Filters.jsx";
import ProductCard from "./components/ProductCard.jsx";

const API_URL = "https://dummyjson.com/products?limit=100";

export default function App() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [query, setQuery] = useState("");
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        const items = data.products || [];
        setAll(items);

        const prices = items.map(p => Number(p.price) || 0);
        const pMin = Math.floor(Math.min(...prices));
        const pMax = Math.ceil(Math.max(...prices));
        setMin(pMin); setMax(pMax);
        setFrom(pMin); setTo(pMax);
      } catch (e) {
        setErr(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter(p => {
      const textOk =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q);

      const priceOk = Number(p.price) >= Number(from) && Number(p.price) <= Number(to);
      return textOk && priceOk;
    });
  }, [all, query, from, to]);

  return (
    <div className="min-h-screen bg-[#0b0f14] text-slate-100">
      <div className="mx-auto max-w-6xl p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">My Products</h1>

        <Filters
          query={query}
          setQuery={setQuery}
          min={min} max={max} from={from} to={to}
          setFrom={setFrom} setTo={setTo}
        />

        {loading && <p className="text-slate-400 mt-6">Loading products…</p>}
        {err && <p className="text-red-400 mt-6">Error: {err}</p>}

        {!loading && !err && (
          filtered.length === 0 ? (
            <p className="text-slate-400 mt-6">No products match your filters.</p>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map(p => (
                <ProductCard key={p.id} p={p} />
              ))}
            </ul>
          )
        )}
      </div>
    </div>
  );
}
