'use client';
import { motion } from 'framer-motion';

export default function EmployeeCard({ employee, onEdit, onDelete }) {
  const API_URL = 'http://localhost:5000'; 
  
  const getImageUrl = () => {
    if (!employee.photo) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=random&color=fff&size=128`;
    }
    return `${API_URL}${employee.photo}`;
  };

  return (

    <div className="card h-100 border-0 shadow-sm overflow-hidden bg-white group" style={{borderRadius: '16px'}}>
        
        <div className="card-body text-center p-4 d-flex flex-column align-items-center">

            <div className="mb-3 position-relative flex-shrink-0" style={{ width: '80px', height: '80px' }}>
                <img 
                    src={getImageUrl()} 
                    alt={employee.name} 
                    className="w-100 h-100 rounded-circle object-fit-cover border border-4 border-light shadow-sm"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = `https://ui-avatars.com/api/?name=${employee.name}`;
                    }}
                />
            </div>

            <h5 className="fw-bold text-dark mb-1 w-100 text-truncate">{employee.name}</h5>
            
            <span className="badge bg-light text-secondary border fw-medium px-3 py-1 rounded-pill mb-3 text-truncate" style={{maxWidth: '100%'}}>
                {employee.position}
            </span>

            <small className="text-muted mb-3 d-block">
                <i className="bi bi-building me-1"></i> {employee.department || 'General'}
            </small>

            <div className="mt-auto">
                <a href={`tel:${employee.phone}`} className="btn btn-sm btn-light rounded-pill px-3 w-100 text-truncate">
                    <i className="bi bi-telephone-fill me-2 text-primary"></i>
                    {employee.phone}
                </a>
            </div>
        </div>

        <div className="card-footer bg-white border-top p-0 d-flex">
            <button onClick={() => onEdit(employee)} className="btn btn-link text-decoration-none flex-grow-1 border-end py-3 text-secondary hover-bg-light" style={{fontSize: '0.9rem'}}>
                <i className="bi bi-pencil-square me-1"></i> Edit
            </button>
            <button onClick={() => onDelete(employee.id)} className="btn btn-link text-decoration-none flex-grow-1 py-3 text-danger hover-bg-light" style={{fontSize: '0.9rem'}}>
                <i className="bi bi-trash me-1"></i> Delete
            </button>
        </div>
    </div>
  );
}