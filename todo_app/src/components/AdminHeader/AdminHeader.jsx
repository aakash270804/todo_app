import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../Button/Button';

function AdminHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleBackToTodos = () => {
    navigate('/todos');
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome, {user?.name}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          onClick={handleBackToTodos}
        >
          My Todos
        </Button>

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

export default AdminHeader;