'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Sidebar({ isMobile, closeMobileMenu }) {
  const pathname = usePathname();
  const router = useRouter();


  const menuItems = [
    { label: 'User Management', icon: 'bi-people', href: '/dashboard/users' },
    { label: 'Employee Data', icon: 'bi-briefcase', href: '/dashboard/employees' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const isActive = (path) => pathname === path;

  return (
    <div className={`d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100 sidebar-gradient ${isMobile ? 'mobile-sidebar' : ''}`} 
         style={{ width: isMobile ? '100%' : '280px', transition: 'all 0.3s ease' }}>
      
      {/* 1. BRAND LOGO */}
      <div className="d-flex align-items-center mb-4 mb-md-0 me-md-auto text-white text-decoration-none p-2">
        <div className="bg-primary rounded-3 d-flex align-items-center justify-content-center me-3 shadow-lg" 
             style={{ width: '40px', height: '40px' }}>
           <i className="bi bi-building-fill fs-5"></i>
        </div>
        <div>
           <span className="fs-5 fw-bold d-block lh-1">Enterprise</span>
           <span className="small text-white-50" style={{ fontSize: '0.75rem'}}>Admin Console</span>
        </div>
        {isMobile && (
            <button className="btn btn-link text-white ms-auto" onClick={closeMobileMenu}>
                <i className="bi bi-x-lg"></i>
            </button>
        )}
      </div>

      <hr className="opacity-25 my-4" />

      <ul className="nav nav-pills flex-column mb-auto gap-2">
        {menuItems.map((item) => (
          <li key={item.href} className="nav-item">
            <Link 
              href={item.href} 
              className={`nav-link d-flex align-items-center gap-3 px-3 py-3 rounded-3 transition-all ${isActive(item.href) ? 'active-menu shadow-sm' : 'text-white-50 hover-light'}`}
              onClick={isMobile ? closeMobileMenu : undefined}
            >
              <i className={`bi ${item.icon} fs-5`}></i>
              <span className="fw-medium">{item.label}</span>
              {isActive(item.href) && <i className="bi bi-chevron-right ms-auto small opacity-75"></i>}
            </Link>
          </li>
        ))}
      </ul>

      <hr className="opacity-25 my-4" />

     
      <div className="dropdown mt-auto p-2 rounded-3 bg-white bg-opacity-10">
        <div className="d-flex align-items-center gap-2">
            <div className="rounded-circle bg-success d-flex align-items-center justify-content-center text-white fw-bold" 
                 style={{ width: '38px', height: '38px' }}>
                A
            </div>
            <div className="overflow-hidden">
                <p className="mb-0 small fw-bold text-white text-truncate">Administrator</p>
                <button onClick={handleLogout} className="btn btn-link p-0 text-danger text-decoration-none small" style={{ fontSize: '0.8rem'}}>
                    Sign out
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}