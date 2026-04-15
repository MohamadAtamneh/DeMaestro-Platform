import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
      <div className="text-center space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 border border-demaestro-light text-sm text-demaestro-dark mb-4 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-demaestro-medium opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-demaestro-dark"></span>
          </span>
          Platform initialization complete
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-demaestro-dark pb-2">
          Build the Future of <br className="hidden md:block"/> 
          <span className="text-demaestro-medium drop-shadow-sm">Digital Experiences</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto pb-4">
          DeMaestro Platform is a foundation for your next big idea. We've set up everything you need to start building immediately with React, Tailwind CSS, and React Router.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/signup" className="btn-primary w-full sm:w-auto text-center text-lg">
            Get Started Now
          </Link>
          <a href="https://react.dev" target="_blank" rel="noreferrer" className="btn-secondary w-full sm:w-auto text-center text-lg">
            Read the Docs
          </a>
        </div>
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <FeatureCard 
          title="Blazing Fast Setup" 
          description="Powered by Vite, your development server starts instantly and hot module replacement is lightning fast."
          icon="⚡"
        />
        <FeatureCard 
          title="Premium Design System" 
          description="A complete warm aesthetic theme configured with elegant glassmorphism and custom DeMaestro colors."
          icon="✨"
        />
        <FeatureCard 
          title="Production Ready" 
          description="Configured with React Router and best practices out of the box so you can go to market faster."
          icon="🚀"
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="glass-panel p-6 rounded-2xl hover:bg-white/80 transition-colors duration-300 group cursor-default">
      <div className="w-12 h-12 bg-white/90 rounded-xl border border-demaestro-light flex items-center justify-center text-2xl mb-4 group-hover:scale-110 shadow-sm transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-demaestro-dark mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}
