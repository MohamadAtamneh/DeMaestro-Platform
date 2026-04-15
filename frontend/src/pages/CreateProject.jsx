import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';

export default function CreateProject() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    projectName: '',
    coreLogic: '',
    userRoles: '',
    dataEntities: '',
    coreWorkflows: '',
    uiPreferences: '',
    externalApis: '',
    perfSecurity: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await apiClient.post('/projects/', formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || "Failed to generate your app data. Please try again.");
      setLoading(false);
    }
  };

  const inputStyle = "w-full bg-white/70 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-demaestro-light focus:border-transparent transition-all";
  const labelStyle = "block text-sm font-semibold text-demaestro-dark mb-2";

  return (
    <div className="max-w-4xl mx-auto animation-fade-in pb-20">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-demaestro-dark mb-3">Project Requirements</h1>
        <p className="text-slate-500 text-lg">Define exactly what we're going to build by answering these 7 core questions.</p>
      </header>

      {error && <div className="mb-6 p-4 bg-red-100 border border-red-200 text-red-700 rounded-xl">{error}</div>}

      <div className="glass-panel rounded-3xl p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          <div>
            <label className={labelStyle}>Project Name</label>
            <input name="projectName" required value={formData.projectName} onChange={handleChange} className={inputStyle} placeholder="My Awesome Software" />
          </div>

          <div>
             <label className={labelStyle}>Box 1: Core Business Logic</label>
             <p className="text-sm text-slate-500 mb-3">If you had to explain your app to a friend in just two sentences, what would you say it does?</p>
             <textarea rows="3" required name="coreLogic" value={formData.coreLogic} onChange={handleChange} className={inputStyle} placeholder="It allows users to..." />
          </div>

          <div>
             <label className={labelStyle}>Box 2: User Roles</label>
             <p className="text-sm text-slate-500 mb-3">Who will be logging into this app? What should each group be allowed to see or change?</p>
             <textarea rows="3" required name="userRoles" value={formData.userRoles} onChange={handleChange} className={inputStyle} placeholder="Admins can edit..., Users can view..." />
          </div>

          <div>
             <label className={labelStyle}>Box 3: Data Entities</label>
             <p className="text-sm text-slate-500 mb-3">What specific types of information will your app store?</p>
             <textarea rows="3" required name="dataEntities" value={formData.dataEntities} onChange={handleChange} className={inputStyle} placeholder="Profiles, Payments, Appointments..." />
          </div>

          <div>
             <label className={labelStyle}>Box 4: Core Workflows</label>
             <p className="text-sm text-slate-500 mb-3">Walk me through a typical task in your app step-by-step.</p>
             <textarea rows="3" required name="coreWorkflows" value={formData.coreWorkflows} onChange={handleChange} className={inputStyle} placeholder="1. User opens page, 2. Clicks button..." />
          </div>

          <div>
             <label className={labelStyle}>Box 5: User Interface</label>
             <p className="text-sm text-slate-500 mb-3">What should your app look and feel like?</p>
             <textarea rows="3" required name="uiPreferences" value={formData.uiPreferences} onChange={handleChange} className={inputStyle} placeholder="Modern, Dark mode, Blue highlights..." />
          </div>

          <div>
             <label className={labelStyle}>Box 6: External APIs</label>
             <p className="text-sm text-slate-500 mb-3">Does your app need to connect with other services?</p>
             <textarea rows="3" required name="externalApis" value={formData.externalApis} onChange={handleChange} className={inputStyle} placeholder="Stripe for payments, Google Maps..." />
          </div>

          <div>
             <label className={labelStyle}>Box 7: Performance & Security</label>
             <p className="text-sm text-slate-500 mb-3">How many people do you expect to use this app at the same time? Are there any special rules for security?</p>
             <textarea rows="3" required name="perfSecurity" value={formData.perfSecurity} onChange={handleChange} className={inputStyle} placeholder="100 users, needs 2FA..." />
          </div>

          <div className="pt-6 border-t border-slate-200">
            <button type="submit" disabled={loading} className="btn-primary w-full md:w-auto px-10 py-4 text-lg disabled:opacity-70 disabled:cursor-not-allowed mx-auto block transition-all shadow-lg hover:shadow-xl">
               {loading ? 'Generating App & Saving...' : 'Generate App'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
