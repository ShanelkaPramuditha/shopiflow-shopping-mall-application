import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/ui/spinner';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;

// Prop types
PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};
