import Image from 'next/image';
import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { ProfileCard } from '@/components/ProfileCard';

// tämä varmistaa että Next ei yritä prerenderöidä staattisesti buildissa
export const dynamic = 'force-dynamic';
// vaihtoehtoisesti voisi käyttää: export const revalidate = 0;

export default async function Home() {
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('approved', true)
    .limit(6);

  if (error) {
    console.error('Supabase error:', error);
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              HommaHaltuu –{' '}
              <span className="text-blue-700">
                Pienyrittäjien ja asiakkaiden markkinapaikka
              </span>
            </h1>
            <p className="mt-4 text-slate-700 text-lg">
              Turvallinen escrow-malli: asiakas maksaa heti, maksu vapautetaan
              yrittäjälle vasta työn hyväksynnän jälkeen.
            </p>
            <div className="mt-6 card p-4">
              <div className="grid sm:grid-cols-5 gap-3">
                <input className="input sm:col-span-2" placeholder="Esim. valokuvaaja" />
                <input className="input sm:col-span-1" placeholder="Paikkakunta" />
                <select className="input sm:col-span-1">
                  <option>Kaikki alat</option>
                  <option>Valokuvaus</option>
                  <option>Graafinen suunnittelu</option>
                  <option>Verkkosivut</option>
                  <option>Kääntäminen</option>
                  <option>Kirjanpito</option>
                </select>
                <Link className="btn btn-primary sm:col-span-1" href="/search">
                  Hae
                </Link>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                💡 Vapaateksti toimii: “edullinen valokuvaaja Espoossa syyskuulle”.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-sm">
              <span className="chip">✔ Escrow-maksu</span>
              <span className="chip">✔ Arvostelut</span>
              <span className="chip">✔ Admin-hyväksyntä</span>
            </div>
          </div>
          <div className="md:pl-8">
            <div className="card p-4">
              <Image
                className="rounded-2xl w-full aspect-video object-cover"
                width={1280}
                height={720}
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
                alt="Freelancer"
              />
              <div className="mt-3 text-xs text-slate-600">*Kuvitus.*</div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Suositut osaajat</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data || []).map((p: any) => (
              <ProfileCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
