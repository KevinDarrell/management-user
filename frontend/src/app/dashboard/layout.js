'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({ children }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="d-flex vh-100 overflow-hidden bg-light">
    
      <aside className="d-none d-lg-block h-100 shadow-end z-2">
         <Sidebar isMobile={false} />
      </aside>

      <AnimatePresence>
        {showMobileMenu && (
            <>
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="mobile-overlay d-lg-none"
                    onClick={() => setShowMobileMenu(false)}
                />
                <motion.div 
                    initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="position-fixed top-0 start-0 h-100 z-3"
                    style={{ width: '85%', maxWidth: '300px' }}
                >
                    <Sidebar isMobile={true} closeMobileMenu={() => setShowMobileMenu(false)} />
                </motion.div>
            </>
        )}
      </AnimatePresence>

      <main className="flex-grow-1 d-flex flex-column h-100 position-relative overflow-auto">
        
        <header className="glass-header px-4 py-3 d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
                <button className="btn btn-light border d-lg-none shadow-sm" onClick={() => setShowMobileMenu(true)}>
                    <i className="bi bi-list fs-5"></i>
                </button>
                <h5 className="mb-0 fw-bold text-dark d-none d-sm-block">Dashboard Overview</h5>
            </div>
            
            <div className="d-flex align-items-center gap-3">
               <button className="btn btn-white border rounded-circle p-2 position-relative shadow-sm">
                  <i className="bi bi-bell"></i>
                  <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"></span>
               </button>
            </div>
        </header>

        <div className="p-4">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {children}
            </motion.div>
        </div>

      </main>
    </div>
  );
}