'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar({ isMobile, closeMobileMenu }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: 'Overview', icon: 'bi-grid-fill', href: '/dashboard' },
    { label: 'Employees', icon: 'bi-people-fill', href: '/dashboard/employees' },
    { label: 'Administrators', icon: 'bi-shield-lock', href: '/dashboard/users' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="d-flex flex-column h-100 p-3 sidebar-modern transition-colors">
    
      <div className="d-flex align-items-center mb-5 px-2 mt-2">
        <div className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center me-3 shadow-sm" style={{ width: '36px', height: '36px' }}>
           <i className="bi bi-exclude fs-5"></i>
        </div>
        <span className="fw-bold fs-5 text-dark tracking-tight">Management User</span>
      </div>

      <ul className="nav nav-pills flex-column mb-auto gap-1">
        <small className="text-secondary fw-bold px-3 mb-2" style={{fontSize: '0.7rem'}}>MAIN MENU</small>
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link 
              href={item.href} 
              onClick={isMobile ? closeMobileMenu : undefined}
              className={`nav-link d-flex align-items-center gap-3 px-3 py-2 sidebar-link ${isActive(item.href) ? 'active shadow-sm bg-primary text-white' : ''}`}
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>


      <div className="mt-auto border-top pt-3">
          <button onClick={handleLogout} className="btn btn-light w-100 d-flex align-items-center justify-content-center text-danger">
             <i className="bi bi-box-arrow-right me-2"></i> Sign Out
          </button>
      </div>
    </div>
  );
}