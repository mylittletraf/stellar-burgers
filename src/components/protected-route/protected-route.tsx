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

  const from = (location.state as any)?.from || '/';

  if (isAuthenticated && unAuthRequired) {
    return <Navigate to={from} replace />;
  }

  if (!isAuthenticated && !unAuthRequired) {
    return <Navigate to='/login' replace state={{ from: location.pathname }} />;
  }

  return children;
};
