"use client";
import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser"; // 👈 vaihda tämä

export default function Admin() {
  const [items, setItems] = useState<any[]>([]);
  const supabase = getSupabaseBrowser(); // 👈 browser client

  async function load() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
      return;
    }
    setItems(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function setApprove(id: string, state: boolean) {
    const { error } = await supabase
      .from("profiles")
      .update({ approved: state })
      .eq("id", id);

    if (error) alert(error.message);
    else load();
  }

  async function releasePayment(profileId: string) {
    const res = await fetch("/api/escrow/release", {
      method: "POST",
      body: JSON.stringify({ profileId }),
    });
    const j = await res.json();
    alert(j.ok ? "Maksu vapautettu." : "Virhe: " + j.error);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold mb-4">
        Admin – hyväksy profiileja & vapauta maksuja
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <article key={p.id} className="card p-4">
            {/* … sama renderointi kuin ennen … */}
          </article>
        ))}
      </div>
    </section>
  );
}

