interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate an array of page numbers (simplified for demo)
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
  });

  return (
    <div className="flex items-center justify-end gap-1 mt-4 text-sm" role="navigation" aria-label="Pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        className="px-2 py-1 bg-[#316282] text-white rounded-sm hover:bg-[#417a9b] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-white focus-visible:ring-2 active:scale-95 transition-transform"
      >
        &lt;
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          aria-current={currentPage === page ? "page" : undefined}
          className={`px-3 py-1 rounded-sm focus-visible:outline-white focus-visible:ring-2 active:scale-95 transition-colors ${
            currentPage === page 
              ? 'bg-[#67c1f5] text-white font-bold' 
              : 'bg-[#316282] text-[#c6d4df] hover:bg-[#417a9b] hover:text-white'
          }`}
        >
          {page}
        </button>
      ))}

      <button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
        className="px-2 py-1 bg-[#316282] text-white rounded-sm hover:bg-[#417a9b] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-white focus-visible:ring-2 active:scale-95 transition-transform"
      >
        &gt;
      </button>
    </div>
  );
}
