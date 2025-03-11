import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react'; // Import the User icon from lucide-react

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <div className="container mx-auto">
        <nav className="flex flex-row justify-between items-center py-4 px-6">
          <div>
            <Link to="/" className="text-white font-bold text-2xl tracking-wide hover:text-gray-200 transition duration-300">
              Password Manager
            </Link>
          </div>
          <div>
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="text-white h-5 w-5" />
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-white border border-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-600 hover:text-white transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="text-white border border-yellow-600 px-4 py-2 rounded-lg hover:bg-yellow-600 hover:text-white transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;