import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { supabase } from '../../auth/supabaseClient';
import { countNewPortfolioInquiries } from '../../lib/inquiries';

export const OwnerInquiryIndicator: React.FC = () => {
  const { isOwner } = useAuth();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isOwner || !supabase) return;

    let mounted = true;
    const refresh = async () => {
      try {
        const next = await countNewPortfolioInquiries();
        if (mounted) setCount(next);
      } catch (error) {
        console.warn('[Inquiries] Could not refresh unread count:', error);
      }
    };

    refresh();

    const channel = supabase
      .channel('owner-inquiry-indicator')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'portfolio_inquiries' },
        (payload) => {
          setCount(value => value + 1);
          const row = payload.new as any;
          if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
            const notification = new Notification('New portfolio inquiry', {
              body: `${row?.name || 'A visitor'} · ${row?.inquiry_type || 'New inquiry'}`,
              tag: `portfolio-inquiry-${row?.id || Date.now()}`,
            });
            notification.onclick = () => {
              window.focus();
              window.location.assign('/inquiries');
              notification.close();
            };
          }
        },
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'portfolio_inquiries' },
        refresh,
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(channel);
    };
  }, [isOwner]);

  if (!isOwner) return null;

  return (
    <Link
      to="/inquiries"
      className="owner-inquiry-indicator"
      title={count ? `${count} unread portfolio ${count === 1 ? 'inquiry' : 'inquiries'}` : 'Portfolio inquiry inbox'}
      aria-label={count ? `Inquiry inbox, ${count} unread` : 'Inquiry inbox'}
    >
      <Bell className="w-3.5 h-3.5" />
      {count > 0 && <span>{count > 99 ? '99+' : count}</span>}
    </Link>
  );
};
