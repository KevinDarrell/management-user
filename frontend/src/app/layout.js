import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap-icons/font/bootstrap-icons.css"; 
import "./globals.css"; 
import { Toaster } from 'sonner';
import BootstrapClient from "@/components/BootstrapClient";
import { NotificationProvider } from '@/context/NotificationContext';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HR System",
  description: "Modern HR System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BootstrapClient /> 
        <ThemeProvider>
        <NotificationProvider>
        {children}
        </NotificationProvider>
        </ThemeProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}