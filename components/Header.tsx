"use client";
import Link from 'next/link';
import { getSupabaseBrowser } from '@/lib/supabaseBrowser';
import { useEffect, useState } from 'react';

export function Header() {
  const [user, setUser] = useState<any>(null);
  const supabase = getSupabaseBrowser();

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user || null));
    })();
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl tracking-tight hover:text-blue-700">
          HommaHaltuu
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/search" className="hover:text-blue-700">
            Haku
          </Link>
          {user && (
            <Link href="/register" className="hover:text-blue-700">
              Tilini
            </Link>
          )}
          {user && (
            <Link href="/admin" className="hover:text-blue-700">
              Admin
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
          {!user ? (
            <Link href="/login" className="btn btn-outline">
              Kirjaudu
            </Link>
          ) : (
            <button
              className="btn btn-primary"
              onClick={async () => {
                await supabase.auth.signOut();
                location.href = '/';
              }}
            >
              Kirjaudu ulos
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
