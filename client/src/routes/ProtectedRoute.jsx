import { Navigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '../utils/constants/localStorage';
import { getDataObject } from '../utils/helper/localstoage';

function ProtectedRoute({ children }) {
  const user = getDataObject(LOCAL_STORAGE_KEY.user);
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
