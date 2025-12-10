'use client';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function AuthLayout({ 
  children, 
  title, 
  subtitle, 
  reverse = false, 
  appName = "Enterprise." 
}) {
  const { theme, toggleTheme } = useTheme();

  const bgMain = theme === 'dark' ? '#0f172a' : '#f8fafc';
  const bgCard = theme === 'dark' ? '#1e293b' : '#ffffff'; 
  const borderCard = theme === 'dark' ? '#334155' : 'transparent';

  const blobColorLight = reverse ? 'rgba(20,184,166,0.15)' : 'rgba(59,130,246,0.15)'; 
  const blobColorDark = reverse ? 'rgba(20,184,166,0.15)' : 'rgba(99,102,241,0.15)';

  return (
    <div className="container-fluid vh-100 overflow-hidden transition-colors" style={{ backgroundColor: bgMain }}>
      
      <motion.button
         initial={{ opacity: 0 }} animate={{ opacity: 1 }}
         onClick={toggleTheme}
         className="position-absolute top-0 end-0 m-4 btn rounded-circle shadow-sm z-3 d-flex align-items-center justify-content-center border"
         style={{ width: '45px', height: '45px', backgroundColor: bgCard, borderColor: borderCard, color: theme === 'dark' ? '#f1f5f9' : '#334155' }}
      >
          {theme === 'light' ? <i className="bi bi-moon-stars-fill"></i> : <i className="bi bi-sun-fill text-warning"></i>}
      </motion.button>

      <div className={`row h-100 ${reverse ? 'flex-row-reverse' : ''}`}>
        
        <div className="col-md-6 d-none d-md-flex flex-column justify-content-between p-5 position-relative overflow-hidden transition-colors"
             style={{ backgroundColor: bgMain }}>
           
           <motion.div 
              animate={{ scale: [1, 1.2, 1], x: reverse ? [0, -30, 0] : [0, 50, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="position-absolute rounded-circle"
              style={{ 
                width: '600px', height: '600px', 
                background: theme === 'dark' 
                    ? `radial-gradient(circle, ${blobColorDark} 0%, rgba(0,0,0,0) 70%)` 
                    : `radial-gradient(circle, ${blobColorLight} 0%, rgba(255,255,255,0) 70%)`,
                top: '-10%', 
                [reverse ? 'right' : 'left']: reverse ? '-15%' : '-10%', 
                filter: 'blur(60px)', zIndex: 0
              }}
           />

           <div className={`position-relative z-2 ${reverse ? 'text-end' : ''}`}>
               {reverse ? (
                 <div className="d-flex align-items-center justify-content-end gap-2 mb-4">
                    <span className={`fw-bold fs-4 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>{appName}</span>
                 </div>
               ) : (
                 <span className={`fw-bold fs-4 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>{appName}</span>
               )}
           </div>

           <div className={`position-relative z-2 my-auto ${reverse ? 'text-end' : ''}`}>
             <motion.h1 
                initial={{ opacity: 0, x: reverse ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}
                className={`display-5 fw-bold mb-3 lh-sm ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
                style={{ letterSpacing: '-0.03em' }}
             >
               {title}
             </motion.h1>
             <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}
                className={`lead fw-medium ${theme === 'dark' ? 'text-muted' : 'text-secondary'} ${reverse ? 'ms-auto' : ''}`}
                style={{ maxWidth: '450px' }}
             >
               {subtitle}
             </motion.p>
           </div>
           
           {!reverse && (
            <div className="position-relative z-2">
               <div className={`d-inline-flex align-items-center gap-3 px-3 py-2 rounded-pill border shadow-sm ${theme === 'dark' ? 'bg-dark border-secondary' : 'bg-white'}`}
                    style={{backgroundColor: bgCard, borderColor: borderCard}}>
                   <span className={`fw-bold x-small ${theme === 'dark' ? 'text-white' : 'text-dark'}`}></span>
               </div>
            </div>
           )}
           {reverse && <div className="position-relative z-2"></div>}
        </div>

        <div className="col-md-6 d-flex align-items-center justify-content-center position-relative transition-colors"
             style={{ backgroundColor: bgMain }}>
          
          <div className="position-absolute w-100 h-100" 
               style={{ 
                 backgroundImage: `radial-gradient(${theme === 'dark' ? '#334155' : '#cbd5e1'} 1px, transparent 1px)`, 
                 backgroundSize: '32px 32px', opacity: 0.8
               }}>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="w-100 p-5 rounded-5 position-relative z-1 border"
            style={{ 
                maxWidth: '460px', 
                backgroundColor: bgCard, 
                borderColor: borderCard,
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' 
            }}
          >
            {children}
          </motion.div>
          
          <div className="position-absolute bottom-0 w-100 text-center pb-4 text-muted x-small opacity-50">
             &copy; 2025 User Management System.
          </div>

        </div>
      </div>
    </div>
  );
}