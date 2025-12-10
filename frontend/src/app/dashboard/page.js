'use client';
import useSWR from 'swr'; 
import EmployeeService from '@/services/employee.service';
import UserService from '@/services/user.service';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';


const fetchDashboardData = async () => {
  const [employees, users] = await Promise.all([
    EmployeeService.getAll(),
    UserService.getAll()
  ]);
  return { employees, users };
};


const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay) => ({
    opacity: 1, y: 0,
    transition: { delay: delay, duration: 0.5, ease: "easeOut" }
  })
};

const StatCard = ({ title, value, icon, color, delay }) => {
    const { theme } = useTheme();
   
    const cardClass = theme === 'dark' ? 'bg-surface border-secondary text-white' : 'bg-white border-0 shadow-sm';
    const textMuted = theme === 'dark' ? 'text-muted' : 'text-secondary';
    
    return (
      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        custom={delay}
        className="col-md-4 mb-4"
      >
        <div className={`card h-100 p-4 ${cardClass} position-relative overflow-hidden transition-colors`}>
            <div className="d-flex justify-content-between align-items-center position-relative z-1">
                <div>
                    <p className={`${textMuted} fw-bold x-small text-uppercase mb-1`} style={{fontSize: '0.75rem', letterSpacing: '0.05em'}}>{title}</p>
                    <h2 className="display-6 fw-bold mb-0 tracking-tight">{value}</h2>
                </div>
                <div className={`p-3 rounded-4 bg-${color} bg-opacity-10 text-${color}`}>
                    <i className={`bi ${icon} fs-3`}></i>
                </div>
            </div>
        </div>
      </motion.div>
    );
};

