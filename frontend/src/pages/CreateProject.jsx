import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../api/client';

// ─── Step configuration ────────────────────────────────────────────────────────
const STEPS = [
  {
    id: 'projectName',
    number: 0,
    icon: '✦',
    tag: 'Getting started',
    question: "What's your project called?",
    hint: 'Give your project a clear, memorable name.',
    placeholder: 'e.g. "HealthSync", "MarketFlow", "EduTrack"',
    type: 'input',
    color: '#346739',
  },
  {
    id: 'coreLogic',
    number: 1,
    icon: '⚡',
    tag: 'Question 1 / 7',
    question: 'What does your app do?',
    hint: 'Describe the core business problem it solves in 1–3 sentences.',
    placeholder: 'e.g. "It lets doctors schedule and manage patient appointments, send automated reminders, and track visit history in one place."',
    type: 'textarea',
    color: '#346739',
  },
  {
    id: 'userRoles',
    number: 2,
    icon: '👥',
    tag: 'Question 2 / 7',
    question: 'Who will log in and what can they see?',
    hint: 'List every type of user and what access they have.',
    placeholder: 'e.g. "Admin: full access. Doctor: own schedule. Patient: own records only."',
    type: 'textarea',
    color: '#4a7c52',
  },
  {
    id: 'dataEntities',
    number: 3,
    icon: '🗄️',
    tag: 'Question 3 / 7',
    question: 'What information will your app store?',
    hint: 'List the main data objects — think of these as your database tables.',
    placeholder: 'e.g. "Users, Appointments, Medical Records, Invoices, Notifications"',
    type: 'textarea',
    color: '#5a8f64',
  },
  {
    id: 'coreWorkflows',
    number: 4,
    icon: '🔄',
    tag: 'Question 4 / 7',
    question: 'Walk me through a typical task.',
    hint: 'Describe the most important user journey step by step.',
    placeholder: 'e.g. "1. Patient logs in → 2. Clicks "Book Appointment" → 3. Selects doctor & time → 4. Receives email confirmation."',
    type: 'textarea',
    color: '#6aa276',
  },
  {
    id: 'uiPreferences',
    number: 5,
    icon: '🎨',
    tag: 'Question 5 / 7',
    question: 'What should it look and feel like?',
    hint: 'Describe the visual style, mood, and any design references.',
    placeholder: 'e.g. "Clean and professional. Dark sidebar, white cards, blue accent color. Similar to Notion or Linear."',
    type: 'textarea',
    color: '#346739',
  },
  {
    id: 'externalApis',
    number: 6,
    icon: '🔗',
    tag: 'Question 6 / 7',
    question: 'Does it connect to other services?',
    hint: 'List any third-party APIs or integrations you need.',
    placeholder: 'e.g. "Stripe for payments, Twilio for SMS alerts, Google Calendar sync, OpenAI for summaries."',
    type: 'textarea',
    color: '#4a7c52',
  },
  {
    id: 'perfSecurity',
    number: 7,
    icon: '🔒',
    tag: 'Question 7 / 7',
    question: 'Any special security rules?',
    hint: 'Mention scale expectations, compliance needs, and security requirements.',
    placeholder: 'e.g. "HIPAA compliant storage, 2FA for admins, supports ~500 concurrent users."',
    type: 'textarea',
    color: '#346739',
  },
];

// ─── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  const pct = Math.round((current / (total - 1)) * 100);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200">
      <div
        className="h-full transition-all duration-700 ease-in-out"
        style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #346739, #79AE6F)' }}
      />
    </div>
  );
}

// ─── Step Dots ─────────────────────────────────────────────────────────────────
function StepDots({ current, total, onDotClick }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => i < current && onDotClick(i)}
          aria-label={`Step ${i + 1}`}
          style={{
            width: i === current ? '28px' : '8px',
            height: '8px',
            borderRadius: '4px',
            background: i <= current ? '#346739' : '#d1d5db',
            transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
            cursor: i < current ? 'pointer' : 'default',
          }}
        />
      ))}
    </div>
  );
}

