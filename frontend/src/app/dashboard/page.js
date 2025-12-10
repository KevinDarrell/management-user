'use client';
import useSWR from 'swr';
import EmployeeService from '@/services/employee.service';
import UserService from '@/services/user.service';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import StatCard from '@/components/dashboard/StatCard';
import RecentEmployees from '@/components/dashboard/RecentEmployees';
import DepartmentChart from '@/components/dashboard/DepartmentChart';


const fetchDashboardData = async () => {
  const [employees, users] = await Promise.all([
    EmployeeService.getAll(),
    UserService.getAll()
  ]);
  return { employees, users };
};

export default function DashboardHome() {
  const { data, error } = useSWR('/dashboard', fetchDashboardData);
  const { theme } = useTheme();
  

  const employees = data?.employees;
  const users = data?.users;
  const totalEmployees = employees ? employees.length : 0;
  const activeEmployees = employees ? employees.filter(e => e.isActive).length : 0;
  const totalUsers = users ? users.length : 0;

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
          {/* Komponen Tabel Recent */}
          <RecentEmployees employees={employees} />

          <DepartmentChart employees={employees} totalEmployees={totalEmployees} />
       </div>
    </div>
  );
}