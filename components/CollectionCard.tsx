import Link from 'next/link';
import { Collection } from '@/lib/types';

export default function CollectionCard({ collection }: { collection: Collection }) {
  const { title, slug, metadata } = collection;

  return (
    <Link href={`/collections/${slug}`} className="group relative block h-[300px] w-full overflow-hidden rounded-lg">
      <img
        src={`${metadata.cover_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-6 left-6 text-white">
        <h3 className="text-2xl font-bold">{title}</h3>
        {metadata.description && (
          <p className="mt-2 text-sm text-gray-200 line-clamp-2">{metadata.description}</p>
        )}
      </div>
    </Link>
  );
}