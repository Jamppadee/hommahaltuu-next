"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { ProfileCard } from '@/components/ProfileCard';
import { Filters, type FiltersState } from '@/components/Filters';

export default function Search() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function load(f?: FiltersState) {
    setLoading(true);
    let q = supabase.from('profiles').select('*').eq('approved', true);
    if (f?.q) q = q.ilike('about', `%${f.q}%`);
    if (f?.city) q = q.ilike('city', `%${f.city}%`);
    if (f?.category) q = q.eq('category', f.category);
    if (f?.maxPrice) q = q.lte('price', f.maxPrice);
    const { data } = await q.limit(30);
    setItems(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-6">Selaa osaajia</h1>
      <div className="grid md:grid-cols-[280px,1fr] gap-6">
        <Filters onApply={load} />
        <div>
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="card p-4 animate-pulse h-56" />
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((p) => (
                <ProfileCard key={p.id} {...p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
