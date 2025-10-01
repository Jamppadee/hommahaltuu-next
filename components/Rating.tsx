export function Rating({ value, count }: { value?: number; count?: number }) {
  return (
    <div className="text-xs text-slate-600">
      {value ? `★ ${value.toFixed(1)}` : '–'} {count ? `(${count})` : ''}
    </div>
  );
}
