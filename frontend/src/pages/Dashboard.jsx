import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { apiClient } from '../api/client';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get('/projects/');
        setProjects(data.projects || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentUser]);

  return (
    <div className="w-full max-w-7xl mx-auto animation-fade-in">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-demaestro-dark mb-2">My Projects</h1>
        <p className="text-slate-500 text-lg">
          Welcome back! Here are all your ongoing DeMaestro sessions.
        </p>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-demaestro-dark"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 text-center">
          {error}
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-demaestro-light/20 text-demaestro-dark rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No projects yet</h3>
          <p className="text-slate-500 mb-6">Create your first project to get started.</p>
          <button onClick={() => navigate('/create-project')} className="btn-primary">Create Project</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white/80 backdrop-blur-md rounded-2xl border border-white p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-demaestro-light to-demaestro-dark flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                  {(project.projectName || 'P').charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-500 rounded-md">
                  {project.status || 'Active'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-demaestro-dark transition-colors">
                {project.projectName || 'Untitled Project'}
              </h3>
              <p className="text-slate-500 text-sm line-clamp-2">
                {project.coreLogic || 'A musical session on the DeMaestro platform.'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
