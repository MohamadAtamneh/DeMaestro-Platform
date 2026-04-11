import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    setTimeout(() => navigate('/'), 600);
  };

  return (
    <div className="flex flex-col items-center justify-center animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-demaestro-dark mb-2">Welcome back</h2>
          <p className="text-slate-600">Sign in to your account to continue</p>
        </div>

        <div className="glass-panel rounded-2xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-demaestro-dark mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                className="input-field"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-demaestro-dark">
                  Password
                </label>
                <a href="#" className="text-sm font-medium text-demaestro-medium hover:text-demaestro-dark transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                required
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn-primary w-full py-3">
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-demaestro-dark hover:text-demaestro-medium transition-colors">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
