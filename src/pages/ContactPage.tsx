import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Send, Check, Copy } from 'lucide-react';
import { EditButton } from '../components/editor/EditButton';

export const ContactPage: React.FC = () => {
  const { siteConfig, contactData } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [inquiryType, setInquiryType] = useState('Strategic Advisory');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Spam protection
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bots
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Simulate submission handling
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactData.directEmail || siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3 pb-8 border-b border-neutral-800/40 relative">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 font-medium">
            Direct Communications & Inquiries
          </span>
          <EditButton type="contact" item={contactData} label="Edit Contact Info" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-100 dark:text-neutral-100 light:text-neutral-900 leading-tight">
          {contactData.inquiryTitle || 'Start a Conversation.'}
        </h1>
        <p className="text-base text-neutral-300 dark:text-neutral-300 light:text-neutral-700 leading-relaxed font-sans pt-1">
          {contactData.inquirySubtitle || 'Have an ambitious problem or high-leverage initiative? I am especially interested in conversations around marketing strategy, autonomous AI systems, unit economics modeling, and full-stack product builds.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left: Contact Info & Preferences */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Direct Email */}
          <div className="space-y-3 pt-2 border-t border-neutral-800/60 relative">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-400 block font-medium">
                Direct Email Coordinates
              </span>
              <EditButton type="contact" item={contactData} label="Edit" />
            </div>
            <div className="flex items-center justify-between gap-2">
              <a
                href={`mailto:${contactData.directEmail || siteConfig.email}`}
                className="text-base font-mono text-neutral-100 hover:text-amber-400 transition-colors break-all"
              >
                {contactData.directEmail || siteConfig.email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="p-1.5 rounded border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 transition-colors shrink-0"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans">
              {contactData.responseTime || 'Expect a substantive response within 24 business hours.'}
            </p>
          </div>

          {/* Availability & Location */}
          <div className="space-y-3 pt-4 border-t border-neutral-800/40 text-xs">
            <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-400 block font-medium">
              Location & Availability
            </span>
            <div className="space-y-2 font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{contactData.location || siteConfig.location} · {contactData.availabilityStatus || siteConfig.openStatus}</span>
              </div>
              <div className="text-neutral-400">
                <span>{contactData.timezone || 'IST (UTC +5:30)'} · Full Global Overlap</span>
              </div>
            </div>
            {contactData.advisoryRateInfo && (
              <p className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-800/40 font-mono">
                {contactData.advisoryRateInfo}
              </p>
            )}
          </div>

          {/* Conversation Topics */}
          {contactData.consultingTopics && contactData.consultingTopics.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-neutral-800/40 text-xs">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-400 block font-medium">
                Primary Engagement Areas
              </span>
              <ul className="space-y-2 text-neutral-300 font-sans">
                {contactData.consultingTopics.map((topic, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <span className="text-amber-400/80 font-mono text-xs">→</span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 sm:p-12 border border-neutral-800 bg-neutral-900/30 text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-100">
                Message Transmitted.
              </h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed font-sans">
                Thank you, {name}. Your inquiry has been received. I will review your context and respond back shortly to <span className="font-mono text-amber-400">{email}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 text-xs font-mono rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-neutral-100"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 pt-2 border-t lg:border-t-0 border-neutral-800/60">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-semibold">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3.5 py-2.5 rounded bg-neutral-950/80 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-400/90 text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="elena@company.com"
                    className="w-full px-3.5 py-2.5 rounded bg-neutral-950/80 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-400/90 text-sm transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-semibold">
                    Organization / Project
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    placeholder="e.g. Autonomous AI Lab"
                    className="w-full px-3.5 py-2.5 rounded bg-neutral-950/80 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-400/90 text-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-semibold">
                    Inquiry Intent
                  </label>
                  <select
                    value={inquiryType}
                    onChange={e => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded bg-neutral-950/80 border border-neutral-800 text-neutral-100 text-sm focus:outline-none focus:border-amber-400/90 transition-colors"
                  >
                    <option value="Strategic Advisory">Strategic Advisory / Consulting</option>
                    <option value="Full-Time Executive">Full-Time Strategic Leadership</option>
                    <option value="AI Systems Architecture">AI Systems / Tool Collaboration</option>
                    <option value="Speaking / Panel">Speaking / Research Review</option>
                    <option value="General Conversation">Exploratory / Intellectual Exchange</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 font-semibold">
                  Problem Context or Proposition *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Outline the core commercial bottleneck, project scope, or opportunity you want to discuss..."
                  className="w-full px-3.5 py-2.5 rounded bg-neutral-950/80 border border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-amber-400/90 text-sm transition-colors font-sans"
                />
              </div>

              {/* Honeypot field (hidden from humans) */}
              <input
                type="text"
                value={honeypot}
                onChange={e => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <button
                type="submit"
                className="w-full py-3 px-6 rounded bg-amber-400 text-neutral-950 font-mono text-xs font-semibold tracking-wide hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Inquiry Directly</span>
              </button>

            </form>
          )}
        </div>

      </div>

    </div>
  );
};
