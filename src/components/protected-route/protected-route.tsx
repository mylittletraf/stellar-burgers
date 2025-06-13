import { ReactElement } from 'react';
import { useSelector } from '../../services/store';
import { getUserState } from '../../slices/userSlice/userSlice';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactElement;
  unAuthRequired?: boolean;
};

export const ProtectedRoute = ({
  children,
  unAuthRequired = false
}: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector(getUserState);

  if (isAuthenticated && unAuthRequired) {
    return <Navigate to='/' replace />;
  }

  if (!isAuthenticated && !unAuthRequired) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
