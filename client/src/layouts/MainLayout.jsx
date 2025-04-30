import Navbar from '../components/Navbar/Navbar';
import '../layouts/MainLayout.css'; 

function MainLayout({ children }) {
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
