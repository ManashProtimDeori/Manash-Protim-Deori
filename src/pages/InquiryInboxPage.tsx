import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Archive, Bell, Check, Inbox, Mail, RefreshCw, RotateCcw } from 'lucide-react';
import { supabase } from '../auth/supabaseClient';
import {
  listPortfolioInquiries,
  PortfolioInquiry,
  PortfolioInquiryStatus,
  setPortfolioInquiryStatus,
} from '../lib/inquiries';
import '../components/inquiries/InquiryInbox.css';

type Filter = 'all' | PortfolioInquiryStatus;

export const InquiryInboxPage: React.FC = () => {
  const [items, setItems] = useState<PortfolioInquiry[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission | 'unsupported'>(
    typeof Notification === 'undefined' ? 'unsupported' : Notification.permission,
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setItems(await listPortfolioInquiries());
    } catch (err: any) {
      console.error('[Inquiries] Failed to load:', err);
      setError(
        err?.code === '42P01'
          ? 'Inquiry storage has not been initialized in Supabase yet.'
          : err?.message || 'Could not load inquiries.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (!supabase) return;
    const channel = supabase
      .channel('owner-inquiry-inbox')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'portfolio_inquiries' }, load)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [load]);

  const visible = useMemo(
    () => filter === 'all' ? items : items.filter(item => item.status === filter),
    [filter, items],
  );

  const counts = useMemo(() => ({
    all: items.length,
    new: items.filter(x => x.status === 'new').length,
    read: items.filter(x => x.status === 'read').length,
    archived: items.filter(x => x.status === 'archived').length,
  }), [items]);

  const updateStatus = async (id: string, status: PortfolioInquiryStatus) => {
    setBusyId(id);
    setError(null);
    try {
      await setPortfolioInquiryStatus(id, status);
      setItems(current => current.map(item => item.id === id ? {
        ...item,
        status,
        read_at: status === 'new' ? null : new Date().toISOString(),
        archived_at: status === 'archived' ? new Date().toISOString() : null,
      } : item));
    } catch (err: any) {
      setError(err?.message || 'Could not update inquiry.');
    } finally {
      setBusyId(null);
    }
  };

  const enableNotifications = async () => {
    if (typeof Notification === 'undefined') {
      setNotificationPermission('unsupported');
      return;
    }
    const result = await Notification.requestPermission();
    setNotificationPermission(result);
  };

  return (
    <div className="inquiry-inbox max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <div className="inquiry-inbox__header">
        <div>
          <span className="eyebrow">Owner Workspace / Private</span>
          <h1>Portfolio Inquiry Inbox</h1>
          <p>Every successful “Transmit Inquiry Directly” submission appears here. Public visitors cannot read this page or its underlying records.</p>
        </div>
        <div className="inquiry-inbox__actions">
          {notificationPermission !== 'granted' && notificationPermission !== 'unsupported' && (
            <button onClick={enableNotifications}><Bell className="w-4 h-4" /> Enable browser alerts</button>
          )}
          <button onClick={load}><RefreshCw className="w-4 h-4" /> Refresh</button>
        </div>
      </div>

      <div className="inquiry-inbox__filters" role="tablist" aria-label="Inquiry status">
        {(['all','new','read','archived'] as Filter[]).map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={filter === status ? 'is-active' : ''}
          >
            <span>{status === 'all' ? 'All' : status[0].toUpperCase() + status.slice(1)}</span>
            <b>{counts[status]}</b>
          </button>
        ))}
      </div>

      {error && <div className="inquiry-inbox__error">{error}</div>}

      {loading ? (
        <div className="inquiry-inbox__empty"><RefreshCw className="w-5 h-5 animate-spin" /> Loading inquiries…</div>
      ) : visible.length === 0 ? (
        <div className="inquiry-inbox__empty"><Inbox className="w-5 h-5" /> No {filter === 'all' ? '' : filter} inquiries yet.</div>
      ) : (
        <div className="inquiry-inbox__list">
          {visible.map(item => (
            <article key={item.id} className={`inquiry-card inquiry-card--${item.status}`}>
              <div className="inquiry-card__top">
                <div>
                  <div className="inquiry-card__identity">
                    <strong>{item.name}</strong>
                    <span>{item.inquiry_type}</span>
                  </div>
                  <div className="inquiry-card__meta">
                    <a href={`mailto:${item.email}`}><Mail className="w-3.5 h-3.5" />{item.email}</a>
                    {item.organization && <span>{item.organization}</span>}
                    <time>{new Date(item.created_at).toLocaleString()}</time>
                  </div>
                </div>
                <span className={`inquiry-status inquiry-status--${item.status}`}>{item.status}</span>
              </div>

              <p className="inquiry-card__message">{item.message}</p>

              <div className="inquiry-card__controls">
                {item.status === 'new' && (
                  <button disabled={busyId === item.id} onClick={() => updateStatus(item.id,'read')}>
                    <Check className="w-3.5 h-3.5" /> Mark read
                  </button>
                )}
                {item.status !== 'archived' && (
                  <button disabled={busyId === item.id} onClick={() => updateStatus(item.id,'archived')}>
                    <Archive className="w-3.5 h-3.5" /> Archive
                  </button>
                )}
                {item.status !== 'new' && (
                  <button disabled={busyId === item.id} onClick={() => updateStatus(item.id,'new')}>
                    <RotateCcw className="w-3.5 h-3.5" /> Mark unread
                  </button>
                )}
                <a href={`mailto:${item.email}?subject=${encodeURIComponent('Re: ' + item.inquiry_type)}`}>
                  Reply by email
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
