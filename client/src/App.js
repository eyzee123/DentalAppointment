import './App.css';
import './assets/styles/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Booking from './pages/Booking/Booking';
import Dashboard from './pages/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import store from './redux/store/store'
import { Provider } from 'react-redux';
import PublicRoute from './routes/PublicRoute';
import ProtectedRoute from './routes/ProtectedRoute';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import SignUp from './pages/Signup/Signup';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Public Auth Pages */}
          <Route path="/login" element={
              <PublicRoute>
                <AuthLayout><Login /></AuthLayout>
              </PublicRoute>
            } />
            <Route path="/signup" element={
              <PublicRoute>
                <AuthLayout><SignUp /></AuthLayout>
              </PublicRoute>
            } />

             {/* Protected Main App Pages */}
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout><Home /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/booking" element={
            <ProtectedRoute>
              <MainLayout><Booking /></MainLayout>
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <MainLayout><Dashboard /></MainLayout>
            </ProtectedRoute>
          } />
           <Route path="/profile" element={
            <ProtectedRoute>
              <MainLayout><Profile /></MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
    </Router>
  </Provider>
  );
}

export default App;
