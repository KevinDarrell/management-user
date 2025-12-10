import api from '@/lib/axios';

const EmployeeService = {
  getAll: async () => {
    const response = await api.get('/employees');
    return response.data.data; 
  },

  create: async (payload) => {    
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };
    
    const response = await api.post('/employees', payload, config);
    return response.data;
  },

  update: async (id, payload) => {
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };
    
    const response = await api.put(`/employees/${id}`, payload, config);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  }
};

export default EmployeeService;