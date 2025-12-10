import { motion, AnimatePresence } from 'framer-motion';

export default function UserTable({ users, onToggleStatus, onResetPassword }) {
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white transition-colors">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="py-3 px-4 text-secondary small text-uppercase fw-bold border-0">User Profile</th>
                <th className="py-3 px-4 text-secondary small text-uppercase fw-bold border-0">Role</th>
                <th className="py-3 px-4 text-secondary small text-uppercase fw-bold border-0">Status</th>
                <th className="py-3 px-4 text-secondary small text-uppercase fw-bold border-0">Joined Date</th>
                <th className="py-3 px-4 text-end text-secondary small text-uppercase fw-bold border-0">Actions</th>
              </tr>
            </thead>
            
            <AnimatePresence mode="wait">
                <motion.tbody
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                  {users.map((user) => (
                    <tr key={user.id} className="transition-colors">
                      
                      {/* PROFILE */}
                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          <div className="position-relative me-3">
                              <img 
                                src={`https://ui-avatars.com/api/?name=${user.username}&background=random&color=fff&bold=true`} 
                                alt={user.username}
                                className={`rounded-circle border border-2 shadow-sm ${user.isActive ? 'border-white' : 'border-secondary grayscale'}`}
                                width="40" height="40"
                                style={{filter: user.isActive ? 'none' : 'grayscale(100%)'}}
                              />
                              {user.isActive && (
                                <span className="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle" style={{width: '10px', height: '10px'}}></span>
                              )}
                          </div>
                          <div>
                            <div className={`fw-bold ${user.isActive ? 'text-dark' : 'text-muted text-decoration-line-through'}`}>{user.username}</div>
                            <div className="small text-muted">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      
                      {/* ROLE */}
                      <td className="px-4 py-3">
                        <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium shadow-sm">
                          <i className="bi bi-shield-lock-fill me-1 text-primary"></i> Admin
                        </span>
                      </td>

                      {/* STATUS (Toggle Switch) */}
                      <td className="px-4 py-3">
                         <div className="d-flex align-items-center gap-3">
                             <div className={`badge rounded-pill border ${user.isActive ? 'bg-success bg-opacity-10 text-success border-success' : 'bg-secondary bg-opacity-10 text-secondary border-secondary'}`}>
                                {user.isActive ? 'Active' : 'Inactive'}
                             </div>
                             <div className="form-check form-switch mb-0" style={{minHeight: 'unset'}}>
                                <input 
                                    className="form-check-input cursor-pointer" type="checkbox" 
                                    checked={user.isActive} onChange={() => onToggleStatus(user)}
                                />
                            </div>
                         </div>
                      </td>

                      {/* DATE */}
                      <td className="px-4 py-3 text-secondary small font-monospace">
                        {formatDate(user.createdAt)}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-4 py-3 text-end">
                        <button 
                            onClick={() => onResetPassword(user)}
                            className="btn btn-sm btn-white border shadow-sm text-secondary hover-text-primary"
                            title="Reset Password"
                            disabled={!user.isActive}
                        >
                            <i className="bi bi-key-fill"></i> Reset Pass
                        </button>
                      </td>

                    </tr>
                  ))}
                  {users.length === 0 && <tr><td colSpan="5" className="text-center py-5 text-muted">No users found.</td></tr>}
                </motion.tbody>
            </AnimatePresence>
          </table>
        </div>
      </div>
  );
}