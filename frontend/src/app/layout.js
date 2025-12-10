import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap-icons/font/bootstrap-icons.css"; 
import "./globals.css"; 
import { Toaster } from 'sonner'; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Enterprise Employee",
  description: "Modern Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}