'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-[#1a1008] flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <h1 className="text-2xl font-extrabold text-[#8B0000]">System Error</h1>
          <p className="text-xs text-[#6b5840]">{error?.message || 'A global error occurred.'}</p>
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 bg-[#8B0000] text-white rounded-xl text-xs font-bold"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
