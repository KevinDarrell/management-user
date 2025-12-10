'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import api from '@/lib/axios';
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
    <div className="container-fluid vh-100 overflow-hidden bg-white">

      <div className="row h-100 g-0">

        <div className="col-md-6 d-flex align-items-center justify-content-center position-relative"
             style={{ backgroundColor: '#f8fafc' }}>

          <div className="position-absolute w-100 h-100" 
               style={{ 
                 backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
                 backgroundSize: '32px 32px', 
                 opacity: 0.8,
                 zIndex: 0
               }}>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-100 p-5 bg-white rounded-5 position-relative z-1"
            style={{ 
                maxWidth: '480px', 

                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05), 0 0 2px 0 rgba(0,0,0,0.05)' 
            }}
          >
            <div className="text-center mb-4">

              <div className="d-md-none mb-3 d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-3 shadow-sm" style={{width: '36px', height: '36px'}}>
                  <i className="bi bi-exclude"></i>
              </div>
              <h3 className="fw-bold text-dark mb-1" style={{letterSpacing: '-0.02em'}}>Create Account</h3>
              <p className="text-secondary small">Get started with your free admin account.</p>
            </div>

            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label className="text-secondary fw-bold x-small text-uppercase mb-2" style={{fontSize: '0.7rem', letterSpacing: '0.05em'}}>Username</label>
                <div className="input-group">
                    <span className="input-group-text bg-light border-light-subtle text-secondary ps-3"><i className="bi bi-person"></i></span>
                    <input 
                        type="text" name="username" className="form-control form-control-lg bg-light border-light-subtle text-dark fs-6" 
                        placeholder="Choose a username" value={form.username} onChange={handleChange} required 
                    />
                </div>
              </div>

              <div className="mb-3">
                <label className="text-secondary fw-bold x-small text-uppercase mb-2" style={{fontSize: '0.7rem', letterSpacing: '0.05em'}}>Email Address</label>
                <div className="input-group">
                    <span className="input-group-text bg-light border-light-subtle text-secondary ps-3"><i className="bi bi-envelope"></i></span>
                    <input 
                        type="email" name="email" className="form-control form-control-lg bg-light border-light-subtle text-dark fs-6" 
                        placeholder="name@company.com" value={form.email} onChange={handleChange} required 
                    />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-secondary fw-bold x-small text-uppercase mb-2" style={{fontSize: '0.7rem', letterSpacing: '0.05em'}}>Password</label>
                <div className="input-group">
                    <span className="input-group-text bg-light border-light-subtle text-secondary ps-3"><i className="bi bi-lock"></i></span>
                    <input 
                        type="password" name="password" className="form-control form-control-lg bg-light border-light-subtle text-dark fs-6" 
                        placeholder="Create a strong password" value={form.password} onChange={handleChange} required 
                    />
                </div>
                <div className="form-text x-small text-muted mt-2">
                    Must be at least 8 characters long.
                </div>
              </div>

              <div className="d-grid mb-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg py-3 rounded-3 fw-bold shadow-sm transition-all hover-scale" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </div>

              <div className="text-center border-top pt-4">
                <p className="text-muted small mb-0">
                  Already have an account? <Link href="/login" className="text-dark fw-bold text-decoration-none ms-1 border-bottom border-dark pb-0">Sign In</Link>
                </p>
              </div>
            </form>
            
            <div className="text-center mt-4 text-muted x-small opacity-50 d-md-none">
             &copy; 2025 Enterprise Corp.
            </div>
          </motion.div>
        </div>

        <div className="col-md-6 d-none d-md-flex flex-column justify-content-between p-5 position-relative overflow-hidden"
             style={{ backgroundColor: '#f8fafc' }}> 
           
           <motion.div 
              animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="position-absolute rounded-circle"
              style={{ 
                width: '600px', height: '600px', 
                background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(255,255,255,0) 70%)', 
                top: '-10%', right: '-15%', filter: 'blur(60px)', zIndex: 0
              }}
           />
           <motion.div 
              animate={{ scale: [1, 1.1, 1], y: [0, -40, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              className="position-absolute rounded-circle"
              style={{ 
                width: '500px', height: '500px', 
                background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(255,255,255,0) 70%)', 
                bottom: '-5%', left: '-5%', filter: 'blur(60px)', zIndex: 0
              }}
           />

           <div className="position-absolute top-0 start-0 w-100 h-100" 
                style={{ 
                  backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
                  backgroundSize: '32px 32px', 
                  opacity: 0.5, zIndex: 0
                }}>
           </div>
           
           <div className="position-relative z-2 ms-auto text-end">
             <div className="d-flex align-items-center justify-content-end gap-2 mb-4">
                <span className="fw-bold fs-5 text-dark tracking-tight">Enterprise.</span>
                <div className="bg-white text-primary rounded-3 d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{width: '40px', height: '40px'}}>
                  <i className="bi bi-exclude"></i>
                </div>
             </div>
           </div>

           <div className="position-relative z-2 my-auto text-end">
             <motion.h1 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                className="display-5 fw-bold mb-3 text-dark lh-sm" 
                style={{ letterSpacing: '-0.03em' }}
             >
               Start your journey <br/>
               with <span className="text-primary position-relative">
                  better tools.
                  <svg className="position-absolute w-100 start-0 bottom-0 text-primary opacity-25" style={{height: '12px', zIndex: -1}} viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
               </span>
             </motion.h1>
             <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
                className="lead text-secondary fw-medium ms-auto" style={{maxWidth: '450px', fontSize: '1.1rem'}}
             >
               Join thousands of companies managing their workforce efficiently. It takes less than a minute.
             </motion.p>
           </div>

           <div className="position-relative z-2 text-end">
               <div className="d-inline-flex gap-4 opacity-75">
                  <div className="d-flex align-items-center gap-2">
                      <span className="text-secondary small fw-bold">Enterprise Security</span>
                      <i className="bi bi-shield-check text-primary"></i>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                      <span className="text-secondary small fw-bold">Fast Performance</span>
                      <i className="bi bi-lightning-charge text-warning"></i>
                  </div>
               </div>
               <div className="mt-3 text-muted x-small opacity-50">
                &copy; 2025 Enterprise Corp.
               </div>
           </div>
        </div>

      </div>
    </div>
  );
}