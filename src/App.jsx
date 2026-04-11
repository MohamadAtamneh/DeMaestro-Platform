import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

const Navbar = () => {
  const location = useLocation();
  const navLink = (path, name) => {
    const isActive = location.pathname === path;
    return (
      <Link
        to={path}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
          isActive
            ? 'text-demaestro-dark bg-white/80 border border-demaestro-light shadow-sm'
            : 'text-slate-500 hover:text-demaestro-dark hover:bg-white/50'
        }`}
      >
        {name}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-demaestro-light/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-demaestro-dark flex items-center justify-center shadow-md shadow-demaestro-dark/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <Link to="/" className="text-2xl font-bold text-demaestro-dark">DeMaestro</Link>
          </div>
          <div className="hidden md:flex space-x-2">
            {navLink('/', 'Home')}
          </div>
          <div className="flex items-center space-x-3">
             <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-demaestro-dark transition-colors px-4 py-2">
                Log in
             </Link>
             <Link to="/signup" className="btn-primary text-sm py-2 px-4">
                Sign up
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <BrowserRouter>
      {/* Replaced dark bg-radial gradient with bg-demaestro-cream as the primary background */}
      <div className="min-h-screen bg-demaestro-cream text-slate-800 relative overflow-hidden">
        
        {/* Soft light decorative element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] pointer-events-none">
           <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent blur-3xl mix-blend-soft-light" />
        </div>
        
        <Navbar />
        {/* Main content with padding to account for fixed navbar */}
        <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 flex flex-col min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
