import React, { useState } from 'react';
import {
  Search,
  ShieldCheck,
  FileCheck2,
  Activity,
  ChevronDown,
  ArrowRight,
  Check,
  Minus,
  Send,
} from 'lucide-react';
import { Business, INDUSTRY_CATEGORIES, IndustryCategory, PageRoute } from '../types/uba';
import { formatCurrency } from '../data/seedBusinesses';
import { BusinessCard } from '../components/BusinessCard';

interface HomePageProps {
  businesses: Business[];
  onNavigate: (page: PageRoute, businessId?: string) => void;
  onSearchRedirect: (keyword: string, category?: IndustryCategory) => void;
}

const FAQS = [
  {
    q: 'How do Idea, Money, and Idea+Money investment models differ?',
    a: 'Money partners contribute financial capital toward a verified funding goal for a fixed revenue-share or projected margin. Idea partners contribute operational expertise, supply-chain access, or technical leadership in exchange for performance-linked equity or profit share. Idea+Money combines capital with hands-on strategic execution.',
  },
  {
    q: 'How does UBA calculate its platform margin and audit fee?',
    a: 'UBA charges a transparent 2.5% platform governance and audit fee calculated on capital allocations. This covers pre-disbursement background checks, legal contract structuring, and quarterly financial ledger audits—ensuring investors and owners never face hidden brokerage charges.',
  },
  {
    q: 'How does UBA prevent fraud before funds are released?',
    a: 'Every listed venture completes three mandatory checkpoints controlled by UBA Organizers: identity and ownership background verification, trade license and legal compliance validation, and ongoing milestone-based fund monitoring.',
  },
  {
    q: 'Can business owners apply directly for funding on UBA?',
    a: 'Yes. Entrepreneurs in Restaurant, Construction, Organic Food, Export & Import, Agriculture, or Travel Agency sectors can submit a proposal via Pitch Business. New pitches enter with a Pending Audit status until cleared by an Organizer.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({
  businesses,
  onNavigate,
  onSearchRedirect,
}) => {
  const [heroSearch, setHeroSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactError, setContactError] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const verifiedCount = businesses.filter((b) => b.auditStatus === 'Verified').length;
  const totalCapitalRaised = businesses.reduce((acc, b) => acc + b.raisedAmount, 0);
  const activeAuditsCount = businesses.filter(
    (b) => b.ongoingAudit === 'Completed' || b.ongoingAudit === 'In Progress'
  ).length;

  const featuredBusinesses = [
    ...businesses.filter((b) => b.featured && b.auditStatus === 'Verified'),
    ...businesses.filter((b) => !b.featured && b.auditStatus === 'Verified'),
  ].slice(0, 3);

  const handleHeroSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchRedirect(heroSearch.trim());
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.includes('@') || contactMessage.trim().length < 8) {
      setContactError('Please enter your name, a valid email address, and a brief inquiry.');
      return;
    }
    setContactError('');
    setContactSent(true);
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[#0B253A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-22 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-balance leading-tight mb-4">
              A Business Investment &amp; Management Platform
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Discover &amp; fund verified businesses across six core industries. Prevent fraud with mandatory background audits and transparent milestone tracking.
            </p>

            {/* Central Search Bar */}
            <form
              onSubmit={handleHeroSearchSubmit}
              className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm"
            >
              <div className="relative flex-1">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Search by industry, business name, or model..."
                  className="w-full pl-10 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
                  aria-label="Search businesses by industry, name, or category"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-medium bg-[#10B981] hover:bg-[#059669] text-white rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Search Businesses
              </button>
            </form>

            {/* Quick Category Shortcut Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {INDUSTRY_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => onSearchRedirect('', category)}
                  className="px-3.5 py-1.5 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 text-slate-100 border border-white/15 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Trust Metrics Strip */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">Verified Businesses</p>
              <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#0B253A]">
                {verifiedCount} / {businesses.length}
              </p>
              <p className="text-xs text-slate-500">Passed background &amp; legal screening</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">Total Capital Raised</p>
              <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#0B253A]">
                {formatCurrency(totalCapitalRaised)}
              </p>
              <p className="text-xs text-slate-500">Tracked across active partner ventures</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">Active Audits</p>
              <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#0B253A]">
                {activeAuditsCount}
              </p>
              <p className="text-xs text-slate-500">Quarterly ledger &amp; compliance reviews</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-slate-500">Unverified Fraud Rate</p>
              <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-emerald-700">
                0.0%
              </p>
              <p className="text-xs text-slate-500">Escrow disbursement governance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Verified Business Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B253A] tracking-tight">
              Featured Verified Businesses
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 max-w-2xl">
              Explore vetted opportunities open for capital, operational expertise, or hybrid Idea+Money partnerships.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('businesses')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B253A] hover:text-emerald-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Explore All Businesses</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBusinesses.map((biz) => (
            <BusinessCard
              key={biz.id}
              business={biz}
              onViewDetails={(id) => onNavigate('details', id)}
            />
          ))}
        </div>
      </section>

      {/* How UBA Prevents Fraud & Comparison Section */}
      <section className="bg-white border-y border-slate-200 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B253A] tracking-tight">
              How UBA Prevents Fraud &amp; Protects Capital
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Every SME listed on United Business Alliance passes a documented three-tier governance pipeline managed by platform Organizers before receiving commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0B253A] text-white flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#0B253A]">
                01. Background Screening
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Founders undergo identity verification, credit history checks, and physical site inspections prior to listing approval.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0B253A] text-white flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#0B253A]">
                02. Legal &amp; License Compliance
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Trade licenses, tax registration, and standardized Idea or Money partnership agreements are verified by our compliance desk.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#10B981] text-white flex items-center justify-center">
                <Activity className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#0B253A]">
                03. Ongoing Financial Audits
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Capital is released against verified milestones with continuous quarterly audit tracking visible to every stakeholder.
              </p>
            </div>
          </div>

          {/* Side-by-Side Comparison Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-semibold text-[#0B253A]">
                  Why Businesses &amp; Investors Choose UBA
                </h3>
                <p className="text-xs text-slate-500">
                  Structured accountability compared against traditional commercial lending
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('compliance')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Inspect Sample Audit Certificate →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs text-slate-500 bg-white">
                    <th className="py-3.5 px-6 font-medium">Governance Feature</th>
                    <th className="py-3.5 px-6 font-semibold text-[#0B253A]">United Business Alliance (UBA)</th>
                    <th className="py-3.5 px-6 font-medium">Traditional Bank Loan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-3.5 px-6 font-medium text-slate-800">Partnership Flexibility</td>
                    <td className="py-3.5 px-6 text-emerald-700 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="w-4 h-4 shrink-0" /> Supports Idea, Money &amp; Idea+Money
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Minus className="w-4 h-4 shrink-0" /> Debt-only collateral financing
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-medium text-slate-800">Transparent Platform Margin</td>
                    <td className="py-3.5 px-6 text-emerald-700 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="w-4 h-4 shrink-0" /> Flat 2.5% monitoring &amp; audit fee
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Minus className="w-4 h-4 shrink-0" /> Compounding interest + processing fees
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-6 font-medium text-slate-800">Post-Investment Monitoring</td>
                    <td className="py-3.5 px-6 text-emerald-700 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="w-4 h-4 shrink-0" /> Real-time Organizer audit &amp; milestones
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Minus className="w-4 h-4 shrink-0" /> No operational partner visibility
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive FAQ + Contact Inquiry Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* FAQ Accordion */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl font-bold text-[#0B253A] tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Clear answers on UBA investment structures, margins, and owner verification.
            </p>

            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white overflow-hidden">
              {FAQS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={item.q}>
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span className="font-display text-sm sm:text-base font-semibold text-[#0B253A]">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-150 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact & Advisory Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-display text-xl font-bold text-[#0B253A] mb-1.5">
              Speak with UBA Compliance Desk
            </h3>
            <p className="text-sm text-slate-600 mb-5">
              Have questions about an upcoming business audit, institutional partnership, or owner onboarding?
            </p>

            {contactSent ? (
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-900 space-y-2">
                <p className="font-semibold">Inquiry received by UBA Desk</p>
                <p className="text-emerald-800">
                  An audit coordinator will respond to your email within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => setContactSent(false)}
                  className="text-xs font-semibold text-emerald-700 underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="home-contact-name" className="block text-xs font-medium text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="home-contact-name"
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g., Ayesha Siddiqua"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  />
                </div>
                <div>
                  <label htmlFor="home-contact-email" className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="home-contact-email"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  />
                </div>
                <div>
                  <label htmlFor="home-contact-msg" className="block text-xs font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="home-contact-msg"
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us about your investment or business inquiry..."
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  />
                </div>
                {contactError && (
                  <p className="text-xs text-rose-600 font-medium">{contactError}</p>
                )}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#0B253A] hover:bg-[#133552] text-white rounded-lg transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
