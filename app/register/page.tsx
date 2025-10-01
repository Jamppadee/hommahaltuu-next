"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Register() {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        location.href = '/login';
        return;
      }
      const uid = session.user.id;
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', uid)
        .maybeSingle();
      if (data) setForm(data);
    })();
  }, []);

  async function save() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const uid = session.user.id;
    const payload = {
      ...form,
      user_id: uid,
      price: form.price ? Number(form.price) : null,
      tags: String(form.tags || '')
        .split(',')
        .map((s: string) => s.trim())
        .filter(Boolean),
    };
    const { data: mine } = await supabase
      .from('profiles')
      .select('id, approved')
      .eq('user_id', uid)
      .maybeSingle();
    const q = mine
      ? supabase.from('profiles').update(payload).eq('id', mine.id)
      : supabase.from('profiles').insert(payload);
    const res = await q.select();
    if (res.error) alert(res.error.message);
    else alert('Tallennettu. Admin hyväksyy ennen julkaisua.');
  }

  return (
    <section className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold">Tilini & Profiili</h1>
      <div className="card p-4 mt-4 grid gap-3">
        <input
          className="input"
          placeholder="Nimi"
          value={form.name || ''}
          onChange={(e) => setForm((s: any) => ({ ...s, name: e.target.value }))}
        />
        <input
          className="input"
          placeholder="Otsikko (esim. Valokuvaaja)"
          value={form.title || ''}
          onChange={(e) => setForm((s: any) => ({ ...s, title: e.target.value }))}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            className="input"
            placeholder="Paikkakunta"
            value={form.city || ''}
            onChange={(e) => setForm((s: any) => ({ ...s, city: e.target.value }))}
          />
          <select
            className="input"
            value={form.category || ''}
            onChange={(e) => setForm((s: any) => ({ ...s, category: e.target.value }))}
          >
            <option>Valokuvaus</option>
            <option>Graafinen suunnittelu</option>
            <option>Verkkosivut</option>
            <option>Kääntäminen</option>
            <option>Kirjanpito</option>
          </select>
          <input
            className="input"
            placeholder="€/h"
            value={form.price || ''}
            onChange={(e) => setForm((s: any) => ({ ...s, price: e.target.value }))}
          />
        </div>
        <input
          className="input"
          placeholder="Tunnisteet pilkuilla (Hääkuvat, Potretit)"
          value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags || ''}
          onChange={(e) => setForm((s: any) => ({ ...s, tags: e.target.value }))}
        />
        <textarea
          className="input"
          rows={5}
          placeholder="Kuvaus"
          value={form.about || ''}
          onChange={(e) => setForm((s: any) => ({ ...s, about: e.target.value }))}
        />
        <input
          className="input"
          placeholder="Kuva (URL)"
          value={form.image_url || ''}
          onChange={(e) => setForm((s: any) => ({ ...s, image_url: e.target.value }))}
        />
        <input
          className="input"
          placeholder="Stripe tilin ID (acct_...)"
          value={form.stripe_account_id || ''}
          onChange={(e) => setForm((s: any) => ({ ...s, stripe_account_id: e.target.value }))}
        />
        <button className="btn btn-primary" onClick={save}>
          Tallenna
        </button>
      </div>
    </section>
  );
}
