'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import api from '@/lib/axios';
import Link from 'next/link';
import AuthService from '@/services/auth.service';
import { useTheme } from '@/context/ThemeContext';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const { theme, toggleTheme } = useTheme();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await AuthService.register(form); 
      toast.success('Registration successful! Please login.');
      router.push('/login');
    } catch (error) {
      const msg = error.response?.data?.meta?.message || 'Registration failed';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const bgMain = theme === 'dark' ? '#0f172a' : '#f8fafc';
  const bgCard = theme === 'dark' ? '#1e293b' : '#ffffff'; 
  const borderCard = theme === 'dark' ? '#334155' : 'transparent';
  const inputBg = theme === 'dark' ? '#020617' : '#f8fafc';

  return (
    <div className="container-fluid vh-100 overflow-hidden transition-colors"
         style={{ backgroundColor: bgMain }}>

      <motion.button
         initial={{ opacity: 0 }} animate={{ opacity: 1 }}
         onClick={toggleTheme}
         className="position-absolute top-0 end-0 m-4 btn rounded-circle shadow-sm z-3 d-flex align-items-center justify-content-center border"
         style={{ width: '45px', height: '45px', backgroundColor: bgCard, borderColor: borderCard, color: theme === 'dark' ? '#f1f5f9' : '#334155' }}
      >
          {theme === 'light' ? <i className="bi bi-moon-stars-fill"></i> : <i className="bi bi-sun-fill text-warning"></i>}
      </motion.button>

      <div className="row h-100 g-0">

        <div className="col-md-6 d-flex align-items-center justify-content-center position-relative transition-colors"
             style={{ backgroundColor: bgMain }}>
          
          <div className="position-absolute w-100 h-100" 
               style={{ 
                 backgroundImage: `radial-gradient(${theme === 'dark' ? '#334155' : '#cbd5e1'} 1px, transparent 1px)`, 
                 backgroundSize: '32px 32px', opacity: 0.8
               }}>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} 
            className="w-100 p-5 rounded-5 position-relative z-1 border"
            style={{ 
                maxWidth: '480px', 
                backgroundColor: bgCard, 
                borderColor: borderCard,
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' 
            }}
          >
            <div className="text-center mb-4">
              <h3 className="fw-bold text-dark mb-1">Create Account</h3>
              <p className="text-secondary small">Get started with your free admin account.</p>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="text-secondary fw-bold x-small text-uppercase mb-2">Username</label>
                <div className="input-group">
                    <span className="input-group-text border-end-0 ps-3" style={{backgroundColor: inputBg, borderColor: borderCard, color: theme === 'dark'?'#94a3b8':'#6c757d'}}><i className="bi bi-person"></i></span>
                    <input type="text" name="username" className="form-control form-control-lg border-start-0 fs-6" 
                        style={{backgroundColor: inputBg, borderColor: borderCard, color: theme === 'dark'?'#fff':'#000'}}
                        placeholder="Choose a username" value={form.username} onChange={handleChange} required />
                </div>
              </div>

              <div className="mb-3">
                <label className="text-secondary fw-bold x-small text-uppercase mb-2">Email Address</label>
                <div className="input-group">
                    <span className="input-group-text border-end-0 ps-3" style={{backgroundColor: inputBg, borderColor: borderCard, color: theme === 'dark'?'#94a3b8':'#6c757d'}}><i className="bi bi-envelope"></i></span>
                    <input type="email" name="email" className="form-control form-control-lg border-start-0 fs-6" 
                        style={{backgroundColor: inputBg, borderColor: borderCard, color: theme === 'dark'?'#fff':'#000'}}
                        placeholder="name@company.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-secondary fw-bold x-small text-uppercase mb-2">Password</label>
                <div className="input-group">
                    <span className="input-group-text border-end-0 ps-3" style={{backgroundColor: inputBg, borderColor: borderCard, color: theme === 'dark'?'#94a3b8':'#6c757d'}}><i className="bi bi-lock"></i></span>
                    <input type="password" name="password" className="form-control form-control-lg border-start-0 fs-6" 
                        style={{backgroundColor: inputBg, borderColor: borderCard, color: theme === 'dark'?'#fff':'#000'}}
                        placeholder="Create a strong password" value={form.password} onChange={handleChange} required />
                </div>
              </div>

              <div className="d-grid mb-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg py-3 rounded-3 fw-bold shadow-sm transition-all hover-scale" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
              </div>

              <div className="text-center border-top pt-4" style={{borderColor: borderCard}}>
                <p className="text-muted small mb-0">
                  Already have an account? <Link href="/login" className="text-primary fw-bold text-decoration-none ms-1">Sign In</Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
        
    
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-between p-5 position-relative overflow-hidden transition-colors"
             style={{ backgroundColor: bgMain }}> 
           
           <motion.div 
              animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="position-absolute rounded-circle"
              style={{ 
                width: '600px', height: '600px', 
                background: theme === 'dark' 
                    ? 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(0,0,0,0) 70%)'
                    : 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(255,255,255,0) 70%)',
                top: '-10%', right: '-15%', filter: 'blur(60px)', zIndex: 0
              }}
           />
           
           <div className="position-relative z-2 ms-auto text-end">
             <div className="d-flex align-items-center justify-content-end gap-2 mb-4">
                <span className="fw-bold fs-5 text-dark tracking-tight">HR System</span>
             </div>
           </div>

           <div className="position-relative z-2 my-auto text-end">
             <motion.h1 
                className="display-5 fw-bold mb-3 text-dark lh-sm"
                style={{ letterSpacing: '-0.03em' }}
             >
               Manage your team <br/> with <span className="text-primary">confidence.</span>
             </motion.h1>
             <p className="lead text-secondary fw-medium ms-auto" style={{maxWidth: '450px'}}>
               Stop relying on spreadsheets. Get the visibility and control you need to lead your organization effectively.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}