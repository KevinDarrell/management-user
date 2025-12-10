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
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
    <div className="container-fluid min-vh-100 bg-white">
      <div className="row min-vh-100">
      
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-between p-5 position-relative overflow-hidden"
             style={{ backgroundColor: '#f8fafc' }}> 
           
           <motion.div 
              animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="position-absolute rounded-circle"
              style={{ 
                width: '600px', height: '600px', 
                background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(255,255,255,0) 70%)', 
                top: '-10%', left: '-10%', filter: 'blur(60px)', zIndex: 0
              }}
           />
           <motion.div 
              animate={{ scale: [1, 1.1, 1], y: [0, -50, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="position-absolute rounded-circle"
              style={{ 
                width: '500px', height: '500px', 
                background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(255,255,255,0) 70%)', 
                bottom: '-5%', right: '-5%', filter: 'blur(60px)', zIndex: 0
              }}
           />

           <div className="position-absolute top-0 start-0 w-100 h-100" 
                style={{ 
                  backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', 
                  backgroundSize: '32px 32px', 
                  opacity: 0.5,
                  zIndex: 0
                }}>
           </div>

           <div className="position-relative z-2">
             <div className="d-flex align-items-center gap-2 mb-4">
                <div className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{width: '40px', height: '40px'}}>
                  <i className="bi bi-exclude"></i>
                </div>
                <span className="fw-bold fs-5 text-dark tracking-tight">Enterprise.</span>
             </div>
           </div>

           <div className="position-relative z-2 my-auto">
             <motion.h1 
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                className="display-5 fw-bold mb-3 text-dark lh-sm" 
                style={{ letterSpacing: '-0.03em' }}
             >
               Simplicity is the <br/>
               ultimate <span className="text-primary position-relative">
                  sophistication.
                  <svg className="position-absolute w-100 start-0 bottom-0 text-primary opacity-25" style={{height: '12px', zIndex: -1}} viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
               </span>
             </motion.h1>
             <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
                className="lead text-secondary fw-medium" style={{maxWidth: '450px', fontSize: '1.1rem'}}
             >
               Managing your workforce shouldn't be complicated. Experience the new standard of efficiency.
             </motion.p>
           </div>

           <div className="position-relative z-2">
               <div className="d-inline-flex align-items-center gap-3 px-3 py-2 rounded-pill bg-white border shadow-sm">
                   <div className="d-flex">
                      {[1,2,3].map(i => (
                          <div key={i} className="rounded-circle bg-light border d-flex align-items-center justify-content-center" 
                               style={{width: '28px', height: '28px', marginLeft: i > 1 ? '-8px' : 0}}>
                              <i className="bi bi-person-fill text-secondary" style={{fontSize: '0.7rem'}}></i>
                          </div>
                      ))}
                   </div>
                   <div className="d-flex flex-column">
                       <span className="fw-bold text-dark x-small lh-1" style={{fontSize: '0.75rem'}}>2,000+ Users</span>
                       <span className="text-muted x-small lh-1" style={{fontSize: '0.65rem'}}>Joined this week</span>
                   </div>
               </div>
           </div>
        </div>

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
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-100 p-5 bg-white rounded-5 position-relative z-1 mx-3"
            style={{ 
                maxWidth: '460px', 
            
                boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05)' 
            }}
          >
            <div className="text-center mb-5">

              <div className="d-md-none mb-3 d-inline-flex align-items-center justify-content-center bg-primary text-white rounded-3 shadow-sm" style={{width: '36px', height: '36px'}}>
                  <i className="bi bi-exclude"></i>
              </div>
              <h3 className="fw-bold text-dark mb-1" style={{letterSpacing: '-0.02em'}}>Sign In</h3>
              <p className="text-secondary small">Enter your details to access workspace.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-secondary fw-bold x-small text-uppercase mb-2" style={{fontSize: '0.7rem', letterSpacing: '0.05em'}}>Username</label>
                <div className="input-group">
                    <span className="input-group-text bg-light border-light-subtle text-secondary ps-3"><i className="bi bi-person"></i></span>
                    <input 
                        type="text" name="username" 
                        className="form-control form-control-lg bg-light border-light-subtle text-dark fs-6" 
                        placeholder="Enter username" value={form.username} onChange={handleChange} required 
                    />
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="text-secondary fw-bold x-small text-uppercase" style={{fontSize: '0.7rem', letterSpacing: '0.05em'}}>Password</label>
                    <a href="/forgot-password" className="text-decoration-none x-small text-primary fw-bold hover-opacity-75" style={{fontSize: '0.8rem'}}>Forgot?</a>
                </div>
                <div className="input-group">
                    <span className="input-group-text bg-light border-light-subtle text-secondary ps-3"><i className="bi bi-lock"></i></span>
                    <input 
                        type="password" name="password" 
                        className="form-control form-control-lg bg-light border-light-subtle text-dark fs-6" 
                        placeholder="••••••••" value={form.password} onChange={handleChange} required 
                    />
                </div>
              </div>

              <div className="d-grid mb-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg py-3 rounded-3 fw-bold shadow-sm transition-all hover-scale" disabled={isLoading}>
                  {isLoading ? 'Authenticating...' : 'Sign In'}
                </button>
              </div>

              <div className="text-center border-top pt-4">
                <p className="text-muted small mb-0">
                  Don't have an account? <Link href="/register" className="text-dark fw-bold text-decoration-none ms-1">Create account</Link>
                </p>
              </div>
            </form>
          </motion.div>

          <div className="position-absolute bottom-0 w-100 text-center pb-4 text-muted x-small opacity-50">
             &copy; 2025 Enterprise Corp. All rights reserved.
          </div>
        </div>

      </div>
    </div>
  );
}