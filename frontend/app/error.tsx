'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled App Error:', error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-xl font-extrabold text-[#1a1008] mb-2">Something went wrong!</h2>
      <p className="text-xs text-[#6b5840] mb-4">{error.message || 'An unexpected error occurred.'}</p>
      <button
        onClick={() => reset()}
        className="btn-crimson text-xs px-5 py-2 rounded-xl font-bold"
      >
        Try again
      </button>
    </div>
  );
}
