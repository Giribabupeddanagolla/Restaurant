import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-extrabold text-[#1a1008] mb-2">404 - Page Not Found</h2>
      <p className="text-xs text-[#6b5840] mb-6">Could not find requested resource on Royal Restaurant.</p>
      <Link href="/" className="btn-crimson text-xs px-6 py-2.5 rounded-xl font-bold">
        Return Home
      </Link>
    </div>
  );
}
