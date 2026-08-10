import Image from 'next/image';

const IMAGES = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80',
];

export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-[#C8A055] uppercase tracking-widest">Visual Tour</span>
        <h1 className="text-3xl font-extrabold text-[#1a1008] mt-1">Giri Gallery & Ambiance</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {IMAGES.map((url, i) => (
          <div key={i} className="relative h-64 rounded-2xl overflow-hidden glass-card shadow-md hover:scale-105 transition-transform duration-300">
            <Image src={url} alt={`Gallery ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
