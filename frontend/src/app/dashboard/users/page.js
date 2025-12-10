'use client';
import useSWR from 'swr';
import api from '@/lib/axios';
import { motion } from 'framer-motion';

const fetcher = url => api.get(url).then(res => res.data.data);

export default function UserManagementPage() {
  const { data: users, error } = useSWR('/users', fetcher);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  if (error) return <div className="p-5 text-center text-danger">Failed to load users.</div>;
  if (!users) return (
     <div className="p-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-muted mt-2">Loading user data...</p>
     </div>
  );

  return (
    <div>

      <div className="mb-5">
        <h2 className="fw-bold text-dark mb-1">User Management</h2>
        <p className="text-muted">List of administrators authorized to access the system.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card border-0 shadow-sm rounded-4 overflow-hidden"
      >
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light border-bottom">
              <tr>
                <th className="py-3 px-4 text-uppercase text-secondary small fw-bold border-0">User Profile</th>
                <th className="py-3 px-4 text-uppercase text-secondary small fw-bold border-0">Role</th>
                <th className="py-3 px-4 text-uppercase text-secondary small fw-bold border-0">Status</th>
                <th className="py-3 px-4 text-uppercase text-secondary small fw-bold border-0">Joined Date</th>
                <th className="py-3 px-4 text-end text-uppercase text-secondary small fw-bold border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="cursor-pointer">
               
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${user.username}&background=random&color=fff`} 
                        alt={user.username}
                        className="rounded-circle me-3"
                        width="40" height="40"
                      />
                      <div>
                        <div className="fw-bold text-dark">{user.username}</div>
                        <div className="small text-muted">{user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span className="badge bg-light text-dark border px-3 py-2 rounded-pill fw-normal">
                      Administrator
                    </span>
                  </td>

                  <td className="px-4 py-3">
                     <div className="d-flex align-items-center gap-2">
                        <span className="bg-success rounded-circle" style={{width: '8px', height: '8px'}}></span>
                        <span className="text-success fw-bold small">Active</span>
                     </div>
                  </td>
                
                  <td className="px-4 py-3 text-secondary">
                    {formatDate(user.createdAt)}
                  </td>
           
                  <td className="px-4 py-3 text-end">
                    <button className="btn btn-sm btn-light border rounded-3 text-muted">
                        <i className="bi bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="card-footer bg-white border-top-0 py-3 px-4 d-flex justify-content-between align-items-center">
             <small className="text-muted">Showing {users.length} users</small>
             <div className="d-flex gap-2">
                 <button className="btn btn-sm btn-light border disabled">Prev</button>
                 <button className="btn btn-sm btn-light border disabled">Next</button>
             </div>
        </div>
      </motion.div>
    </div>
  );
}