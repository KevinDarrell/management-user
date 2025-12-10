'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import AuthService from '@/services/auth.service';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const { theme, toggleTheme } = useTheme();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { token, user } = await AuthService.login(form);
      
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

  const bgMain = theme === 'dark' ? '#0f172a' : '#f8fafc'; 
  const bgCard = theme === 'dark' ? '#1e293b' : '#ffffff'; 
  const borderCard = theme === 'dark' ? '#334155' : 'transparent';

  return (
    <div className="container-fluid vh-100 overflow-hidden transition-colors" 
         style={{ backgroundColor: bgMain }}>
      
      <motion.button
         initial={{ opacity: 0 }} animate={{ opacity: 1 }}
         onClick={toggleTheme}
         className="position-absolute top-0 end-0 m-4 btn rounded-circle shadow-sm z-3 d-flex align-items-center justify-content-center border"
         style={{ 
             width: '45px', height: '45px', 
             backgroundColor: bgCard, 
             borderColor: borderCard,
             color: theme === 'dark' ? '#f1f5f9' : '#334155' 
         }}
        >
          {theme === 'light' ? <i className="bi bi-moon-stars-fill"></i> : <i className="bi bi-sun-fill text-warning"></i>}
          </motion.button>

          <div className="row h-100">
            <div className="col-md-6 d-none d-md-flex flex-column justify-content-between p-5 position-relative overflow-hidden transition-colors"
             style={{ backgroundColor: bgMain }}> 
            <motion.div 
              animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="position-absolute rounded-circle"
              style={{ 
                width: '600px', height: '600px', 
                background: theme === 'dark' 
                    ? 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)' // Lebih soft
                    : 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(255,255,255,0) 70%)',
                top: '-10%', left: '-10%', filter: 'blur(60px)', zIndex: 0
              }}
           />

           <div className="position-relative z-2 my-auto">
             <motion.h1 
                className="display-5 fw-bold mb-3 text-dark lh-sm"
                style={{ letterSpacing: '-0.03em' }}
             >
               Simplicity is the <br/>
               ultimate <span className="text-primary">sophistication.</span>
             </motion.h1>
             <p className="lead text-secondary fw-medium">
               Managing your workforce shouldn't be complicated.
             </p>
           </div>
           
           <div className="position-relative z-2">
               <div className={`d-inline-flex align-items-center gap-3 px-3 py-2 rounded-pill border shadow-sm ${theme === 'dark' ? 'bg-dark border-secondary' : 'bg-white'}`}
                    style={{backgroundColor: bgCard, borderColor: borderCard}}>
                   <span className="fw-bold text-dark x-small">HR System</span>
               </div>
           </div>
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center position-relative transition-colors"
             style={{ backgroundColor: bgMain }}> 

          <div className="position-absolute w-100 h-100" 
               style={{ 
                 backgroundImage: `radial-gradient(${theme === 'dark' ? '#334155' : '#cbd5e1'} 1px, transparent 1px)`, 
                 backgroundSize: '32px 32px', 
                 opacity: 0.8
               }}>
          </div>

          <motion.div 
            className="w-100 p-5 rounded-5 position-relative z-1 border"

            style={{ 
                maxWidth: '460px', 
                backgroundColor: bgCard, 
                borderColor: borderCard,
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' 
            }}
          >
            <div className="text-center mb-5">
              <h3 className="fw-bold text-dark mb-1">Sign In</h3>
              <p className="text-secondary small">Enter your details to access workspace.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-secondary fw-bold x-small text-uppercase mb-2">Username</label>
                <div className="input-group">
                    <span className={`input-group-text border-end-0 ps-3 ${theme === 'dark' ? 'bg-dark border-secondary text-light' : 'bg-light border-light-subtle text-secondary'}`}
                          style={{backgroundColor: theme === 'dark' ? '#020617' : '#f8fafc', borderColor: borderCard}}>
                        <i className="bi bi-person"></i>
                    </span>
                    <input 
                        type="text" name="username" 
                        className="form-control form-control-lg border-start-0 fs-6" 
                        style={{backgroundColor: theme === 'dark' ? '#020617' : '#f8fafc', borderColor: borderCard, color: theme === 'dark' ? '#fff' : '#000'}}
                        placeholder="Enter username" value={form.username} onChange={handleChange} required 
                    />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-secondary fw-bold x-small text-uppercase mb-2">Password</label>
                <div className="input-group">
                    <span className={`input-group-text border-end-0 ps-3 ${theme === 'dark' ? 'bg-dark border-secondary text-light' : 'bg-light border-light-subtle text-secondary'}`}
                          style={{backgroundColor: theme === 'dark' ? '#020617' : '#f8fafc', borderColor: borderCard}}>
                        <i className="bi bi-lock"></i>
                    </span>
                    <input 
                        type="password" name="password" 
                        className="form-control form-control-lg border-start-0 fs-6" 
                        style={{backgroundColor: theme === 'dark' ? '#020617' : '#f8fafc', borderColor: borderCard, color: theme === 'dark' ? '#fff' : '#000'}}
                        placeholder="••••••••" value={form.password} onChange={handleChange} required 
                    />
                </div>
              </div>

              <div className="d-grid mb-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg py-3 rounded-3 fw-bold shadow-sm">
                  {isLoading ? 'Authenticating...' : 'Sign In'}
                </button>
              </div>
              
              <div className="text-center border-top pt-4" style={{borderColor: borderCard}}>
                <p className="text-muted small mb-0">
                  Don't have an account? <Link href="/register" className="text-primary fw-bold text-decoration-none ms-1">Create account</Link>
                </p>
              </div>
            </form>
          </motion.div>
          
          <div className="position-absolute bottom-0 w-100 text-center pb-4 text-muted x-small opacity-50">
             &copy; 2025 User Management System
          </div>

        </div>
      </div>
    </div>
  );
}