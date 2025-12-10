import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay) => ({
    opacity: 1, y: 0,
    transition: { delay: delay, duration: 0.5, ease: "easeOut" }
  })
};

export default function StatCard({ title, value, icon, color, delay }) {
    const { theme } = useTheme();
    const cardClass = theme === 'dark' ? 'bg-surface border-secondary text-white' : 'bg-white border-0 shadow-sm';
    const textMuted = theme === 'dark' ? 'text-muted' : 'text-secondary';
    
    return (
      <motion.div variants={fadeInUp} initial="hidden" animate="visible" custom={delay} className="col-md-4 mb-4">
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
}