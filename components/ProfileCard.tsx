import Image from 'next/image';
import Link from 'next/link';
import { fmtPrice } from '@/lib/utils';
import { Rating } from './Rating';

type P = {
  id: string;
  name?: string;
  title?: string;
  city?: string;
  price?: number;
  image_url?: string;
  rating?: number;
  reviews?: number;
};

export function ProfileCard(p: P) {
  return (
    <article className="card overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col">
      <Image
        src={p.image_url || '/placeholder.jpg'}
        alt={p.name || ''}
        width={640}
        height={360}
        className="h-40 w-full object-cover"
      />
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-slate-600 text-sm">
              {p.title} • {p.city}
            </p>
          </div>
          <div className="text-right">
            <div className="font-semibold">{fmtPrice(p.price)}</div>
            <Rating value={p.rating} count={p.reviews} />
          </div>
        </div>
        <div className="pt-2">
          <Link href={`/profile/${p.id}`} className="btn btn-primary w-full">
            Näytä profiili
          </Link>
        </div>
      </div>
    </article>
  );
}
