'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header'; 
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

      <aside className="d-none d-lg-block h-100 shadow-sm z-2 position-relative" style={{width: '260px'}}>
         <Sidebar isMobile={false} />
      </aside>

      <AnimatePresence>
        {showMobileMenu && (
            <>
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="mobile-overlay d-xl-none"
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

      <main className="flex-grow-1 d-flex flex-column h-100 position-relative overflow-hidden">
      
        <Header toggleMobileMenu={() => setShowMobileMenu(true)} />
        <div className="p-4 overflow-auto h-100 pb-5">
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