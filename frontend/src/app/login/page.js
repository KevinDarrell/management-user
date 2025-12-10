'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import AuthService from '@/services/auth.service';
import { useTheme } from '@/context/ThemeContext';
import AuthLayout from '@/components/auth/AuthLayout'; // Import Layout

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });

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
      toast.error(error.response?.data?.meta?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const borderCard = theme === 'dark' ? '#334155' : 'transparent';
  const inputBg = theme === 'dark' ? '#020617' : '#f8fafc';
  const textMain = theme === 'dark' ? '#fff' : '#000';

  return (
    <AuthLayout 
        title={<span>Simplicity is the <br/><span className="text-primary">ultimate sophistication.</span></span>}
        subtitle="Managing your workforce shouldn't be complicated."
    >
        <div className="text-center mb-5">
          <h3 className={`fw-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>Sign In</h3>
          <p className="text-secondary small">Enter your details to access workspace.</p>
        </div>

        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="text-secondary fw-bold x-small text-uppercase mb-2">Username</label>
                <div className="input-group">
                    <span className="input-group-text border-end-0 ps-3" style={{backgroundColor: inputBg, borderColor: borderCard}}>
                        <i className={`bi bi-person ${theme === 'dark' ? 'text-secondary' : ''}`}></i>
                    </span>
                    <input type="text" name="username" className="form-control form-control-lg border-start-0 fs-6" 
                        style={{backgroundColor: inputBg, borderColor: borderCard, color: textMain}} 
                        placeholder="Enter username" value={form.username} onChange={handleChange} required />
                </div>
            </div>

            <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="text-secondary fw-bold x-small text-uppercase">Password</label>
                    <Link href="/forgot-password" className="text-decoration-none x-small text-primary fw-bold hover-opacity-75">Forgot?</Link>
                </div>
                <div className="input-group">
                    <span className="input-group-text border-end-0 ps-3" style={{backgroundColor: inputBg, borderColor: borderCard}}>
                        <i className={`bi bi-lock ${theme === 'dark' ? 'text-secondary' : ''}`}></i>
                    </span>
                    <input type={showPassword ? "text" : "password"} name="password" 
                        className="form-control form-control-lg border-start-0 border-end-0 fs-6" 
                        style={{backgroundColor: inputBg, borderColor: borderCard, color: textMain}}
                        placeholder="••••••••" value={form.password} onChange={handleChange} required />
                    <button type="button" className="input-group-text border-start-0 pe-3 cursor-pointer"
                        style={{backgroundColor: inputBg, borderColor: borderCard}} onClick={() => setShowPassword(!showPassword)}>
                        <i className={`bi ${showPassword ? 'bi-eye' : 'bi-eye-slash'} ${theme === 'dark' ? 'text-secondary' : ''}`}></i>
                    </button>
                </div>
            </div>

            <div className="d-grid mb-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg py-3 rounded-3 fw-bold shadow-sm">
                  {isLoading ? 'Authenticating...' : 'Sign In'}
                </button>
            </div>
            
            <div className="text-center border-top pt-4" style={{borderColor: borderCard}}>
                <p className="text-muted small mb-0">Don't have an account? <Link href="/register" className="text-primary fw-bold text-decoration-none ms-1">Create account</Link></p>
            </div>
        </form>
    </AuthLayout>
  );
}