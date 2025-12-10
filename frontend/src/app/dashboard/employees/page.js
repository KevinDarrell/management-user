'use client';
import { useState } from 'react';
import useSWR from 'swr';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import EmployeeCard from '@/components/EmployeeCard';
import EmployeeFormModal from '@/components/EmployeeFormModal';

const fetcher = url => api.get(url).then(res => res.data.data);

export default function EmployeePage() {

  const { data: employees, error, mutate } = useSWR('/employees', fetcher);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); 


  const handleAdd = () => {
    setSelectedEmployee(null);
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/employees/${id}`);
        toast.success('Employee deleted successfully');
        mutate();
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };

  if (error) return <div className="p-5 text-center text-danger">Failed to load data.</div>;
  if (!employees) return (
     <div className="p-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-muted mt-2">Loading employees...</p>
     </div>
  );

  return (
    <div>
    
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold text-dark mb-1">Employee Data</h2>
          <p className="text-muted mb-0">Manage your team members and their roles.</p>
        </div>
        <button onClick={handleAdd} className="btn btn-primary shadow-sm px-4 py-2 mt-3 mt-md-0 rounded-pill">
           <i className="bi bi-plus-lg me-2"></i> Add New Employee
        </button>
      </div>

      <div className="row">
        <AnimatePresence>
            {employees.length > 0 ? (
                employees.map((emp) => (
                    <EmployeeCard 
                        key={emp.id} 
                        employee={emp} 
                        onEdit={handleEdit} 
                        onDelete={handleDelete} 
                    />
                ))
            ) : (
    
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-12 text-center py-5">
                    <div className="bg-white rounded-circle d-inline-flex p-4 shadow-sm mb-3">
                        <i className="bi bi-people text-secondary opacity-50 display-4"></i>
                    </div>
                    <h5 className="text-dark fw-bold">No Employees Found</h5>
                    <p className="text-muted">Start by adding a new employee to your database.</p>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

  
      <EmployeeFormModal 
         show={showModal} 
         onHide={() => setShowModal(false)}
         onSuccess={() => mutate()} 
         employeeToEdit={selectedEmployee}
      />
    </div>
  );
}