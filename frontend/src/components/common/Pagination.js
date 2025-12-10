export default function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) {
  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 gap-3">
      <small className="text-secondary fw-medium">
         Showing <span className="fw-bold text-dark">{startItem}</span> to <span className="fw-bold text-dark">{endItem}</span> of <span className="fw-bold text-dark">{totalItems}</span> items
      </small>

      <div className="d-flex gap-2">
          <button 
            className="btn btn-white border shadow-sm px-3" 
            disabled={currentPage === 1 || totalItems === 0}
            onClick={() => onPageChange(currentPage - 1)}
          >
            Previous
          </button>
          
          <div className="d-flex align-items-center justify-content-center bg-white border rounded px-3 shadow-sm fw-bold text-dark" style={{minWidth: '40px'}}>
              {currentPage}
          </div>

          <button 
            className="btn btn-white border shadow-sm px-3" 
            disabled={currentPage >= totalPages || totalItems === 0}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next
          </button>
      </div>
    </div>
  );
}