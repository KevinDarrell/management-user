import api from '@/lib/axios';

const UserService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data.data; 
  },

  updateStatus: async (id, isActive) => {
    const response = await api.patch(`/users/${id}/status`, { isActive });
    return response.data;
  }
};

export default UserService;