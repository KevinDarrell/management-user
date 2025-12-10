import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay) => ({
    opacity: 1, y: 0,
    transition: { delay: delay, duration: 0.5, ease: "easeOut" }
  })
};

export default function DepartmentChart({ employees, totalEmployees }) {
  const { theme } = useTheme();
  
  const cardClass = theme === 'dark' ? 'bg-surface border-secondary' : 'bg-white border-0 shadow-sm';
  const textMain = theme === 'dark' ? 'text-white' : 'text-dark';
  const textMuted = theme === 'dark' ? 'text-muted' : 'text-secondary';
  const depts = ['IT', 'Marketing', 'Finance', 'HR'];
  const colors = ['bg-primary', 'bg-info', 'bg-warning', 'bg-success'];

  return (
    <motion.div className="col-lg-4 mb-4" variants={fadeInUp} initial="hidden" animate="visible" custom={0.5}>
      <div className={`card h-100 border-0 p-4 transition-colors ${cardClass}`}>
          <h5 className={`fw-bold mb-4 ${textMain}`}>Department Load</h5>
          {depts.map((dept, idx) => {
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
                            className={`progress-bar rounded-pill ${colors[idx]}`} 
                            initial={{ width: 0 }} animate={{ width: `${percentage}%` }} 
                            transition={{ duration: 1, delay: 0.8 }}
                        />
                    </div>
                </div>
              );
          })}
      </div>
    </motion.div>
  );
}