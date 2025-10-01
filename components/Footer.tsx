export function Footer() {
  return (
    <footer className="py-10 text-center text-sm text-slate-600">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} HommaHaltuu. Kaikki oikeudet pidätetään.</p>
        <div className="mt-2">Käyttöehdot · Tietosuoja</div>
      </div>
    </footer>
  );
}
