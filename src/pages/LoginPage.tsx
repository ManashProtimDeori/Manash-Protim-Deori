import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Lock, ArrowRight, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';
import { Monogram } from '../components/common/Monogram';

export const LoginPage: React.FC = () => {
  const { isOwner, isConfigured, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Return to previous target or /studio
  const from = (location.state as any)?.from?.pathname || '/studio';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please provide both email and password.');
      return;
    }

    setIsSubmitting(true);
    const result = await signIn(email.trim(), password);
    setIsSubmitting(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage(result.error || 'Authentication failed. Please verify your credentials.');
    }
  };

  if (isOwner) {
    return (
      <div className="py-20 md:py-32 max-w-md mx-auto px-4 sm:px-6">
        <div className="p-8 rounded border border-neutral-800/80 bg-neutral-950/70 space-y-6 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-neutral-100">
              Authenticated Owner Session Active
            </h1>
            <p className="text-xs text-neutral-400 mt-1 font-mono">
              You are authorized to enter Edit Mode and manage website content.
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => navigate('/studio')}
              className="w-full py-2.5 px-4 rounded bg-amber-400 text-neutral-950 font-mono text-xs font-semibold hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
            >
              <span>Open Content Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={async () => {
                await signOut();
                navigate('/');
              }}
              className="w-full py-2 px-4 rounded border border-neutral-800 text-neutral-400 hover:text-neutral-200 text-xs font-mono transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 md:py-32 max-w-md mx-auto px-4 sm:px-6">
      <div className="p-8 rounded border border-neutral-800/80 bg-neutral-950/70 space-y-6">
        
        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-neutral-800/60 text-center">
          <div className="inline-block mb-1">
            <Monogram size="sm" />
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-amber-400/90 font-medium uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" />
            <span>Owner Access</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-100">
            Sign In to Edit Mode
          </h1>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans max-w-xs mx-auto">
            Administrative authentication for portfolio content updates and system configuration.
          </p>
        </div>

        {/* Configuration Notice if Supabase environment variables are missing */}
        {!isConfigured && (
          <div className="p-4 rounded border border-amber-500/30 bg-amber-950/20 text-xs space-y-2 text-amber-200/90">
            <div className="flex items-center gap-1.5 font-semibold text-amber-300 font-mono text-[11px] uppercase tracking-wider">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Authentication Setup Notice</span>
            </div>
            <p className="leading-relaxed">
              Supabase authentication credentials (<code className="text-amber-300 font-mono">VITE_SUPABASE_URL</code> &amp; <code className="text-amber-300 font-mono">VITE_SUPABASE_ANON_KEY</code>) have not yet been provided in your environment.
            </p>
            <p className="leading-relaxed text-[11px] text-neutral-400">
              Per strict security protocol, all public editing controls are completely disabled and blocked until owner authentication is configured.
            </p>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="p-3 rounded border border-rose-800/50 bg-rose-950/30 text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="owner-email" 
              className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5 font-semibold"
            >
              Owner Email
            </label>
            <input
              id="owner-email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="manashdeori09@gmail.com"
              className="w-full px-3.5 py-2.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-sm transition-colors"
            />
          </div>

          <div>
            <label 
              htmlFor="owner-password" 
              className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1.5 font-semibold"
            >
              Password
            </label>
            <input
              id="owner-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-400 text-sm transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded bg-amber-400 text-neutral-950 font-mono text-xs font-semibold tracking-wide hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-neutral-800/40 text-center">
          <p className="text-[11px] font-mono text-neutral-500">
            Public visitors receive strictly read-only access.
          </p>
        </div>

      </div>
    </div>
  );
};
