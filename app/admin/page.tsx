"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Admin() {
  const [items, setItems] = useState<any[]>([]);

  async function load() {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    setItems(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function setApprove(id: string, state: boolean) {
    const { error } = await supabase
      .from('profiles')
      .update({ approved: state })
      .eq('id', id);
    if (error) alert(error.message);
    else load();
  }

  async function releasePayment(profileId: string) {
    const res = await fetch('/api/escrow/release', {
      method: 'POST',
      body: JSON.stringify({ profileId }),
    });
    const j = await res.json();
    alert(j.ok ? 'Maksu vapautettu.' : 'Virhe: ' + j.error);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-4">
        Admin – hyväksy profiileja & vapauta maksuja
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <article key={p.id} className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-slate-600">
                  {p.title} • {p.city}
                </div>
              </div>
              <div className="text-xs">{p.approved ? 'Hyväksytty' : 'Odottaa'}</div>
            </div>
            <div className="mt-3 flex gap-2">
              {p.approved ? (
                <button
                  className="btn btn-outline"
                  onClick={() => setApprove(p.id, false)}
                >
                  Peru hyväksyntä
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => setApprove(p.id, true)}
                >
                  Hyväksy
                </button>
              )}
              <button
                className="btn btn-outline"
                onClick={() => releasePayment(p.id)}
              >
                Vapauta maksu
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
