'use client';
import { useState } from 'react';
import useSWR from 'swr';
import UserService from '@/services/user.service';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import UserTable from '@/components/user/UserTable';   
import Pagination from '@/components/common/Pagination'; 

const fetcher = () => UserService.getAll();

export default function UserManagementPage() {
  const { data: users, error, mutate } = useSWR('/users', fetcher);
  
  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [dialog, setDialog] = useState({ isOpen: false, title: '', message: '', isDanger: false, onConfirm: () => {} });
  const closeDialog = () => setDialog({ ...dialog, isOpen: false });

  // Logic Filtering & Pagination
  const filteredUsers = users?.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearch = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };

  // Actions
  const handleToggleStatus = (user) => {
    const action = user.isActive ? 'deactivate' : 'activate';
    setDialog({
      isOpen: true, title: `${action.charAt(0).toUpperCase() + action.slice(1)} User?`,
      message: `Are you sure you want to ${action} access for ${user.username}?`, isDanger: user.isActive,
      onConfirm: async () => {
        try {
          closeDialog();
          await UserService.updateStatus(user.id, !user.isActive);
          mutate();
          toast.success(`User ${user.username} has been ${action}d.`);
        } catch (err) { toast.error('Failed to update status'); }
      }
    });
  };

  const handleResetPassword = (user) => {
    setDialog({
      isOpen: true, title: 'Reset Password?', message: `Send reset instructions to ${user.email}?`, isDanger: false,
      onConfirm: () => { closeDialog(); toast.success(`Reset link sent to ${user.email}`); }
    });
  };

  if (error) return <div className="p-5 text-center text-danger">Failed to load users.</div>;
  if (!users) return <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>;

  return (
    <div>
      {/* HEADER & SEARCH */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4 gap-3">
        <div>
            <h2 className="page-title">User Management</h2>
            <p className="page-muted text-secondary mb-0">Control system access ({filteredUsers.length} users)</p>
        </div>
        <div className="position-relative" style={{width: '100%', maxWidth: '300px'}}>
             <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
             <input type="text" className="form-control rounded-pill ps-5 bg-white border shadow-sm" 
                 placeholder="Search users..." value={searchTerm} onChange={handleSearch} />
        </div>
      </div>

      {/* TABLE COMPONENT (Code Split) */}
      <UserTable 
          users={paginatedUsers} 
          onToggleStatus={handleToggleStatus} 
          onResetPassword={handleResetPassword} 
      />

      {/* PAGINATION COMPONENT (Reusable) */}
      <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          totalItems={filteredUsers.length} 
          itemsPerPage={itemsPerPage} 
          onPageChange={setCurrentPage} 
      />

      <ConfirmDialog 
        isOpen={dialog.isOpen} title={dialog.title} message={dialog.message} isDanger={dialog.isDanger}
        onConfirm={dialog.onConfirm} onCancel={closeDialog}
      />
    </div>
  );
}