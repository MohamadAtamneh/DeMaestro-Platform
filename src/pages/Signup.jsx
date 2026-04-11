import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate signup
    setTimeout(() => navigate('/'), 600);
  };

  return (
    <div className="flex flex-col items-center justify-center animate-in slide-in-from-bottom-4 fade-in duration-500">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-demaestro-dark mb-2">Create an account</h2>
          <p className="text-slate-600">Join us to start building the future</p>
        </div>

        <div className="glass-panel rounded-2xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-demaestro-dark mb-2">
                  First name
                </label>
                <input
                  id="first-name"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-demaestro-dark mb-2">
                  Last name
                </label>
                <input
                  id="last-name"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Doe"
                />
              </div>
            </div>

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
              <label htmlFor="password" className="block text-sm font-medium text-demaestro-dark mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="input-field"
                placeholder="Create a strong password"
              />
            </div>

            <button type="submit" className="btn-primary w-full py-3">
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-demaestro-dark hover:text-demaestro-medium transition-colors">
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
