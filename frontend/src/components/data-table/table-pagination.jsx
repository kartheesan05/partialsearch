import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function TablePagination({ currentPage, totalPages, onPageChange }) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="text-blue-800 dark:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-100/50"
          />
        </PaginationItem>
        {totalPages <= 5 ? (
          [...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => onPageChange(i + 1)}
                isActive={currentPage === i + 1}
                className={
                  currentPage === i + 1
                    ? "bg-blue-800 text-white"
                    : "text-blue-800 dark:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-100/50"
                }
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))
        ) : (
          <ComplexPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="text-blue-800 dark:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-100/50"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function ComplexPagination({ currentPage, totalPages, onPageChange }) {
  return (
    <>
      <PaginationItem>
        <PaginationLink
          onClick={() => onPageChange(1)}
          isActive={currentPage === 1}
          className={
            currentPage === 1
              ? "bg-blue-800 text-white"
              : "text-blue-800 dark:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-100/50"
          }
        >
          1
        </PaginationLink>
      </PaginationItem>
      {currentPage > 3 && <PaginationEllipsis className="text-blue-800 dark:text-blue-800" />}
      {currentPage > 2 && currentPage < totalPages - 1 && (
        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(currentPage - 1)}
            className="text-blue-800 dark:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-100/50"
          >
            {currentPage - 1}
          </PaginationLink>
        </PaginationItem>
      )}
      {currentPage !== 1 && currentPage !== totalPages && (
        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(currentPage)}
            isActive
            className="bg-blue-800 text-white"
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      )}
      {currentPage < totalPages - 1 && currentPage > 1 && (
        <PaginationItem>
          <PaginationLink
            onClick={() => onPageChange(currentPage + 1)}
            className="text-blue-800 dark:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-100/50"
          >
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
      )}
      {currentPage < totalPages - 2 && (
        <PaginationEllipsis className="text-blue-800 dark:text-blue-800" />
      )}
      <PaginationItem>
        <PaginationLink
          onClick={() => onPageChange(totalPages)}
          isActive={currentPage === totalPages}
          className={
            currentPage === totalPages
              ? "bg-blue-800 text-white"
              : "text-blue-800 dark:text-blue-800 hover:bg-blue-100 dark:hover:bg-blue-100/50"
          }
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    </>
  );
}
