import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'sonner';
import EmployeeService from '@/services/employee.service';
import { useNotification } from '@/context/NotificationContext';

export default function EmployeeFormModal({ show, onHide, onSuccess, employeeToEdit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  

  const [formData, setFormData] = useState({ 
      name: '', 
      position: '', 
      department: 'IT', 
      phone: '', 
      photo: null 
  });
  
  const { addNotification } = useNotification();

  useEffect(() => {
    if (show) {
        if (employeeToEdit) {
            setFormData({
                name: employeeToEdit.name || '',
                position: employeeToEdit.position || '',
                department: employeeToEdit.department || 'IT',
                phone: employeeToEdit.phone || '',
                photo: null 
            });
            setPreview(employeeToEdit.photo ? `http://localhost:5000${employeeToEdit.photo}` : null);
        } else {
            
            setFormData({ name: '', position: '', department: 'IT', phone: '', photo: null });
            setPreview(null);
        }
    }
  }, [employeeToEdit, show]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 300 * 1024) { 
        toast.error('File too large! Max 300KB.');
        e.target.value = null;
        return;
      }
      setFormData({ ...formData, photo: file });
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = new FormData();
      
      payload.append('name', formData.name);
      payload.append('position', formData.position);
      payload.append('department', formData.department || 'General');
      
      
      payload.append('phone', formData.phone || ''); 

      
      if (formData.photo instanceof File) {
          payload.append('photo', formData.photo);
      }

      if (employeeToEdit) {
        
        await EmployeeService.update(employeeToEdit.id, payload);
        
        toast.success('Employee updated successfully!');
        addNotification('Employee Updated', `${formData.name} details have been updated.`, 'info');
      } else {
      
        await EmployeeService.create(payload);
        
        toast.success('New employee added!');
        addNotification('New Employee Added', `${formData.name} has joined the team.`, 'success');
      }

      onSuccess();
      onHide();
    } catch (error) {
      console.error("Submit Error:", error);
      const msg = error.response?.data?.meta?.message || 'Something went wrong';
      const validationErrors = error.response?.data?.errors;
      
      if (validationErrors) {
        
          toast.error(validationErrors[0] || msg);
      } else {
          toast.error(msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" keyboard={false} contentClassName="border-0 rounded-4 shadow-lg overflow-hidden transition-colors">
       <div className="modal-header border-bottom-0 p-4 pb-0 bg-white dark:bg-slate-800">
           <div>
               <h5 className="modal-title fw-bold text-dark">{employeeToEdit ? 'Edit Employee' : 'New Employee'}</h5>
               <p className="text-secondary small mb-0">Fill in the information below.</p>
           </div>
           <button type="button" className="btn-close" onClick={onHide} aria-label="Close"></button>
       </div>
       
       <div className="modal-body p-4 bg-white dark:bg-slate-800">
           <form onSubmit={handleSubmit}>
                {/* Photo Upload */}
                <div className="d-flex justify-content-center mb-4">
                    <div className="position-relative cursor-pointer text-center group-hover">
                        <div className="rounded-circle border d-flex align-items-center justify-content-center overflow-hidden bg-light" 
                             style={{width: '100px', height: '100px'}}>
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-100 h-100 object-fit-cover" />
                            ) : (
                                <i className="bi bi-camera fs-1 text-secondary opacity-50"></i>
                            )}
                        </div>
                        <input type="file" className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer" 
                               accept="image/*" onChange={handleFileChange} />
                        <div className="mt-2 small text-primary fw-bold">Change Photo</div>
                    </div>
                </div>

                <div className="row g-3">
                    <div className="col-12">
                        <label className="form-label x-small fw-bold text-uppercase text-secondary">Full Name</label>
                        <input type="text" name="name" className="form-control" placeholder="John Doe" 
                               value={formData.name} onChange={handleChange} required />
                    </div>
                    
                    <div className="col-md-6">
                        <label className="form-label x-small fw-bold text-uppercase text-secondary">Position</label>
                        <input type="text" name="position" className="form-control" placeholder="Software Engineer" 
                               value={formData.position} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label x-small fw-bold text-uppercase text-secondary">Department</label>
                        <select name="department" className="form-select cursor-pointer" 
                                value={formData.department} onChange={handleChange}>
                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">Marketing</option>
                            <option value="General">General</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <label className="form-label x-small fw-bold text-uppercase text-secondary">Phone Number</label>
                        <input type="tel" name="phone" className="form-control" placeholder="+62 812..." 
                               value={formData.phone} onChange={handleChange} />
                    </div>
                </div>

                <div className="d-grid mt-4 pt-2">
                    <button type="submit" className="btn btn-primary btn-lg rounded-3 fw-bold shadow-sm" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
           </form>
       </div>
    </Modal>
  );
}