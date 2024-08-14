import { Outlet } from 'react-router-dom';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
