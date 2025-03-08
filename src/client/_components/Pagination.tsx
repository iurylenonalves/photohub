"use client";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-8 space-x-2">
      {/* Botão "Anterior" */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded transition text-sm md:text-base ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-300 text-gray-800 hover:bg-gray-400"
        }`}
      >
        ← Anterior
      </button>

      {/* Renderiza os números de página - ocultando em telas pequenas */}
      <div className="hidden md:flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-4 py-2 rounded font-semibold transition text-sm md:text-base ${
                currentPage === pageNumber
                  ? "bg-gray-400 text-white shadow-md"
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Botão "Próximo" */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded transition text-sm md:text-base ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-300 text-gray-800 hover:bg-gray-400"
        }`}
      >
        Próximo →
      </button>
    </div>
  );
};

export default Pagination;