'use client';
import { motion } from 'framer-motion';

export default function EmployeeCard({ employee, onEdit, onDelete }) {
  const API_URL = 'http://localhost:5000'; 
  const imageUrl = employee.photo 
    ? `${API_URL}${employee.photo}` 
    : 'https://ui-avatars.com/api/?name=' + employee.name + '&background=random'; 

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4"
    >
      <div className="card card-hover h-100 border-0 bg-white p-3">
        
        {/* Header: Photo & Action */}
        <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="position-relative">
                <img 
                    src={imageUrl} 
                    alt={employee.name} 
                    className="rounded-circle object-fit-cover shadow-sm border border-2 border-white"
                    style={{ width: '64px', height: '64px' }}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }} 
                />
                <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle p-1" 
                      style={{ width: '12px', height: '12px' }}></span>
            </div>
            
            <div className="dropdown">
                <button className="btn btn-light btn-sm rounded-circle shadow-sm" type="button" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots-vertical"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg p-2">
                    <li>
                        <button onClick={() => onEdit(employee)} className="dropdown-item rounded-2 py-2 mb-1 d-flex align-items-center gap-2">
                            <i className="bi bi-pencil-square text-primary"></i> Edit Data
                        </button>
                    </li>
                    <li>
                        <button onClick={() => onDelete(employee.id)} className="dropdown-item rounded-2 py-2 d-flex align-items-center gap-2 text-danger hover-bg-danger-light">
                            <i className="bi bi-trash"></i> Delete
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <div className="mt-2">
            <h6 className="fw-bold text-dark mb-1">{employee.name}</h6>
            <p className="text-muted small mb-3">{employee.position}</p>
            
            <div className="d-flex align-items-center gap-2 p-2 bg-light rounded-3">
                <div className="bg-white p-1 rounded-circle shadow-sm d-flex justify-content-center align-items-center" style={{width: '24px', height: '24px'}}>
                    <i className="bi bi-telephone-fill text-primary" style={{fontSize: '10px'}}></i>
                </div>
                <span className="small fw-medium text-secondary">{employee.phone}</span>
            </div>
        </div>

      </div>
    </motion.div>
  );
}