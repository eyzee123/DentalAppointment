import { Link, useLocation } from 'react-router-dom';
import './../Navbar/Navbar.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slice/authSlice';
import { FaUserEdit } from 'react-icons/fa';
import { LOCAL_STORAGE_KEY } from '../../utils/constants/localStorage';
import UserAvatar from '../../assets/images/user_avatar.png';
import { getDataObject } from '../../utils/helper/localstoage';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    
    const user = getDataObject(LOCAL_STORAGE_KEY.user);
    
    const handleLogout = () => {
      dispatch(logout());
      localStorage.removeItem(LOCAL_STORAGE_KEY.user);
      navigate('/login');
    };
    return (
      <div className="sidebar">
        <div className="profile">
          <img src={UserAvatar}  className="profile-img" />
          <h3>{user.name}</h3>
          <p>Patient</p>
          <Link to="/profile" className="manage-profile-btn">
            <FaUserEdit style={{ marginRight: '8px' }} />
            Manage Profile
          </Link>
        </div>
  
        <nav className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/booking" className={location.pathname === '/booking' ? 'active' : ''}>Booking</Link>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      </div>
    );
}

export default Navbar;