"use client";
import { useState } from 'react';

export type FiltersState = {
  q: string;
  city: string;
  category: string;
  maxPrice: number;
};

export function Filters({ onApply }: { onApply: (f: FiltersState) => void }) {
  const [state, setState] = useState<FiltersState>({
    q: '',
    city: '',
    category: '',
    maxPrice: 200,
  });

  return (
    <aside className="card p-4 h-fit">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Hakusana</label>
          <input
            className="input mt-1"
            placeholder="esim. logo / hääkuvat"
            value={state.q}
            onChange={(e) => setState((s) => ({ ...s, q: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Paikkakunta</label>
          <input
            className="input mt-1"
            placeholder="esim. Helsinki"
            value={state.city}
            onChange={(e) => setState((s) => ({ ...s, city: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Ala</label>
          <select
            className="input mt-1"
            value={state.category}
            onChange={(e) => setState((s) => ({ ...s, category: e.target.value }))}
          >
            <option value="">Kaikki</option>
            <option>Valokuvaus</option>
            <option>Graafinen suunnittelu</option>
            <option>Verkkosivut</option>
            <option>Kääntäminen</option>
            <option>Kirjanpito</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Tuntihinta (max)</label>
          <input
            type="range"
            min={20}
            max={200}
            value={state.maxPrice}
            onChange={(e) =>
              setState((s) => ({ ...s, maxPrice: Number(e.target.value) }))
            }
            className="w-full"
          />
          <div className="text-xs text-slate-600">Max: {state.maxPrice} €/h</div>
        </div>
        <button
          className="btn btn-primary w-full"
          onClick={() => onApply(state)}
        >
          Käytä suodattimet
        </button>
      </div>
    </aside>
  );
}
