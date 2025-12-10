'use client';
import { useState, useEffect, useRef, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'react-bootstrap'; 
import { useNotification } from '@/context/NotificationContext';
import { useTheme } from '@/context/ThemeContext'; 


const AnimatedMenu = forwardRef(({ children, style, className, 'aria-labelledby': labeledBy, show, close, align, ...props }, ref) => {
    return (
        <motion.div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
            {...props}
        >
            {children}
        </motion.div>
    );
});
AnimatedMenu.displayName = 'AnimatedMenu';

export default function Header({ toggleMobileMenu }) {
  const router = useRouter();
  const [showNotif, setShowNotif] = useState(false);
  const [user, setUser] = useState({ username: 'Admin', email: 'admin@company.com' });
  const notifRef = useRef(null);
  

  const { notifications, markAllRead } = useNotification();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));


    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="glass-header px-4 py-3 d-flex align-items-center justify-content-between sticky-top z-3 bg-white bg-opacity-80 backdrop-blur border-bottom transition-colors">
      
   
      <div className="d-flex align-items-center gap-3">
        <motion.button 
            whileTap={{ scale: 0.9 }} 
            className="btn btn-light border-0 bg-secondary bg-opacity-10 d-xl-none shadow-none d-flex align-items-center justify-content-center rounded-circle" 
            style={{width: '40px', height: '40px'}} 
            onClick={toggleMobileMenu}
        >
            <i className="bi bi-list fs-5 text-dark"></i>
        </motion.button>
        <div>
           <h6 className="mb-0 fw-bold text-dark d-none d-sm-block" style={{letterSpacing: '-0.01em'}}>Dashboard</h6>
           <small className="text-muted d-none d-sm-block" style={{fontSize: '0.75rem'}}>Welcome back, {user.username}</small>
        </div>
      </div>
      

      <div className="d-flex align-items-center gap-3" style={{ height: '42px' }}> 
         
     
         <motion.button
             whileTap={{ scale: 0.9 }}
             onClick={toggleTheme}
             className="btn border-0 rounded-circle d-flex align-items-center justify-content-center transition-colors header-icon-btn hover-bg-gray"
             style={{ width: '42px', height: '42px' }}
             title="Toggle Theme"
          >
             {theme === 'light' ? (
                 <i className="bi bi-moon-stars text-secondary fs-5"></i>
             ) : (
                 <i className="bi bi-sun-fill text-warning fs-5"></i>
             )}
          </motion.button>


         <div className="position-relative d-flex align-items-center" ref={notifRef}>
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`btn border-0 rounded-circle transition-colors header-icon-btn ${showNotif ? 'bg-primary text-white shadow-primary-sm' : 'bg-secondary bg-opacity-10 text-secondary hover-bg-gray'}`}
                style={{ width: '42px', height: '42px' }}
                onClick={() => setShowNotif(!showNotif)}
            >
                <i className={`bi ${showNotif ? 'bi-bell-fill' : 'bi-bell'} fs-5`}></i>
                {unreadCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-2 border-white rounded-circle">
                    <span className="visually-hidden">New alerts</span>
                  </span>
                )}
            </motion.button>

            <AnimatePresence>
                {showNotif && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="position-absolute end-0 mt-3 bg-white rounded-4 shadow-xl border overflow-hidden"
                        style={{ width: '320px', top: '100%', zIndex: 1050, transformOrigin: 'top right' }}
                    >
                         <div className="px-4 py-3 border-bottom d-flex justify-content-between align-items-center bg-light bg-opacity-50">
                            <div>
                                <h6 className="fw-bold mb-0 text-dark">Notifications</h6>
                                <p className="mb-0 text-muted x-small">You have {unreadCount} unread messages</p>
                            </div>
                            <button onClick={markAllRead} className="btn btn-sm btn-white border shadow-sm text-primary fw-bold x-small rounded-pill px-3">
                                Mark read
                            </button>
                        </div>
                        <div className="list-group list-group-flush" style={{maxHeight: '300px', overflowY: 'auto'}}>
                            {notifications.length > 0 ? notifications.map(notif => (
                                <div key={notif.id} className={`list-group-item list-group-item-action px-4 py-3 d-flex gap-3 align-items-start border-bottom-0 ${!notif.read ? 'bg-primary bg-opacity-05' : ''}`}>
                                    <div className={`rounded-circle p-2 bg-${notif.type} bg-opacity-10 text-${notif.type} d-flex align-items-center justify-content-center flex-shrink-0`} style={{width: '32px', height: '32px'}}>
                                        <i className={`bi ${notif.type === 'success' ? 'bi-check-circle-fill' : 'bi-info-circle-fill'}`}></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <span className={`small fw-bold ${!notif.read ? 'text-dark' : 'text-secondary'}`}>{notif.title}</span>
                                            <span className="x-small text-muted">{notif.time}</span>
                                        </div>
                                        <p className="mb-0 x-small text-secondary lh-sm">{notif.desc}</p>
                                    </div>
                                    {!notif.read && <div className="rounded-circle bg-primary mt-2" style={{width: '6px', height: '6px'}}></div>}
                                </div>
                            )) : (
                                <div className="p-4 text-center text-muted x-small">No notifications</div>
                            )}
                        </div>
                        <div className="p-2 text-center bg-light bg-opacity-50 border-top">
                            <button className="btn btn-link text-decoration-none x-small text-primary fw-bold">View History</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
         </div>


         <Dropdown align="end" className="d-flex align-items-center">
            <Dropdown.Toggle as="div" className="cursor-pointer no-caret user-select-none d-flex align-items-center justify-content-center" id="profile-dropdown">
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="header-icon-btn rounded-circle border bg-white shadow-sm hover-shadow-md transition-all position-relative"
                    style={{ width: '42px', height: '42px' }}
                >
                    <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold" 
                        style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', fontSize: '1.1rem' }}>
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle" style={{width: '12px', height: '12px'}}></span>
                </motion.div>
            </Dropdown.Toggle>


            <Dropdown.Menu 
                as={AnimatedMenu}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="shadow-xl border-0 rounded-4 mt-3 p-0 overflow-hidden" 
                style={{minWidth: '240px'}}
            >
                <div className="px-4 py-3 bg-light bg-opacity-50 border-bottom">
                    <p className="mb-0 fw-bold text-dark">{user.username}</p>
                    <p className="mb-0 x-small text-muted text-truncate">{user.email}</p>
                    <div className="mt-2">
                         <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-2">
                            <i className="bi bi-circle-fill me-1" style={{fontSize: '0.5rem'}}></i> Online
                        </span>
                    </div>
                </div>
                <div className="p-2">
                    <Dropdown.Item href="/dashboard/users" className="rounded-3 py-2 px-3 mb-1 d-flex align-items-center gap-3 hover-bg-light transition-colors">
                        <i className="bi bi-person-gear text-secondary"></i>
                        <span className="small fw-medium">My Profile</span>
                    </Dropdown.Item>
                    <Dropdown.Item href="#" className="rounded-3 py-2 px-3 mb-1 d-flex align-items-center gap-3 hover-bg-light transition-colors">
                        <i className="bi bi-gear text-secondary"></i>
                        <span className="small fw-medium">Settings</span>
                    </Dropdown.Item>
                    <Dropdown.Divider className="my-2 opacity-50" />
                    <Dropdown.Item onClick={handleLogout} className="rounded-3 py-2 px-3 d-flex align-items-center gap-3 text-danger hover-bg-danger-light transition-colors">
                        <i className="bi bi-box-arrow-right"></i>
                        <span className="small fw-bold">Sign Out</span>
                    </Dropdown.Item>
                </div>
            </Dropdown.Menu>
         </Dropdown>
      </div>
    </header>
  );
}