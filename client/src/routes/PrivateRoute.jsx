import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth-store';
import { LoadingSpinner } from '@/components/ui/spinner';

const PrivateRoute = ({ element, roles }) => {
  const isAuthenticated = useAuthStore(
    (state) => state.isLoggedIn,
  );
  const role = useAuthStore((state) => state.role);

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return isAuthenticated && roles.includes(role) ? (
    element
  ) : !isAuthenticated && roles.length === 0 ? (
    element
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;

// Prop types
PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string),
};
