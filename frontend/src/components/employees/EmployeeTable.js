import { motion, AnimatePresence } from 'framer-motion';

export default function EmployeeTable({ employees, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white transition-colors">
        <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                    <tr>
                        <th className="px-4 py-3 border-0 text-secondary small text-uppercase fw-bold">Employee</th>
                        <th className="px-4 py-3 border-0 text-secondary small text-uppercase fw-bold">Department</th>
                        <th className="px-4 py-3 border-0 text-secondary small text-uppercase fw-bold">Phone</th>
                        <th className="px-4 py-3 border-0 text-secondary small text-uppercase fw-bold">Status</th>
                        <th className="px-4 py-3 border-0 text-secondary small text-uppercase fw-bold text-end">Action</th>
                    </tr>
                </thead>
                
                <AnimatePresence mode="wait">
                    <motion.tbody
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {employees.map(emp => (
                            <tr key={emp.id} className="transition-colors">
                                <td className="px-4 py-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className={`p-1 rounded-circle border ${emp.isActive ? 'border-light' : 'border-secondary grayscale'}`}>
                                            <img 
                                                src={emp.photo ? `http://localhost:5000${emp.photo}` : `https://ui-avatars.com/api/?name=${emp.name}`} 
                                                className="rounded-circle" width="40" height="40" alt="" 
                                                style={{ filter: emp.isActive ? 'none' : 'grayscale(100%)' }}
                                                onError={(e) => {e.target.src=`https://ui-avatars.com/api/?name=${emp.name}`}}
                                            />
                                        </div>
                                        <div>
                                            <div className={`fw-bold ${emp.isActive ? 'text-dark' : 'text-muted text-decoration-line-through'}`}>{emp.name}</div>
                                            <div className="small text-muted">{emp.position}</div>
                                        </div>
                                    </div>
                                </td>
                                
                                <td className="px-4 py-3"><span className="badge bg-light text-dark border">{emp.department}</span></td>
                                <td className="px-4 py-3 text-secondary small">{emp.phone}</td>

                                <td className="px-4 py-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className={`badge rounded-pill border ${emp.isActive ? 'bg-success bg-opacity-10 text-success border-success' : 'bg-secondary bg-opacity-10 text-secondary border-secondary'}`}>
                                            {emp.isActive ? 'Active' : 'Inactive'}
                                        </div>
                                        <div className="form-check form-switch mb-0" style={{minHeight: 'unset'}}>
                                            <input className="form-check-input cursor-pointer" type="checkbox" checked={emp.isActive} onChange={() => onToggleStatus(emp)} />
                                        </div>
                                    </div>
                                </td>
                                
                                <td className="px-4 py-3 text-end">
                                    <button onClick={() => onEdit(emp)} className="btn btn-sm btn-white border me-2 shadow-sm"><i className="bi bi-pencil"></i></button>
                                    <button onClick={() => onDelete(emp.id)} className="btn btn-sm btn-white border text-danger shadow-sm"><i className="bi bi-trash"></i></button>
                                </td>
                            </tr>
                        ))}
                        {employees.length === 0 && <tr><td colSpan="5" className="text-center py-5 text-muted">No data found.</td></tr>}
                    </motion.tbody>
                </AnimatePresence>
            </table>
        </div>
    </div>
  );
}