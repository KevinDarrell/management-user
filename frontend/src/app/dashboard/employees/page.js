'use client';
import { useState } from 'react';
import useSWR from 'swr';
import EmployeeService from '@/services/employee.service';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import EmployeeCard from '@/components/employees/EmployeeCard'; 
import EmployeeFormModal from '@/components/employees/EmployeeFormModal';
import EmployeeTable from '@/components/employees/EmployeeTable'; 
import Pagination from '@/components/common/Pagination';      

const fetcher = () => EmployeeService.getAll();

export default function EmployeePage() {
  const { data: employees, error, mutate } = useSWR('/employees', fetcher);


  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dialog, setDialog] = useState({ isOpen: false, title: '', message: '', isDanger: false, onConfirm: () => {} });

  const closeDialog = () => setDialog({ ...dialog, isOpen: false });


  const filteredEmployees = employees?.filter(emp => {
      const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            emp.position.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = filterDept === 'All' || emp.department === filterDept;
      return matchesSearch && matchesDept;
  }) || [];

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
      (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
  );

  const handleSearch = (e) => { setSearchTerm(e.target.value); setCurrentPage(1); };
  const handleAdd = () => { setSelectedEmployee(null); setShowModal(true); };
  const handleEdit = (employee) => { setSelectedEmployee(employee); setShowModal(true); };
  
  const handleDelete = (id) => {
    setDialog({
      isOpen: true, title: 'Delete Employee?', message: "This action cannot be undone.", isDanger: true,
      onConfirm: async () => {
        try {
          closeDialog();
          await EmployeeService.delete(id);
          toast.success('Deleted successfully');
          mutate();
        } catch (err) { toast.error('Failed to delete'); }
      }
    });
  };

  const handleToggleStatus = async (emp) => {
    try {
       await EmployeeService.updateStatus(emp.id, !emp.isActive);
       toast.success(`Status updated`);
       mutate();
    } catch (err) { toast.error('Failed update'); }
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

        <div className="card border-0 shadow-sm p-3 rounded-4 mb-4 bg-white transition-colors">
            <div className="row g-3 align-items-center">
                <div className="col-md-5">
                    <div className="position-relative">
                        <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"></i>
                        <input type="text" className="form-control rounded-pill ps-5 bg-light border-0" 
                            placeholder="Search..." value={searchTerm} onChange={handleSearch} />
                    </div>
                </div>
                <div className="col-md-4">
                    <select className="form-select rounded-pill bg-light border-0 cursor-pointer" 
                        value={filterDept} onChange={(e) => { setFilterDept(e.target.value); setCurrentPage(1); }}>
                        <option value="All">All Departments</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                        <option value="General">General</option>
                    </select>
                </div>
                <div className="col-md-3 text-md-end">
                    <div className="btn-group bg-light rounded-pill p-1">
                        <button className={`btn btn-sm rounded-pill px-3 border-0 ${viewMode === 'grid' ? 'bg-white shadow-sm fw-bold' : 'text-secondary'}`} onClick={() => setViewMode('grid')}>
                            <i className="bi bi-grid-fill me-1"></i> Grid
                        </button>
                        <button className={`btn btn-sm rounded-pill px-3 border-0 ${viewMode === 'list' ? 'bg-white shadow-sm fw-bold' : 'text-secondary'}`} onClick={() => setViewMode('list')}>
                            <i className="bi bi-list-ul me-1"></i> List
                        </button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="row g-4">
                {paginatedEmployees.length > 0 ? paginatedEmployees.map((emp) => (
                    <div className="col-12 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch" key={emp.id}>
                        <motion.div className="w-100" whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                             <EmployeeCard employee={emp} onEdit={handleEdit} onDelete={() => handleDelete(emp.id)} onToggleStatus={handleToggleStatus} />
                        </motion.div>
                    </div>
                )) : (
                    <div className="col-12 py-5 text-center"><h5 className="text-muted">No employees found.</h5></div>
                )}
            </motion.div>
        ) : (
            <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <EmployeeTable 
                    employees={paginatedEmployees} 
                    onEdit={handleEdit} 
                    onDelete={(id) => handleDelete(id)} 
                    onToggleStatus={handleToggleStatus} 
                />
            </motion.div>
        )}
      </AnimatePresence>

      <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          totalItems={filteredEmployees.length} 
          itemsPerPage={itemsPerPage} 
          onPageChange={setCurrentPage} 
      />

      <EmployeeFormModal show={showModal} onHide={() => setShowModal(false)} onSuccess={() => mutate()} employeeToEdit={selectedEmployee} />
      <ConfirmDialog isOpen={dialog.isOpen} title={dialog.title} message={dialog.message} isDanger={dialog.isDanger} onConfirm={dialog.onConfirm} onCancel={closeDialog} />
    </div>
  );
}