export default function DashboardHome() {
  const { data, error } = useSWR('/dashboard', fetchDashboardData);
  const { theme } = useTheme();
  
  const employees = data?.employees;
  const users = data?.users;

  const totalEmployees = employees ? employees.length : 0;
  const totalUsers = users ? users.length : 0;
  

  const activeEmployees = employees ? employees.filter(e => e.isActive).length : 0;

 
  const cardClass = theme === 'dark' ? 'bg-surface border-secondary' : 'bg-white border-0 shadow-sm';
  const tableHeadClass = theme === 'dark' ? 'bg-dark' : 'bg-light';
  const textMain = theme === 'dark' ? 'text-white' : 'text-dark';
  const textMuted = theme === 'dark' ? 'text-muted' : 'text-secondary';

  if (error) return <div className="p-5 text-center text-danger">Failed to load dashboard.</div>;

  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
        className="mb-5"
      >
        <h1 className={`fw-bold mb-1 display-6 ${textMain}`}>Dashboard Overview</h1>
        <p className={textMuted}>Welcome back, here is what's happening today.</p>
      </motion.div>

    
      <div className="row">
        <StatCard title="Total Employees" value={totalEmployees} icon="bi-people-fill" color="primary" delay={0.1} />
        <StatCard title="Active Personnel" value={activeEmployees} icon="bi-person-check-fill" color="success" delay={0.2} />
        <StatCard title="System Admins" value={totalUsers} icon="bi-shield-lock-fill" color="warning" delay={0.3} />
      </div>

      <div className="row mt-2">
          
        
          <motion.div 
             className="col-lg-8 mb-4"
             variants={fadeInUp} initial="hidden" animate="visible" custom={0.4}
          >
              <div className={`card h-100 p-0 overflow-hidden transition-colors ${cardClass}`}>
                  <div className={`p-4 border-bottom d-flex justify-content-between align-items-center ${theme === 'dark' ? 'border-secondary' : ''}`}>
                      <h5 className={`fw-bold mb-0 ${textMain}`}>Recent Employees</h5>
                      <a href="/dashboard/employees" className="btn btn-sm btn-white border text-primary fw-bold shadow-sm">View All</a>
                  </div>
                  <div className="table-responsive">
                      <table className="table align-middle mb-0 table-hover">
                          <thead className={tableHeadClass}>
                              <tr>
                                  <th className={`border-0 px-4 py-3 small text-uppercase fw-bold ${textMuted}`}>Name</th>
                                  <th className={`border-0 px-4 py-3 small text-uppercase fw-bold ${textMuted}`}>Position</th>
                                  <th className={`border-0 px-4 py-3 small text-uppercase fw-bold ${textMuted}`}>Department</th>
                                  <th className={`border-0 px-4 py-3 small text-uppercase fw-bold text-end ${textMuted}`}>Status</th>
                              </tr>
                          </thead>
                          <tbody>
                              {employees && employees.slice(0, 5).map((emp, index) => (
                                  <motion.tr 
                                    key={emp.id}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + (index * 0.1) }}
                                    className="transition-colors"
                                  >
                                      <td className="px-4 py-3">
                                          <div className="d-flex align-items-center gap-3">
                                              <div className={`p-1 rounded-circle border ${emp.isActive ? (theme === 'dark' ? 'border-light' : 'border-white') : 'border-secondary grayscale'}`}>
                                                <img src={emp.photo ? `http://localhost:5000${emp.photo}` : `https://ui-avatars.com/api/?name=${emp.name}`} 
                                                    className="rounded-circle" width="36" height="36" alt="" 
                                                    style={{ filter: emp.isActive ? 'none' : 'grayscale(100%)' }}
                                                    onError={(e) => {e.target.src=`https://ui-avatars.com/api/?name=${emp.name}`}} />
                                              </div>
                                              <span className={`fw-bold ${emp.isActive ? textMain : 'text-muted text-decoration-line-through'}`}>{emp.name}</span>
                                          </div>
                                      </td>
                                      <td className={`small px-4 ${textMuted}`}>{emp.position}</td>
                                      <td className="px-4"><span className={`badge border ${theme === 'dark' ? 'bg-dark border-secondary text-secondary' : 'bg-light text-dark'}`}>{emp.department}</span></td>
                                      
                                    
                                      <td className="text-end px-4">
                                          <span className={`badge rounded-pill border ${emp.isActive ? 'bg-success bg-opacity-10 text-success border-success' : 'bg-secondary bg-opacity-10 text-secondary border-secondary'}`}>
                                              {emp.isActive ? 'Active' : 'Inactive'}
                                          </span>
                                      </td>

                                  </motion.tr>
                              ))}
                              {(!employees || employees.length === 0) && (
                                <tr><td colSpan="4" className={`text-center py-4 ${textMuted}`}>No recent activity.</td></tr>
                              )}
                          </tbody>
                      </table>
                  </div>
              </div>
          </motion.div>

       
          <motion.div 
             className="col-lg-4 mb-4"
             variants={fadeInUp} initial="hidden" animate="visible" custom={0.5}
          >
              <div className={`card h-100 border-0 p-4 transition-colors ${cardClass}`}>
                  <h5 className={`fw-bold mb-4 ${textMain}`}>Department Load</h5>
                  {['IT', 'Marketing', 'Finance', 'HR'].map((dept, idx) => {
            
                      const deptCount = employees ? employees.filter(e => e.department === dept).length : 0;
                      const percentage = totalEmployees > 0 ? Math.round((deptCount / totalEmployees) * 100) : 0;
                      
                      return (
                        <div className="mb-4" key={dept}>
                            <div className="d-flex justify-content-between mb-1">
                                <span className={`small fw-bold ${textMuted}`}>{dept} Dept</span>
                                <span className={`small ${textMuted}`}>{percentage}%</span>
                            </div>
                            <div className={`progress rounded-pill ${theme === 'dark' ? 'bg-dark border border-secondary' : 'bg-light'}`} style={{height: '8px'}}>
                                <motion.div 
                                    className={`progress-bar rounded-pill ${['bg-primary', 'bg-info', 'bg-warning', 'bg-success'][idx]}`} 
                                    initial={{ width: 0 }} animate={{ width: `${percentage}%` }} 
                                    transition={{ duration: 1, delay: 0.8 }}
                                />
                            </div>
                        </div>
                      );
                  })}
              </div>
          </motion.div>
       </div>
    </div>
  );
}