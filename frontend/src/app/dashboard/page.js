'use client';
import useSWR from 'swr';
import api from '@/lib/axios';
import { motion } from 'framer-motion';

const fetcher = url => api.get(url).then(res => res.data.data);

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay) => ({
    opacity: 1, y: 0,
    transition: { delay: delay, duration: 0.5, ease: "easeOut" }
  })
};

const StatCard = ({ title, value, icon, color, delay }) => (
  <motion.div 
    variants={fadeInUp}
    initial="hidden"
    animate="visible"
    custom={delay}
    className="col-md-4 mb-4"
  >
    <div className="card h-100 p-4 border-0 shadow-sm position-relative overflow-hidden hover-scale-sm transition-all">
        <div className="d-flex justify-content-between align-items-center position-relative z-1">
            <div>
                <p className="text-secondary fw-bold x-small text-uppercase mb-1" style={{fontSize: '0.75rem', letterSpacing: '0.05em'}}>{title}</p>
                <h2 className="display-6 fw-bold text-dark mb-0 tracking-tight">{value}</h2>
            </div>
            <div className={`p-3 rounded-4 bg-${color} bg-opacity-10 text-${color}`}>
                <i className={`bi ${icon} fs-3`}></i>
            </div>
        </div>
    </div>
  </motion.div>
);

export default function DashboardHome() {
  const { data: employees } = useSWR('/employees', fetcher);
  const { data: users } = useSWR('/users', fetcher);

  const totalEmployees = employees ? employees.length : 0;
  const totalUsers = users ? users.length : 0;

  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
        className="mb-5"
      >
        <h1 className="fw-bold text-dark mb-1 display-6">Dashboard Overview</h1>
        <p className="text-secondary">Welcome back, here is what's happening today.</p>
      </motion.div>

      <div className="row">
        <StatCard title="Total Employees" value={totalEmployees} icon="bi-people-fill" color="primary" delay={0.1} />
        <StatCard title="System Admins" value={totalUsers} icon="bi-shield-lock-fill" color="success" delay={0.2} />
        <StatCard title="Departments" value="4" icon="bi-building" color="warning" delay={0.3} />
      </div>

      <div className="row mt-2">
          
          <motion.div 
             className="col-lg-8 mb-4"
             variants={fadeInUp} initial="hidden" animate="visible" custom={0.4} 
          >
              <div className="card h-100 border-0 shadow-sm p-0 overflow-hidden">
                  <div className="p-4 border-bottom d-flex justify-content-between align-items-center bg-white">
                      <h5 className="fw-bold mb-0 text-dark">Recent Employees</h5>
                      <a href="/dashboard/employees" className="btn btn-sm btn-light border text-primary fw-bold">View All</a>
                  </div>
                  <div className="table-responsive">
                      <table className="table align-middle mb-0 table-hover">
                          <thead className="bg-light">
                              <tr>
                                  <th className="border-0 px-4 py-3 small text-secondary text-uppercase fw-bold">Name</th>
                                  <th className="border-0 px-4 py-3 small text-secondary text-uppercase fw-bold">Position</th>
                                  <th className="border-0 px-4 py-3 small text-secondary text-uppercase fw-bold">Joined</th>
                                  <th className="border-0 px-4 py-3 small text-secondary text-uppercase fw-bold text-end">Status</th>
                              </tr>
                          </thead>
                          <tbody>
                              {employees && employees.slice(0, 5).map((emp, index) => (
                                  <motion.tr 
                                    key={emp.id}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + (index * 0.1) }}
                                  >
                                      <td className="fw-bold text-dark px-4 py-3">
                                          <div className="d-flex align-items-center gap-3">
                                              <img src={emp.photo ? `http://localhost:5000${emp.photo}` : `https://ui-avatars.com/api/?name=${emp.name}`} 
                                                   className="rounded-circle border" width="36" height="36" alt="" 
                                                   onError={(e) => {e.target.src=`https://ui-avatars.com/api/?name=${emp.name}`}} />
                                              {emp.name}
                                          </div>
                                      </td>
                                      <td className="text-secondary small px-4">{emp.position}</td>
                                      <td className="text-secondary small px-4">{new Date(emp.createdAt).toLocaleDateString()}</td>
                                      <td className="text-end px-4"><span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1">Active</span></td>
                                  </motion.tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </motion.div>

          <motion.div 
             className="col-lg-4 mb-4"
             variants={fadeInUp} initial="hidden" animate="visible" custom={0.5}
          >
              <div className="card h-100 border-0 shadow-sm p-4">
                  <h5 className="fw-bold mb-4 text-dark">Department Load</h5>
                  {['IT Dept', 'Marketing', 'Finance'].map((dept, idx) => (
                      <div className="mb-4" key={dept}>
                          <div className="d-flex justify-content-between mb-1">
                              <span className="small fw-bold text-secondary">{dept}</span>
                              <span className="small text-muted">{[45, 30, 25][idx]}%</span>
                          </div>
                          <div className="progress rounded-pill bg-light" style={{height: '8px'}}>
                              <motion.div 
                                className={`progress-bar rounded-pill ${['bg-primary', 'bg-info', 'bg-warning'][idx]}`} 
                                initial={{ width: 0 }} animate={{ width: `${[45, 30, 25][idx]}%` }} 
                                transition={{ duration: 1, delay: 0.8 }}
                              />
                          </div>
                      </div>
                  ))}
              </div>
          </motion.div>
       </div>
    </div>
  );
}