'use client';
import { useState } from 'react';
import useSWR from 'swr';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmDialog from '@/components/ConfirmDialog';
import EmployeeCard from '@/components/EmployeeCard'; 
import EmployeeFormModal from '@/components/EmployeeFormModal';

const fetcher = url => api.get(url).then(res => res.data.data);

export default function EmployeePage() {
  const { data: employees, error, mutate } = useSWR('/employees', fetcher);

  // --- STATES UTAMA ---
  const [viewMode, setViewMode] = useState('grid'); 
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 

  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [dialog, setDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    isDanger: false,
    onConfirm: () => {}
  });
  const closeDialog = () => setDialog({ ...dialog, isOpen: false });

  const filteredEmployees = employees?.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            emp.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = filterDept === 'All' || emp.department === filterDept;
      return matchesSearch && matchesDept;
  }) || [];

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
  );


  const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
  };

  const handleAdd = () => { setSelectedEmployee(null); setShowModal(true); };
  const handleEdit = (employee) => { setSelectedEmployee(employee); setShowModal(true); };
  
  const handleDelete = (id) => {
    setDialog({
      isOpen: true,
      title: 'Delete Employee?',
      message: "You won't be able to revert this! The employee data and photo will be permanently removed.",
      isDanger: true, 
      onConfirm: async () => {
        try {
          closeDialog(); 
          await api.delete(`/employees/${id}`);
          toast.success('Employee deleted successfully'); 
          mutate(); 
        } catch (err) {
          toast.error('Failed to delete employee');
        }
      }
    });
  };

  if (error) return <div className="p-5 text-center text-danger">Failed to load data.</div>;
  if (!employees) return <div className="p-5 text-center"><div className="spinner-border text-primary"></div></div>;

  return (
    <div>
 
      <div className="mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
            <div>
                <h2 className="page-title">Employees</h2>
                <p className="page-muted text-secondary">Manage your team members ({filteredEmployees.length} total)</p>
            </div>
            <button onClick={handleAdd} className="btn btn-primary shadow-sm rounded-pill px-4">
                <i className="bi bi-plus-lg me-2"></i> Add New
            </button>
        </div>

    
        <div className="card border-0 shadow-sm p-3 rounded-4 mb-4">
            <div className="row g-3 align-items-center">
                {/* Search */}
                <div className="col-md-5">
                    <div className="position-relative">
                        <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
                        <input 
                            type="text" 
                            className="form-control rounded-pill ps-5 bg-light border-0" 
                            placeholder="Search by name or position..." 
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <div className="col-md-4">
                    <select 
                        className="form-select rounded-pill bg-light border-0 cursor-pointer" 
                        value={filterDept}
                        onChange={(e) => { setFilterDept(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="All">All Departments</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="General">General</option>
                    </select>
                </div>
       
                <div className="col-md-3 text-md-end">
                    <div className="btn-group bg-light rounded-pill p-1" role="group">
                        <button 
                            className={`btn btn-sm rounded-pill px-3 border-0 ${viewMode === 'grid' ? 'bg-white shadow-sm fw-bold' : 'text-secondary'}`}
                            onClick={() => setViewMode('grid')}
                        >
                            <i className="bi bi-grid-fill me-1"></i> Grid
                        </button>
                        <button 
                            className={`btn btn-sm rounded-pill px-3 border-0 ${viewMode === 'list' ? 'bg-white shadow-sm fw-bold' : 'text-secondary'}`}
                            onClick={() => setViewMode('list')}
                        >
                            <i className="bi bi-list-ul me-1"></i> List
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'grid' && (
            <motion.div 
                key="grid"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="row g-4" 
            >
                {paginatedEmployees.length > 0 ? paginatedEmployees.map((emp) => (
             
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch" key={emp.id}>
                        <motion.div 
                            className="w-100" 
                            whileHover={{ y: -5 }} 
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                             <EmployeeCard 
                                employee={emp} 
                                onEdit={handleEdit} 
                                onDelete={handleDelete} 
                             />
                        </motion.div>
                    </div>
                )) : (
                    <div className="col-12 py-5 text-center">
                        <div className="bg-light rounded-circle d-inline-flex p-4 mb-3">
                           <i className="bi bi-search text-secondary opacity-50 fs-1"></i>
                        </div>
                        <h5 className="text-muted">No employees found.</h5>
                    </div>
                )}
            </motion.div>
        )}

        {viewMode === 'list' && (
            <motion.div 
                key="list"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white"
            >
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="px-4 py-3 border-0 text-secondary small">Employee</th>
                                <th className="px-4 py-3 border-0 text-secondary small">Department</th>
                                <th className="px-4 py-3 border-0 text-secondary small">Phone</th>
                                <th className="px-4 py-3 border-0 text-secondary small text-end">Action</th>
                            </tr>
                        </thead>
                        
                        <AnimatePresence mode="wait">
                            <motion.tbody
                                key={currentPage}
                                initial={{ opacity: 0, x: 20 }} 
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}   
                                transition={{ duration: 0.2 }}
                            >
                                {paginatedEmployees.map(emp => (
                                    <tr key={emp.id}>
                                        <td className="px-4 py-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <img 
                                                    src={emp.photo ? `http://localhost:5000${emp.photo}` : `https://ui-avatars.com/api/?name=${emp.name}`} 
                                                    className="rounded-circle border" width="40" height="40" alt="" 
                                                    onError={(e) => {e.target.src=`https://ui-avatars.com/api/?name=${emp.name}`}}
                                                />
                                                <div>
                                                    <div className="fw-bold text-dark">{emp.name}</div>
                                                    <div className="small text-muted">{emp.position}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3"><span className="badge bg-light text-dark border">{emp.department}</span></td>
                                        <td className="px-4 py-3 text-secondary small">{emp.phone}</td>
                                        <td className="px-4 py-3 text-end">
                                            <button onClick={() => handleEdit(emp)} className="btn btn-sm btn-white border me-2"><i className="bi bi-pencil"></i></button>
                                            <button onClick={() => handleDelete(emp.id)} className="btn btn-sm btn-white border text-danger"><i className="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                                {paginatedEmployees.length === 0 && <tr><td colSpan="4" className="text-center py-5 text-muted">No data found.</td></tr>}
                            </motion.tbody>
                        </AnimatePresence>
                    </table>
                </div>
            </motion.div>
        )}

      </AnimatePresence>

      {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4 gap-2">
              <button 
                className="btn btn-white border shadow-sm" 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              >
                Previous
              </button>
              <span className="d-flex align-items-center px-3 text-muted small fw-bold">
                  Page {currentPage} of {totalPages}
              </span>
              <button 
                className="btn btn-white border shadow-sm" 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                Next
              </button>
          </div>
      )}

      <EmployeeFormModal 
         show={showModal} 
         onHide={() => setShowModal(false)}
         onSuccess={() => mutate()} 
         employeeToEdit={selectedEmployee}
      />
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