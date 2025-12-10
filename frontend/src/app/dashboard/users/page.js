'use client';
import { useState } from 'react';
import useSWR from 'swr';
import UserService from '@/services/user.service';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmDialog from '@/components/ConfirmDialog';

const fetcher = () => UserService.getAll();

export default function UserManagementPage() {

  const { data: users, error, mutate } = useSWR('/users', fetcher);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    isDanger: false,
    onConfirm: () => {}
  });

  const closeDialog = () => setDialog({ ...dialog, isOpen: false });

  const filteredUsers = users?.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });


  const handleToggleStatus = (user) => {
    const action = user.isActive ? 'deactivate' : 'activate';
    
    setDialog({
      isOpen: true,
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} User?`,
      message: `Are you sure you want to ${action} access for ${user.username}? They won't be able to login if deactivated.`,
      isDanger: user.isActive, 
      onConfirm: async () => {
        try {
          closeDialog();
          await UserService.updateStatus(user.id, !user.isActive);
          mutate();
          toast.success(`User ${user.username} has been ${action}d.`);
        } catch (err) {
          toast.error('Failed to update status');
        }
      }
    });
  };

  const handleResetPassword = (user) => {
    setDialog({
      isOpen: true,
      title: 'Reset Password?',
      message: `Send password reset instructions to ${user.email}?`,
      isDanger: false,
      onConfirm: () => {
        closeDialog();
        toast.success(`Reset link sent to ${user.email}`);
      }
    });
  };

  if (error) return <div className="p-5 text-center text-danger">Failed to load users.</div>;
  if (!users) return (
     <div className="p-5 text-center d-flex flex-column align-items-center justify-content-center" style={{minHeight: '300px'}}>
        <div className="spinner-border text-primary mb-2" role="status"></div>
        <p className="text-muted small">Loading user data...</p>
     </div>
  );

  return (
    <div>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
        <div>
            <h2 className="page-title">User Management</h2>
            <p className="page-muted text-secondary mb-0">Control system access ({filteredUsers.length} users)</p>
        </div>
        
     
        <div className="position-relative" style={{width: '100%', maxWidth: '300px'}}>
             <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
             <input 
                 type="text" 
                 className="form-control rounded-pill ps-5 bg-white border shadow-sm" 
                 placeholder="Search users..." 
                 value={searchTerm}
                 onChange={handleSearch}
             />
        </div>
      </div>

   
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light border-bottom">
              <tr>
                <th className="py-3 px-4 text-secondary x-small fw-bold text-uppercase border-0">User Profile</th>
                <th className="py-3 px-4 text-secondary x-small fw-bold text-uppercase border-0">Role</th>
                <th className="py-3 px-4 text-secondary x-small fw-bold text-uppercase border-0">Status</th>
                <th className="py-3 px-4 text-secondary x-small fw-bold text-uppercase border-0">Joined Date</th>
                <th className="py-3 px-4 text-end text-secondary x-small fw-bold text-uppercase border-0">Actions</th>
              </tr>
            </thead>
            
            <AnimatePresence mode="wait">
                <motion.tbody
                    key={currentPage}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                  {paginatedUsers.length > 0 ? paginatedUsers.map((user) => (
                    <tr key={user.id} style={{ transition: 'background 0.2s' }}>

                      <td className="px-4 py-3">
                        <div className="d-flex align-items-center">
                          <div className="position-relative me-3">
                              <img 
                                src={`https://ui-avatars.com/api/?name=${user.username}&background=random&color=fff&bold=true`} 
                                alt={user.username}
                                className={`rounded-circle border border-2 shadow-sm ${user.isActive ? 'border-white' : 'border-secondary grayscale'}`}
                                width="42" height="42"
                                style={{filter: user.isActive ? 'none' : 'grayscale(100%)'}}
                              />
                              {user.isActive && (
                                <span className="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle" style={{width: '10px', height: '10px'}}></span>
                              )}
                          </div>
                          <div>
                            <div className={`fw-bold ${user.isActive ? 'text-dark' : 'text-muted text-decoration-line-through'}`}>{user.username}</div>
                            <div className="small text-muted" style={{fontSize: '0.8rem'}}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-4 py-3">
                        <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-medium shadow-sm">
                          <i className="bi bi-shield-lock-fill me-1 text-primary"></i> Admin
                        </span>
                      </td>

                      <td className="px-4 py-3">
                         <div className={`d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill border ${user.isActive ? 'bg-success bg-opacity-10 border-success text-success' : 'bg-secondary bg-opacity-10 border-secondary text-secondary'}`}>
                            <span className={`rounded-circle ${user.isActive ? 'bg-success' : 'bg-secondary'}`} style={{width: '6px', height: '6px'}}></span>
                            <span className="fw-bold" style={{fontSize: '0.75rem'}}>
                                {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                         </div>
                      </td>

                      <td className="px-4 py-3 text-secondary small font-monospace">
                        {formatDate(user.createdAt)}
                      </td>

                      <td className="px-4 py-3 text-end">
                        <div className="d-flex justify-content-end align-items-center gap-3">

                            <button 
                                onClick={() => handleResetPassword(user)}
                                className="btn btn-sm btn-white border shadow-sm text-secondary hover-text-primary"
                                title="Reset Password"
                                disabled={!user.isActive}
                                style={{width: '32px', height: '32px', padding: 0}}
                            >
                                <i className="bi bi-key-fill"></i>
                            </button>

                            <div className="form-check form-switch mb-0" style={{minHeight: 'unset'}}>
                                <input 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    role="switch" 
                                    id={`switch-${user.id}`}
                                    checked={user.isActive}
                                    onChange={() => handleToggleStatus(user)}
                                    style={{cursor: 'pointer'}}
                                />
                            </div>
                        </div>
                      </td>

                    </tr>
                  )) : (
                    <tr><td colSpan="5" className="text-center py-5 text-muted">No users found.</td></tr>
                  )}
                </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        {totalPages > 1 && (
            <div className="card-footer bg-white border-top py-3 d-flex justify-content-center gap-2">
                 <button 
                    className="btn btn-sm btn-white border shadow-sm" 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(prev => prev - 1)}
                 >
                    Prev
                 </button>
                 <span className="d-flex align-items-center px-2 text-muted small fw-bold">Page {currentPage} of {totalPages}</span>
                 <button 
                    className="btn btn-sm btn-white border shadow-sm" 
                    disabled={currentPage === totalPages} 
                    onClick={() => setCurrentPage(prev => prev + 1)}
                 >
                    Next
                 </button>
            </div>
        )}
      </div>

      <ConfirmDialog 
        isOpen={dialog.isOpen}
        title={dialog.title}
        message={dialog.message}
        isDanger={dialog.isDanger}
        onConfirm={dialog.onConfirm}
        onCancel={closeDialog}
      />
    </div>
  );
}