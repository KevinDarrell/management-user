'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; 
import { motion } from 'framer-motion'; 
import api from '@/lib/axios';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
     
      const response = await api.post('/auth/login', form);
      
      const { token, user } = response.data.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success(`Welcome back, ${user.username}!`);
      
      
      router.push('/dashboard'); 
    } catch (error) {
    
      const msg = error.response?.data?.meta?.message || 'Login failed';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 overflow-hidden">
      <div className="row h-100">
        
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5 position-relative"
             style={{ 
               background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
             }}>
           
           <div className="position-absolute rounded-circle bg-white opacity-10" 
                style={{ width: '300px', height: '300px', top: '-50px', left: '-50px' }}></div>
           <div className="position-absolute rounded-circle bg-white opacity-10" 
                style={{ width: '150px', height: '150px', bottom: '10%', right: '10%' }}></div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="text-center z-1"
           >
             <h1 className="display-4 fw-bold mb-3">Enterprise Corp.</h1>
             <p className="lead opacity-75">Manage your workforce efficiently using our modern platform.</p>
           </motion.div>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-100 p-4" 
            style={{ maxWidth: '450px' }}
          >
            <div className="mb-5">
              <h2 className="fw-bold text-dark">Sign In</h2>
              <p className="text-muted">Enter your credentials to access your account.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label text-secondary small fw-bold text-uppercase">Username</label>
                <input 
                  type="text" 
                  name="username"
                  className="form-control form-control-lg bg-light border-0" 
                  placeholder="e.g. admin1"
                  value={form.username}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="mb-4">
                <label className="form-label text-secondary small fw-bold text-uppercase">Password</label>
                <input 
                  type="password" 
                  name="password"
                  className="form-control form-control-lg bg-light border-0" 
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="d-grid mb-4">
                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg py-3 rounded-3 fw-bold shadow-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span><span className="spinner-border spinner-border-sm me-2"></span>Signing in...</span>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-muted small">
                  Don't have an account? <Link href="/register" className="text-primary text-decoration-none fw-bold">Register here</Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
}