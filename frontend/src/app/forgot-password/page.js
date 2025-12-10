'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      toast.success('Reset link sent to your email!');
    }, 1500);
  };

  return (
    <div className="container-fluid vh-100 bg-white d-flex align-items-center justify-content-center">
     
      <div className="position-absolute w-100 h-100" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px', opacity: 0.5 }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="card border-0 shadow-lg p-4 p-md-5 rounded-5 position-relative z-1"
        style={{ maxWidth: '450px', width: '100%' }}
      >
        <div className="text-center mb-4">
            <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex p-3 mb-3">
                <i className={`bi ${isSent ? 'bi-envelope-check-fill' : 'bi-key-fill'} fs-2`}></i>
            </div>
            <h3 className="fw-bold">{isSent ? 'Check your mail' : 'Forgot Password?'}</h3>
            <p className="text-secondary small">
                {isSent 
                    ? `We have sent a password recover instructions to ${email}`
                    : 'No worries, we\'ll send you reset instructions.'}
            </p>
        </div>

        {!isSent ? (
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="form-label small fw-bold text-uppercase text-secondary">Email Address</label>
                    <input 
                        type="email" 
                        className="form-control form-control-lg bg-light border-0" 
                        placeholder="Enter your email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-100 rounded-3 mb-3" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Reset Password'}
                </button>
                <div className="text-center">
                    <Link href="/login" className="text-decoration-none text-secondary small fw-bold">
                        <i className="bi bi-arrow-left me-1"></i> Back to Login
                    </Link>
                </div>
            </form>
        ) : (
            <div className="text-center">
                <button onClick={() => window.open('https://gmail.com', '_blank')} className="btn btn-primary w-100 rounded-3 mb-3">
                    Open Email App
                </button>
                <p className="small text-muted">
                    Didn't receive the email? <span className="text-primary fw-bold cursor-pointer" onClick={() => setIsSent(false)}>Click to resend</span>
                </p>
                <div className="mt-4">
                    <Link href="/login" className="text-decoration-none text-secondary small fw-bold">
                        Back to Login
                    </Link>
                </div>
            </div>
        )}
      </motion.div>
    </div>
  );
}