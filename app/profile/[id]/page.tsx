import { getSupabaseServer } from '@/lib/supabaseServer';
import Image from 'next/image';
import { fmtPrice } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function Profile({ params }: { params: { id: string } }) {
  const supabase = getSupabaseServer();

  const { data: p } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();
  const { data: revs } = await supabase
    .from('reviews')
    .select('*')
    .eq('profile_id', params.id)
    .order('created_at', { ascending: false });
  if (!p) return <div className="mx-auto max-w-3xl px-4 py-10">Profiilia ei löytynyt.</div>;

  async function order() {
    /* handled client-side via fetch('/api/checkout') in a real impl */
  }

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-[1fr,320px] gap-8">
      <div>
        <Image
          src={p.image_url || '/placeholder.jpg'}
          alt={p.name || ''}
          width={1200}
          height={600}
          className="rounded-2xl w-full object-cover"
        />
        <h1 className="text-3xl font-bold mt-4">{p.name}</h1>
        <p className="text-slate-600">
          {p.title} • {p.city}
        </p>
        <p className="mt-4 text-slate-800 whitespace-pre-wrap">{p.about}</p>
        <h2 className="text-xl font-semibold mt-8">Arvostelut</h2>
        <div className="mt-3 space-y-3">
          {(revs || []).map((r: any) => (
            <div key={r.id} className="card p-3">
              <div className="text-sm">Arvosana: {r.rating}/5</div>
              <p className="text-sm text-slate-700">{r.comment}</p>
            </div>
          ))}
          {(!revs || !revs.length) && (
            <p className="text-sm text-slate-600">Ei arvosteluja vielä.</p>
          )}
        </div>
      </div>
      <aside className="card p-4 h-fit">
        <div className="text-2xl font-bold">{fmtPrice(p.price)}</div>
        <button
          className="btn btn-primary w-full mt-3"
          formAction={async () => {
            'use server';
            /* Server Action → Stripe Checkout (see /api/checkout) */
          }}
        >
          Tilaa työ (escrow)
        </button>
        <a
          className="btn btn-outline w-full mt-2"
          href={`mailto:?subject=Tarjouspyyntö%20${encodeURIComponent(p.name || '')}`}
        >
          Ota yhteyttä
        </a>
      </aside>
    </section>
  );
}
