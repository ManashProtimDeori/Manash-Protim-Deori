import { supabase } from '../auth/supabaseClient';

export type PortfolioInquiryStatus = 'new' | 'read' | 'archived';

export type PortfolioInquiry = {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  inquiry_type: string;
  message: string;
  status: PortfolioInquiryStatus;
  source_path: string;
  read_at: string | null;
  archived_at: string | null;
  created_at: string;
};

export type NewPortfolioInquiry = {
  name: string;
  email: string;
  organization?: string;
  inquiryType: string;
  message: string;
  sourcePath?: string;
};

export async function submitPortfolioInquiry(input: NewPortfolioInquiry) {
  if (!supabase) throw new Error('Inquiry service is not configured.');

  const payload = {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    organization: input.organization?.trim() || null,
    inquiry_type: input.inquiryType.trim(),
    message: input.message.trim(),
    source_path: input.sourcePath || '/contact',
    status: 'new' as const,
  };

  const { error } = await supabase.from('portfolio_inquiries').insert(payload);
  if (error) throw error;
}

export async function listPortfolioInquiries(): Promise<PortfolioInquiry[]> {
  if (!supabase) throw new Error('Inquiry service is not configured.');

  const { data, error } = await supabase
    .from('portfolio_inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []) as PortfolioInquiry[];
}

export async function countNewPortfolioInquiries(): Promise<number> {
  if (!supabase) return 0;

  const { count, error } = await supabase
    .from('portfolio_inquiries')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'new');

  if (error) throw error;
  return count || 0;
}

export async function setPortfolioInquiryStatus(id: string, status: PortfolioInquiryStatus) {
  if (!supabase) throw new Error('Inquiry service is not configured.');

  const patch = status === 'new'
    ? { status, read_at: null, archived_at: null }
    : status === 'read'
      ? { status, read_at: new Date().toISOString(), archived_at: null }
      : { status, read_at: new Date().toISOString(), archived_at: new Date().toISOString() };

  const { error } = await supabase.from('portfolio_inquiries').update(patch).eq('id', id);
  if (error) throw error;
}
