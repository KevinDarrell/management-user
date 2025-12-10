'use client';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap'; 
import { toast } from 'sonner';
import api from '@/lib/axios';
import { useNotification } from '@/context/NotificationContext';

export default function EmployeeFormModal({ show, onHide, onSuccess, employeeToEdit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    departemen: '',
    phone: '',
    photo: null
  });

  useEffect(() => {
    if (show) {
      if (employeeToEdit) {
    
        setFormData({
          name: employeeToEdit.name,
          position: employeeToEdit.position,
          phone: employeeToEdit.phone,
          photo: null 
        });
       
        setPreview(employeeToEdit.photo ? `http://localhost:5000${employeeToEdit.photo}` : null);
      } else {
       
        setFormData({ name: '', position: '', phone: '', photo: null });
        setPreview(null);
      }
    }
  }, [show, employeeToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const { addNotification } = useNotification();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('position', formData.position);
    payload.append('phone', formData.phone);
    payload.append('department', formData.department || 'General'); 
    
    if (formData.photo) {
      payload.append('photo', formData.photo);
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    };

    if (employeeToEdit) {
      await api.put(`/employees/${employeeToEdit.id}`, payload, config);
      toast.success('Employee updated successfully!');
      addNotification(
            'Employee Updated', 
            `${formData.name} details have been updated.`, 
            'info'
        );
    } else {
   
      await api.post('/employees', payload, config);
      toast.success('New employee added!');
      addNotification(
            'New Employee Added', 
            `${formData.name} has joined the ${formData.department || 'General'} department.`, 
            'success'
        );
    }

    onSuccess();
    onHide();
  } catch (error) {
    console.error("Upload Error:", error);
    const msg = error.response?.data?.meta?.message || 'Upload failed. Check file size/format.';
    toast.error(msg);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static" className="fade-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">
          {employeeToEdit ? 'Edit Employee' : 'Add New Employee'}
        </Modal.Title>
      </Modal.Header>
      
      <form onSubmit={handleSubmit}>
        <Modal.Body className="pt-4">
          
          <div className="d-flex flex-column align-items-center mb-4">
            <div className="position-relative mb-2">
                <div className="rounded-circle overflow-hidden border bg-light d-flex align-items-center justify-content-center" 
                     style={{ width: '100px', height: '100px' }}>
                    {preview ? (
                        <img src={preview} alt="Preview" className="w-100 h-100 object-fit-cover" />
                    ) : (
                        <i className="bi bi-camera fs-1 text-secondary opacity-50"></i>
                    )}
                </div>
                <label className="btn btn-sm btn-primary rounded-circle position-absolute bottom-0 end-0 shadow-sm" 
                       style={{width: '32px', height: '32px', padding: '4px'}}>
                   <i className="bi bi-pencil-fill small"></i>
                   <input type="file" accept="image/jpeg, image/jpg" className="d-none" onChange={handleFileChange} />
                </label>
            </div>
            <small className="text-muted" style={{fontSize: '0.75rem'}}>JPG/JPEG Max 300KB</small>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-uppercase text-secondary">Full Name</label>
            <input type="text" name="name" className="form-control" required value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" />
          </div>
          
          <div className="mb-3">
            <label className="form-label small fw-bold text-uppercase text-secondary">Position</label>
            <input type="text" name="position" className="form-control" required value={formData.position} onChange={handleChange} placeholder="e.g. Software Engineer" />
          </div>

          <div className="mb-3">
            <label className="text-label">Department</label>
            <select name="department" className="form-select" value={formData.department} onChange={handleChange}>
                <option value="IT">Information Technology</option>
                <option value="HR">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
            </select>
            </div>  

          <div className="mb-3">
            <label className="form-label small fw-bold text-uppercase text-secondary">Phone Number</label>
            <input type="text" name="phone" className="form-control" required value={formData.phone} onChange={handleChange} placeholder="e.g. 0812..." />
          </div>

        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={onHide} className="border">Cancel</Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}