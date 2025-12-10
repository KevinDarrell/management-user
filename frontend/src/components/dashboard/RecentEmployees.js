import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay) => ({
    opacity: 1, y: 0,
    transition: { delay: delay, duration: 0.5, ease: "easeOut" }
  })
};

export default function RecentEmployees({ employees }) {
  const { theme } = useTheme();
  
  const cardClass = theme === 'dark' ? 'bg-surface border-secondary' : 'bg-white border-0 shadow-sm';
  const textMain = theme === 'dark' ? 'text-white' : 'text-dark';
  const textMuted = theme === 'dark' ? 'text-muted' : 'text-secondary';
  const tableHeadClass = theme === 'dark' ? 'bg-dark' : 'bg-light';

  return (
    <motion.div className="col-lg-8 mb-4" variants={fadeInUp} initial="hidden" animate="visible" custom={0.4}>
      <div className={`card h-100 p-0 overflow-hidden transition-colors ${cardClass}`}>
          <div className={`p-4 border-bottom d-flex justify-content-between align-items-center ${theme === 'dark' ? 'border-secondary' : ''}`}>
              <h5 className={`fw-bold mb-0 ${textMain}`}>Recent Employees</h5>
              <Link href="/dashboard/employees" className="btn btn-sm btn-white border text-primary fw-bold shadow-sm">View All</Link>
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
  );
}