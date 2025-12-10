'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import AuthService from '@/services/auth.service';
import { useTheme } from '@/context/ThemeContext';
import AuthLayout from '@/components/auth/AuthLayout';

export default function RegisterPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });

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

  const borderCard = theme === 'dark' ? '#334155' : 'transparent';
  const inputBg = theme === 'dark' ? '#020617' : '#f8fafc';
  const textMain = theme === 'dark' ? '#fff' : '#000';

  return (
    <AuthLayout 
        reverse={true} 
        appName="" 
        title={<span>Manage your team <br/> with <span className="text-primary">confidence.</span></span>}
        subtitle="Stop relying on spreadsheets. Get the visibility and control you need to lead your organization effectively."
    >
        <div className="text-center mb-4">
          <h3 className={`fw-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>Create Account</h3>
          <p className="text-secondary small">Get started with your free admin account.</p>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="text-secondary fw-bold x-small text-uppercase mb-2">Username</label>
                <div className="input-group">
                    <span className="input-group-text border-end-0 ps-3" style={{backgroundColor: inputBg, borderColor: borderCard}}>
                        <i className={`bi bi-person ${theme === 'dark' ? 'text-secondary' : ''}`}></i>
                    </span>
                    <input type="text" name="username" className="form-control form-control-lg border-start-0 fs-6" 
                        style={{backgroundColor: inputBg, borderColor: borderCard, color: textMain}} 
                        placeholder="Choose a username" value={form.username} onChange={handleChange} required />
                </div>
            </div>

            <div className="mb-3">
                <label className="text-secondary fw-bold x-small text-uppercase mb-2">Email Address</label>
                <div className="input-group">
                    <span className="input-group-text border-end-0 ps-3" style={{backgroundColor: inputBg, borderColor: borderCard}}>
                        <i className={`bi bi-envelope ${theme === 'dark' ? 'text-secondary' : ''}`}></i>
                    </span>
                    <input type="email" name="email" className="form-control form-control-lg border-start-0 fs-6" 
                        style={{backgroundColor: inputBg, borderColor: borderCard, color: textMain}} 
                        placeholder="name@company.com" value={form.email} onChange={handleChange} required />
                </div>
            </div>

            <div className="mb-4">
                <label className="text-secondary fw-bold x-small text-uppercase mb-2">Password</label>
                <div className="input-group">
                    <span className="input-group-text border-end-0 ps-3" style={{backgroundColor: inputBg, borderColor: borderCard}}>
                        <i className={`bi bi-lock ${theme === 'dark' ? 'text-secondary' : ''}`}></i>
                    </span>
                    <input type={showPassword ? "text" : "password"} name="password" 
                        className="form-control form-control-lg border-start-0 border-end-0 fs-6" 
                        style={{backgroundColor: inputBg, borderColor: borderCard, color: textMain}} 
                        placeholder="Create a strong password" value={form.password} onChange={handleChange} required />
                    
                    <button type="button" className="input-group-text border-start-0 pe-3 cursor-pointer"
                        style={{backgroundColor: inputBg, borderColor: borderCard}} onClick={() => setShowPassword(!showPassword)}>
                        <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'} ${theme === 'dark' ? 'text-secondary' : ''}`}></i>
                    </button>
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
    </AuthLayout>
  );
}