"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  return (
    <section className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold">Kirjaudu</h1>
      <p className="text-slate-600 mb-4">Saat kirjautumislinkin sähköpostiisi.</p>
      <input
        className="input"
        placeholder="sähköposti"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="btn btn-primary mt-3"
        onClick={async () => {
          const { error } = await supabase.auth.signInWithOtp({ email });
          if (!error) setSent(true);
          else alert(error.message);
        }}
      >
        Lähetä linkki
      </button>
      {sent && <p className="text-sm text-green-700 mt-3">Tarkista sähköpostisi.</p>}
    </section>
  );
}