// ─── Animated Step Card ────────────────────────────────────────────────────────
function StepCard({ step, value, onChange, direction }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, [step.id]);

  const inputClass =
    'w-full bg-white/80 border border-demaestro-light/70 rounded-2xl px-5 py-4 text-slate-700 text-base placeholder-slate-400/70 focus:outline-none focus:ring-2 focus:ring-demaestro-medium focus:border-transparent transition-all duration-300 resize-none leading-relaxed shadow-inner';

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${direction === 'forward' ? '32px' : '-32px'})`,
        transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
      }}
      className="w-full max-w-2xl mx-auto"
    >
      {/* Tag */}
      <div className="flex items-center gap-2 mb-6">
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ background: 'rgba(52,103,57,0.12)', color: '#346739' }}
        >
          {step.tag}
        </span>
      </div>

      {/* Icon + Heading */}
      <div className="mb-2 text-5xl select-none leading-none">{step.icon}</div>
      <h2 className="text-3xl sm:text-4xl font-bold text-demaestro-dark leading-tight mb-3">
        {step.question}
      </h2>
      <p className="text-slate-500 text-base mb-8 leading-relaxed">{step.hint}</p>

      {/* Input */}
      {step.type === 'input' ? (
        <input
          id={`field-${step.id}`}
          autoFocus
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={step.placeholder}
          className={inputClass}
        />
      ) : (
        <textarea
          id={`field-${step.id}`}
          autoFocus
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={step.placeholder}
          className={inputClass}
        />
      )}
    </div>
  );
}

// ─── Review Summary Card ───────────────────────────────────────────────────────
function ReviewCard({ formData, onEdit }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const fields = STEPS.slice(1); // skip project name step (shown in header)

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1)',
      }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-2 mb-6">
        <span
          className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
          style={{ background: 'rgba(52,103,57,0.12)', color: '#346739' }}
        >
          Final Review
        </span>
      </div>
      <div className="text-5xl select-none leading-none mb-2">🚀</div>
      <h2 className="text-3xl sm:text-4xl font-bold text-demaestro-dark leading-tight mb-3">
        Ready to generate <span className="italic">{formData.projectName || 'your project'}</span>?
      </h2>
      <p className="text-slate-500 text-base mb-8 leading-relaxed">
        Review your answers below. Click any answer to edit it before submitting.
      </p>

      <div className="space-y-3">
        {fields.map((step) => (
          <button
            key={step.id}
            type="button"
            onClick={() => onEdit(step.number)}
            className="w-full text-left glass-panel rounded-2xl px-5 py-4 group hover:border-demaestro-medium transition-all duration-200"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl mt-0.5 select-none">{step.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-demaestro-dark/60 uppercase tracking-wider mb-1">
                  {step.question}
                </p>
                <p className="text-slate-700 text-sm leading-relaxed truncate-multiline">
                  {formData[step.id] || (
                    <span className="text-red-400 italic">Not answered</span>
                  )}
                </p>
              </div>
              <span className="text-demaestro-medium opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium shrink-0 mt-0.5">
                Edit ✎
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function CreateProject() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState('forward');
  const [formData, setFormData] = useState({
    projectName: '',
    coreLogic: '',
    userRoles: '',
    dataEntities: '',
    coreWorkflows: '',
    uiPreferences: '',
    externalApis: '',
    perfSecurity: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const TOTAL_STEPS = STEPS.length; // 8 steps (0 = name, 1-7 = questions)
  const REVIEW_STEP = TOTAL_STEPS; // step index for review
  const isOnReview = currentStep === REVIEW_STEP;

  const currentStepConfig = STEPS[currentStep];
  const currentValue = currentStepConfig ? formData[currentStepConfig.id] : '';

  const goForward = () => {
    if (currentStep < REVIEW_STEP) {
      setDirection('forward');
      setCurrentStep((s) => s + 1);
      setError(null);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setDirection('backward');
      setCurrentStep((s) => s - 1);
      setError(null);
    }
  };

  const editStep = (stepIndex) => {
    setDirection('backward');
    setCurrentStep(stepIndex);
    setError(null);
  };

  const handleNext = () => {
    if (!isOnReview && currentStepConfig) {
      const val = formData[currentStepConfig.id]?.trim();
      if (!val) {
        setError('Please fill in this field before continuing.');
        return;
      }
    }
    goForward();
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' && e.ctrlKey) || (e.key === 'Enter' && currentStepConfig?.type === 'input')) {
      e.preventDefault();
      handleNext();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.post('/projects/', formData);
      setSuccessMsg('Your project is being generated!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.message || 'Failed to submit. Please try again.');
      setLoading(false);
    }
  };

  // Keyboard shortcut for next
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Enter' && e.ctrlKey && !loading) {
        if (isOnReview) handleSubmit();
        else handleNext();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentStep, formData, loading, isOnReview]);

  // ── Success overlay ──
  if (successMsg) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-demaestro-cream z-50">
        <div className="text-7xl animate-bounce">🎉</div>
        <h2 className="text-3xl font-bold text-demaestro-dark">{successMsg}</h2>
        <p className="text-slate-500">Redirecting to your dashboard…</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col" onKeyDown={handleKeyDown}>
      {/* Progress bar */}
      <ProgressBar current={currentStep} total={REVIEW_STEP} />

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #79AE6F, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #346739, transparent 70%)' }}
        />
      </div>

      {/* Main layout */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-20 relative">
        {/* Top nav row */}
        <div className="w-full max-w-2xl mx-auto mb-10 flex items-center justify-between">
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-demaestro-dark disabled:opacity-0 disabled:pointer-events-none transition-all duration-200"
            aria-label="Go back"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          <StepDots
            current={currentStep}
            total={REVIEW_STEP + 1}
            onDotClick={editStep}
          />

          <div className="text-xs font-semibold text-slate-400 tabular-nums">
            {isOnReview ? 'Review' : `${currentStep + 1} / ${TOTAL_STEPS}`}
          </div>
        </div>

        {/* Card area – keyed so it re-mounts on step change */}
        <div className="w-full max-w-2xl">
          {isOnReview ? (
            <ReviewCard
              key="review"
              formData={formData}
              onEdit={editStep}
            />
          ) : (
            <StepCard
              key={currentStep}
              step={currentStepConfig}
              direction={direction}
              value={currentValue}
              onChange={(val) =>
                setFormData((prev) => ({ ...prev, [currentStepConfig.id]: val }))
              }
            />
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="w-full max-w-2xl mx-auto mt-6 flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium animate-shake">
            <span className="text-base">⚠️</span> {error}
          </div>
        )}

        {/* Bottom action row */}
        <div className="w-full max-w-2xl mx-auto mt-8 flex items-center justify-between gap-4">
          {/* Skip (for optional steps 6 & 7) */}
          <div className="flex-1">
            {currentStepConfig && (currentStep === 6 || currentStep === 7) && (
              <button
                onClick={goForward}
                className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                Skip for now →
              </button>
            )}
          </div>

          {/* Primary CTA */}
          {isOnReview ? (
            <button
              id="submit-requirements-btn"
              onClick={handleSubmit}
              disabled={loading}
              className="relative group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white text-base shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #346739 0%, #79AE6F 100%)' }}
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Generating project…
                </>
              ) : (
                <>
                  Submit Requirements
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          ) : (
            <button
              id="next-step-btn"
              onClick={handleNext}
              className="relative group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white text-base shadow-lg transition-all duration-300 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #346739 0%, #79AE6F 100%)' }}
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              {currentStep === TOTAL_STEPS - 1 ? 'Review Answers' : 'Continue'}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3.75 9h10.5M9.75 4.5L14.25 9l-4.5 4.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>

        {/* Keyboard hint */}
        {!isOnReview && (
          <p className="mt-6 text-xs text-slate-400 text-center">
            Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200/70 font-mono text-slate-500">Ctrl ↵</kbd> to continue
          </p>
        )}
      </div>
    </div>
  );
}
