import { Navigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY } from '../utils/constants/localStorage';
import { getDataObject } from '../utils/helper/localstoage';

function PublicRoute({ children }) {
  const user = getDataObject(LOCAL_STORAGE_KEY.user);
  
  if (user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default PublicRoute;
