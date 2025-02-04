import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { toggleTheme } from '../store/slices/themeSlice';
import { logout } from '../store/slices/authSlice';

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useSelector(state => state.theme);
  const { isAuthenticated, isAdmin, user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
            Crisp Inn
            </Link>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => dispatch(toggleTheme())}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <SunIcon className="w-6 h-6" />
                ) : (
                  <MoonIcon className="w-6 h-6" />
                )}
              </button>

              <Link to="/cart" className="relative">
                <ShoppingCartIcon className="w-6 h-6" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span>Welcome, {user.name}</span>
                  {isAdmin && (
                    <Link to="/admin" className="btn btn-primary">
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="btn">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Outlet />
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700">
        <div className="container py-6">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © 2024 Crisp Inn. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout