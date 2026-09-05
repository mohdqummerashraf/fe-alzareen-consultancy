'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Pagination from '@/components/common/Pagination';

function PaginationClient({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page);
    router.push(`/recruitment-drives?${params.toString()}`);
    window.scrollTo({ top: 650, behavior: 'smooth' });
  };

  return (
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
  );
}

export default PaginationClient;
