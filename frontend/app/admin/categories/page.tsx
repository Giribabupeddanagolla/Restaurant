'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminCategoriesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/menu');
  }, [router]);

  return (
    <div className="p-4 text-xs font-bold text-gray-500">
      Redirecting to Menu Management...
    </div>
  );
}
