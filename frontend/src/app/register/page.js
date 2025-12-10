'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import api from '@/app/lib/axios';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post('/auth/register', form);
      toast.success('Registration successful! Please login.');
      router.push('/login');
    } catch (error) {
      const msg = error.response?.data?.meta?.message || 'Registration failed';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 overflow-hidden">
      <div className="row h-100">
        <div className="col-md-6 order-md-2 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5 position-relative"
             style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}> 
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-center z-1"
           >
             <h1 className="display-4 fw-bold mb-3">Join Us Today.</h1>
             <p className="lead opacity-75">Create your account and start managing your team.</p>
           </motion.div>
        </div>

        <div className="col-md-6 order-md-1 d-flex align-items-center justify-content-center bg-white">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-100 p-4" 
            style={{ maxWidth: '450px' }}
          >
            <div className="mb-4">
              <h2 className="fw-bold text-dark">Create Account</h2>
              <p className="text-muted">It only takes a minute.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small fw-bold text-uppercase text-secondary">Username</label>
                <input type="text" name="username" className="form-control form-control-lg bg-light border-0" required onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label small fw-bold text-uppercase text-secondary">Email Address</label>
                <input type="email" name="email" className="form-control form-control-lg bg-light border-0" required onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold text-uppercase text-secondary">Password</label>
                <input type="password" name="password" className="form-control form-control-lg bg-light border-0" required onChange={handleChange} />
              </div>

              <button type="submit" className="btn btn-dark btn-lg w-100 py-3 rounded-3 mb-3" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Register Account'}
              </button>

              <div className="text-center">
                 <p className="text-muted small">Already have an account? <Link href="/login" className="text-dark fw-bold">Sign In</Link></p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}