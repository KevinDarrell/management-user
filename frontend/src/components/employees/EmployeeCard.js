import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

export default function EmployeeCard({ employee, onEdit, onDelete, onToggleStatus }) {
  const { theme } = useTheme();
  
  const cardBg = theme === 'dark' ? 'bg-surface border-secondary' : 'bg-white border-light-subtle';
  const textMain = theme === 'dark' ? 'text-white' : 'text-dark';

  return (
    <div className={`card h-100 border shadow-sm rounded-4 overflow-hidden ${cardBg} transition-colors position-relative`}>
      
      
      <div className="position-absolute top-0 end-0 m-3">
          <span className={`badge rounded-pill border ${employee.isActive ? 'bg-success bg-opacity-10 text-success border-success' : 'bg-secondary bg-opacity-10 text-secondary border-secondary'}`}>
             {employee.isActive ? 'Active' : 'Inactive'}
          </span>
      </div>

      <div className="card-body text-center p-4 pt-5">
      
        <div className="position-relative d-inline-block mb-3">
            <div className={`p-1 rounded-circle border border-2 ${employee.isActive ? 'border-success' : 'border-secondary grayscale'}`}>
                <img 
                    src={employee.photo ? `http://localhost:5000${employee.photo}` : `https://ui-avatars.com/api/?name=${employee.name}&background=random`} 
                    className="rounded-circle" 
                    width="80" height="80" 
                    style={{ objectFit: 'cover', filter: employee.isActive ? 'none' : 'grayscale(100%)' }}
                    alt={employee.name} 
                    onError={(e) => {e.target.src=`https://ui-avatars.com/api/?name=${employee.name}`}}
                />
            </div>
        </div>

        <h5 className={`fw-bold mb-1 ${textMain}`}>{employee.name}</h5>
        <p className="text-secondary small mb-3">{employee.position}</p>

        <div className={`d-inline-flex align-items-center px-3 py-1 rounded-pill small border ${theme === 'dark' ? 'bg-dark border-secondary text-secondary' : 'bg-light border-light-subtle text-secondary'}`}>
            <i className="bi bi-building me-2"></i> {employee.department}
        </div>
      </div>

      
      <div className={`card-footer p-3 border-top d-flex justify-content-between align-items-center ${theme === 'dark' ? 'border-secondary' : 'bg-light bg-opacity-50'}`}>
          
     
          <div className="form-check form-switch mb-0" title="Toggle Status">
              <input 
                  className="form-check-input cursor-pointer" 
                  type="checkbox" 
                  checked={employee.isActive}
                  onChange={() => onToggleStatus(employee)}
                  style={{ transform: 'scale(1.2)' }}
              />
          </div>

          <div className="d-flex gap-2">
             <button onClick={() => onEdit(employee)} className="btn btn-sm btn-white border shadow-sm" title="Edit">
                 <i className="bi bi-pencil-fill text-primary"></i>
             </button>
             <button onClick={() => onDelete(employee.id)} className="btn btn-sm btn-white border shadow-sm" title="Delete">
                 <i className="bi bi-trash-fill text-danger"></i>
             </button>
          </div>
      </div>
    </div>
  );
}