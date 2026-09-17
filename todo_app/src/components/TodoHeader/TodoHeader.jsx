import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button/Button';

function TodoHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleAdminDashboard = () => {
    navigate('/admin');
  };

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          My Todos
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome, {user?.name}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {user?.role === 'admin' && (
          <Button
            variant="primary"
            onClick={handleAdminDashboard}
          >
            Admin Dashboard
          </Button>
        )}

        <Button
          variant="danger"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}

export default TodoHeader;