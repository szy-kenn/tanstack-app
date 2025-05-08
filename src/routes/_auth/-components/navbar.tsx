import { Link, useLocation } from '@tanstack/react-router';

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="bg-black text-white p-4 px-6 flex gap-8 border-b border-white/25">
      <p className="font-semibold text-pink">Zhopee</p>
      <Link to={location.pathname === '/login' ? '/signup' : '/login'}>
        {location.pathname === '/login' ? 'Sign Up' : 'Login'}
      </Link>
    </nav>
  );
};

export default Navbar;
