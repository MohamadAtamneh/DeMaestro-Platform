import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { apiClient } from '../api/client';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, loading: authLoading } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Requirements: If the user is not logged in via Firebase Auth, immediately redirect them to /login.
    if (!authLoading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, authLoading, navigate]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        // Requirements: GET request to {API_URL}/api/projects/
        const data = await apiClient.get('/projects/');
        
        // Handle both possible wrapper objects
        setProjects(data.projects || (Array.isArray(data) ? data : []));
      } catch (err) {
        setError(err.message || 'Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [currentUser]);

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="animate-pulse bg-white/60 rounded-2xl border border-slate-100 p-6 flex flex-col min-h-[220px]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-slate-200"></div>
            <div className="w-16 h-6 rounded-md bg-slate-200"></div>
          </div>
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
          <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6 mb-6"></div>
          <div className="h-10 bg-slate-200 rounded-xl w-full mt-auto"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto animation-fade-in px-4 md:px-0">
      <header className="mb-10 lg:mb-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-3">
          Dashboard
        </h1>
        <p className="text-slate-500 text-lg">
          Welcome back! Access and manage your generated projects.
        </p>
      </header>

      {loading ? (
        renderSkeletons()
      ) : error ? (
        <div className="bg-red-50/80 backdrop-blur-md border border-red-200 text-red-600 rounded-2xl p-6 text-center shadow-sm max-w-2xl mx-auto mt-10">
          <p className="font-bold text-lg mb-1">Could not load projects</p>
          <p className="text-red-500">{error}</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 p-12 lg:p-20 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col items-center max-w-3xl mx-auto mt-4">
          <div className="w-24 h-24 bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-slate-100/50">
            <svg className="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-4">No projects yet</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto text-lg leading-relaxed">
            You haven't generated any projects. Kick off your ideation process to see them appear here.
          </p>
          <button 
            onClick={() => navigate('/create')} 
            className="bg-slate-800 text-white rounded-xl px-8 py-4 font-semibold hover:bg-slate-900 shadow-xl shadow-slate-200 hover:shadow-slate-300 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create New Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id || project._id || project.uid || Math.random()} 
              className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white p-6 shadow-sm hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-400 group flex flex-col h-full min-h-[220px]"
            >
              <div className="flex justify-between items-start mb-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-700 font-black text-xl group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                  {(project.name || project.projectName || 'P').charAt(0).toUpperCase()}
                </div>
                <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${
                  (project.status || 'Ready').toLowerCase() === 'completed' || (project.status || 'Ready').toLowerCase() === 'ready'
                    ? 'bg-green-50 text-green-600 border-green-100' 
                    : (project.status || 'Ready').toLowerCase() === 'failed'
                    ? 'bg-red-50 text-red-600 border-red-100'
                    : 'bg-blue-50 text-blue-600 border-blue-100'
                }`}>
                  {project.status || 'Ready'}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-slate-600 transition-colors">
                {project.name || project.projectName || 'Untitled Project'}
              </h3>
              <p className="text-slate-500 text-sm line-clamp-2 flex-grow mb-6">
                {project.description || project.coreLogic || 'A user-generated feature on the DeMaestro platform.'}
              </p>
              <div className="pt-4 border-t border-slate-100/80 mt-auto">
                <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-2.5 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 group/btn">
                  <svg className="w-4 h-4 text-slate-400 group-hover/btn:text-slate-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
