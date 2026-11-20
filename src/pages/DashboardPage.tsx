import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  Users,
  ShieldCheck,
  Pencil,
  Trash2,
  RotateCcw,
  Check,
  X,
  ExternalLink,
} from 'lucide-react';
import {
  AuditStatus,
  Business,
  CheckStatus,
  INDUSTRY_CATEGORIES,
  INVESTMENT_MODELS,
  IndustryCategory,
  InvestmentModel,
  InvestorApplication,
  PageRoute,
} from '../types/uba';
import { formatCurrency } from '../data/seedBusinesses';

interface DashboardPageProps {
  businesses: Business[];
  applications: InvestorApplication[];
  onSaveBusiness: (biz: Omit<Business, 'id' | 'certificateId' | 'createdAt'> & { id?: string }) => void;
  onDeleteBusiness: (id: string) => void;
  onUpdateAudit: (
    id: string,
    updates: Partial<Pick<Business, 'auditStatus' | 'backgroundCheck' | 'legalCompliance' | 'ongoingAudit'>>
  ) => void;
  onUpdateApplicationStatus: (
    appId: string,
    status: InvestorApplication['status']
  ) => void;
  onResetDemo: () => void;
  onNavigate: (page: PageRoute, businessId?: string) => void;
}

type DashboardSection = 'overview' | 'form' | 'inquiries' | 'audits';

export const DashboardPage: React.FC<DashboardPageProps> = ({
  businesses,
  applications,
  onSaveBusiness,
  onDeleteBusiness,
  onUpdateAudit,
  onUpdateApplicationStatus,
  onResetDemo,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<DashboardSection>('overview');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  // Add/Edit form states
  const [name, setName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState<IndustryCategory>('Agriculture');
  const [investmentModel, setInvestmentModel] = useState<InvestmentModel>('Money');
  const [fundingGoal, setFundingGoal] = useState('100000');
  const [raisedAmount, setRaisedAmount] = useState('0');
  const [expectedMarginPercent, setExpectedMarginPercent] = useState('16');
  const [ubaPlatformFeePercent, setUbaPlatformFeePercent] = useState('2.5');
  const [establishedYear, setEstablishedYear] = useState('2023');
  const [shortTagline, setShortTagline] = useState('');
  const [description, setDescription] = useState('');
  const [monitoringTerms, setMonitoringTerms] = useState(
    'Quarterly financial ledger review and milestone escrow disbursement.'
  );
  const [featured, setFeatured] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSavedBanner, setFormSavedBanner] = useState('');

  const totalCapitalCommitted = businesses.reduce((sum, b) => sum + b.raisedAmount, 0);
  const auditsPendingCount = businesses.filter((b) => b.auditStatus !== 'Verified').length;

  const openCreateForm = () => {
    setEditingId(null);
    setName('');
    setOwnerName('');
    setOwnerEmail('');
    setLocation('');
    setIndustry('Agriculture');
    setInvestmentModel('Money');
    setFundingGoal('100000');
    setRaisedAmount('0');
    setExpectedMarginPercent('16');
    setUbaPlatformFeePercent('2.5');
    setEstablishedYear('2024');
    setShortTagline('');
    setDescription('');
    setMonitoringTerms('Quarterly financial ledger review and milestone escrow disbursement.');
    setFeatured(false);
    setFormError('');
    setFormSavedBanner('');
    setActiveTab('form');
  };

  const openEditForm = (biz: Business) => {
    setEditingId(biz.id);
    setName(biz.name);
    setOwnerName(biz.ownerName);
    setOwnerEmail(biz.ownerEmail);
    setLocation(biz.location);
    setIndustry(biz.industry);
    setInvestmentModel(biz.investmentModel);
    setFundingGoal(String(biz.fundingGoal));
    setRaisedAmount(String(biz.raisedAmount));
    setExpectedMarginPercent(String(biz.expectedMarginPercent));
    setUbaPlatformFeePercent(String(biz.ubaPlatformFeePercent));
    setEstablishedYear(String(biz.establishedYear));
    setShortTagline(biz.shortTagline);
    setDescription(biz.description);
    setMonitoringTerms(biz.monitoringTerms);
    setFeatured(biz.featured);
    setFormError('');
    setFormSavedBanner('');
    setActiveTab('form');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goalNum = Number(fundingGoal);
    const raisedNum = Number(raisedAmount) || 0;
    const marginNum = Number(expectedMarginPercent);
    const feeNum = Number(ubaPlatformFeePercent);

    if (name.trim().length < 3 || ownerName.trim().length < 2) {
      setFormError('Business name and principal owner name are required.');
      return;
    }
    if (!goalNum || goalNum < 1000) {
      setFormError('Funding goal must be at least $1,000.');
      return;
    }
    if (raisedNum < 0 || raisedNum > goalNum) {
      setFormError('Raised amount must be between $0 and the funding goal.');
      return;
    }
    if (shortTagline.trim().length < 8 || description.trim().length < 15) {
      setFormError('Please provide both a short tagline and project overview.');
      return;
    }

    const existing = editingId ? businesses.find((b) => b.id === editingId) : undefined;

    onSaveBusiness({
      id: editingId ?? undefined,
      name: name.trim(),
      ownerName: ownerName.trim(),
      ownerEmail: ownerEmail.trim() || 'owner@uba-partner.example',
      location: location.trim() || 'Dhaka Hub',
      industry,
      investmentModel,
      fundingGoal: goalNum,
      raisedAmount: raisedNum,
      expectedMarginPercent: marginNum || 15,
      ubaPlatformFeePercent: feeNum || 2.5,
      establishedYear: Number(establishedYear) || 2024,
      shortTagline: shortTagline.trim(),
      description: description.trim(),
      monitoringTerms: monitoringTerms.trim(),
      featured,
      auditStatus: existing?.auditStatus ?? 'Pending',
      backgroundCheck: existing?.backgroundCheck ?? 'In Progress',
      legalCompliance: existing?.legalCompliance ?? 'Pending',
      ongoingAudit: existing?.ongoingAudit ?? 'Pending',
    });

    setFormError('');
    setFormSavedBanner(
      editingId ? 'Business updated in UBA registry.' : 'New business added to UBA registry.'
    );
    setActiveTab('overview');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Bar Contract for Dashboard */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B253A] tracking-tight">
            Organizer Dashboard — Admin Hub
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage listed businesses, review investor inquiries, and control background &amp; financial audit status.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {confirmReset ? (
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 text-xs">
              <span className="font-medium text-amber-900">Restore 6 seed businesses?</span>
              <button
                type="button"
                onClick={() => {
                  onResetDemo();
                  setConfirmReset(false);
                }}
                className="font-semibold text-emerald-700 hover:underline cursor-pointer"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="font-medium text-slate-600 hover:underline cursor-pointer"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset Demo Data</span>
            </button>
          )}

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#10B981] hover:bg-[#059669] text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
            <span>Add Business</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">Total Businesses</p>
          <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#0B253A] mt-1">
            {businesses.length}
          </p>
          <p className="text-xs text-slate-500 mt-1">Across 6 target industries</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">Total Capital Committed</p>
          <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#0B253A] mt-1">
            {formatCurrency(totalCapitalCommitted)}
          </p>
          <p className="text-xs text-slate-500 mt-1">Tracked across all listings</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">Investor Inquiries</p>
          <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-[#0B253A] mt-1">
            {applications.length}
          </p>
          <p className="text-xs text-slate-500 mt-1">Money, Idea &amp; hybrid applications</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500">Audits Pending / Flagged</p>
          <p className="font-mono tabular-nums text-2xl sm:text-3xl font-semibold text-amber-700 mt-1">
            {auditsPendingCount}
          </p>
          <p className="text-xs text-slate-500 mt-1">Requires Organizer sign-off</p>
        </div>
      </section>

      {formSavedBanner && (
        <div className="mb-6 flex items-center justify-between gap-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-900">
          <span className="font-medium">{formSavedBanner}</span>
          <button
            type="button"
            onClick={() => setFormSavedBanner('')}
            className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Workspace Split: Sidebar Nav + Main Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="lg:col-span-3 bg-[#0B253A] text-slate-200 rounded-xl p-3 space-y-1">
          {[
            { id: 'overview' as const, label: 'Businesses Management', icon: LayoutDashboard },
            { id: 'form' as const, label: editingId ? 'Edit Business' : 'Add Business', icon: PlusCircle },
            { id: 'inquiries' as const, label: 'Investor Inquiries', icon: Users },
            { id: 'audits' as const, label: 'Audit & Compliance Control', icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.id === 'form' && !editingId) {
                    openCreateForm();
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer ${
                  active
                    ? 'bg-[#10B981] text-white'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </aside>

        <div className="lg:col-span-9 space-y-6">
          {/* Tab (b): Businesses Management Table */}
          {activeTab === 'overview' && (
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="font-display text-lg font-bold text-[#0B253A]">
                    Businesses &amp; Funding Progress
                  </h2>
                  <p className="text-xs text-slate-500">
                    Edit details, inspect live capital progress, or open public business view.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('audits')}
                  className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer whitespace-nowrap"
                >
                  Open Audit Controls →
                </button>
              </div>

              {businesses.length === 0 ? (
                <div className="p-10 text-center space-y-3">
                  <Building2 className="w-8 h-8 text-slate-400 mx-auto" />
                  <p className="text-sm font-medium text-slate-700">No businesses in registry.</p>
                  <button
                    type="button"
                    onClick={openCreateForm}
                    className="px-4 py-2 text-xs font-semibold bg-[#0B253A] text-white rounded-lg cursor-pointer"
                  >
                    Add First Business
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
                        <th className="py-3 px-5 font-medium">Business</th>
                        <th className="py-3 px-4 font-medium">Model</th>
                        <th className="py-3 px-4 font-medium">Progress</th>
                        <th className="py-3 px-4 font-medium text-right">Target Goal</th>
                        <th className="py-3 px-4 font-medium">Audit</th>
                        <th className="py-3 px-5 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {businesses.map((biz) => {
                        const pct = Math.min(
                          100,
                          Math.round((biz.raisedAmount / Math.max(1, biz.fundingGoal)) * 100)
                        );
                        return (
                          <tr key={biz.id} className="hover:bg-slate-50/70">
                            <td className="py-3.5 px-5">
                              <p className="font-semibold text-[#0B253A]">{biz.name}</p>
                              <p className="text-xs text-slate-500">
                                {biz.industry} · {biz.ownerName}
                              </p>
                            </td>
                            <td className="py-3.5 px-4 text-xs font-medium text-slate-700 whitespace-nowrap">
                              {biz.investmentModel}
                            </td>
                            <td className="py-3.5 px-4 min-w-[140px]">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      pct >= 100 ? 'bg-[#0B253A]' : 'bg-[#10B981]'
                                    }`}
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                                <span className="font-mono tabular-nums text-xs text-slate-700 w-9 text-right">
                                  {pct}%
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-right font-mono tabular-nums text-slate-800 whitespace-nowrap">
                              {formatCurrency(biz.fundingGoal)}
                            </td>
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <span
                                className={`text-xs font-semibold ${
                                  biz.auditStatus === 'Verified'
                                    ? 'text-emerald-700'
                                    : biz.auditStatus === 'Flagged'
                                    ? 'text-rose-700'
                                    : 'text-amber-700'
                                }`}
                              >
                                {biz.auditStatus}
                              </span>
                            </td>
                            <td className="py-3.5 px-5 text-right whitespace-nowrap">
                              {confirmDeleteId === biz.id ? (
                                <span className="inline-flex items-center gap-2 text-xs">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      onDeleteBusiness(biz.id);
                                      setConfirmDeleteId(null);
                                    }}
                                    className="font-semibold text-rose-700 hover:underline cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="text-slate-600 hover:underline cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </span>
                              ) : (
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => onNavigate('details', biz.id)}
                                    className="p-1.5 text-slate-500 hover:text-[#0B253A] rounded hover:bg-slate-100 cursor-pointer"
                                    title="View public business page"
                                    aria-label={`View ${biz.name}`}
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => openEditForm(biz)}
                                    className="p-1.5 text-slate-500 hover:text-[#0B253A] rounded hover:bg-slate-100 cursor-pointer"
                                    title="Edit business"
                                    aria-label={`Edit ${biz.name}`}
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteId(biz.id)}
                                    className="p-1.5 text-slate-500 hover:text-rose-700 rounded hover:bg-rose-50 cursor-pointer"
                                    title="Delete business"
                                    aria-label={`Delete ${biz.name}`}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* Tab (a): Add / Edit Business Form */}
          {activeTab === 'form' && (
            <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-[#0B253A]">
                    {editingId ? 'Edit Listed Business' : 'Add New Business Listing'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Changes save immediately to browser localStorage.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="text-xs font-medium text-slate-600 hover:text-[#0B253A] cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="dash-name" className="block text-xs font-semibold text-slate-700 mb-1">
                      Business Name
                    </label>
                    <input
                      id="dash-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                    />
                  </div>
                  <div>
                    <label htmlFor="dash-owner" className="block text-xs font-semibold text-slate-700 mb-1">
                      Principal Owner
                    </label>
                    <input
                      id="dash-owner"
                      type="text"
                      value={ownerName}
                      onChange={(e) => setOwnerName(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="dash-industry" className="block text-xs font-semibold text-slate-700 mb-1">
                      Industry
                    </label>
                    <select
                      id="dash-industry"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value as IndustryCategory)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                    >
                      {INDUSTRY_CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dash-model" className="block text-xs font-semibold text-slate-700 mb-1">
                      Investment Model
                    </label>
                    <select
                      id="dash-model"
                      value={investmentModel}
                      onChange={(e) => setInvestmentModel(e.target.value as InvestmentModel)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                    >
                      {INVESTMENT_MODELS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dash-location" className="block text-xs font-semibold text-slate-700 mb-1">
                      Location
                    </label>
                    <input
                      id="dash-location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City / District"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="dash-goal" className="block text-xs font-semibold text-slate-700 mb-1">
                      Funding Goal ($)
                    </label>
                    <input
                      id="dash-goal"
                      type="number"
                      min={1000}
                      value={fundingGoal}
                      onChange={(e) => setFundingGoal(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                    />
                  </div>
                  <div>
                    <label htmlFor="dash-raised" className="block text-xs font-semibold text-slate-700 mb-1">
                      Raised So Far ($)
                    </label>
                    <input
                      id="dash-raised"
                      type="number"
                      min={0}
                      value={raisedAmount}
                      onChange={(e) => setRaisedAmount(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                    />
                  </div>
                  <div>
                    <label htmlFor="dash-margin" className="block text-xs font-semibold text-slate-700 mb-1">
                      Est. Margin (%)
                    </label>
                    <input
                      id="dash-margin"
                      type="number"
                      step={0.5}
                      value={expectedMarginPercent}
                      onChange={(e) => setExpectedMarginPercent(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                    />
                  </div>
                  <div>
                    <label htmlFor="dash-year" className="block text-xs font-semibold text-slate-700 mb-1">
                      Established Year
                    </label>
                    <input
                      id="dash-year"
                      type="number"
                      value={establishedYear}
                      onChange={(e) => setEstablishedYear(e.target.value)}
                      className="w-full px-3 py-2 text-sm font-mono tabular-nums border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dash-tagline" className="block text-xs font-semibold text-slate-700 mb-1">
                    Short Tagline
                  </label>
                  <input
                    id="dash-tagline"
                    type="text"
                    value={shortTagline}
                    onChange={(e) => setShortTagline(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  />
                </div>

                <div>
                  <label htmlFor="dash-desc" className="block text-xs font-semibold text-slate-700 mb-1">
                    Detailed Overview
                  </label>
                  <textarea
                    id="dash-desc"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  />
                </div>

                <div>
                  <label htmlFor="dash-terms" className="block text-xs font-semibold text-slate-700 mb-1">
                    Monitoring &amp; Audit Terms
                  </label>
                  <textarea
                    id="dash-terms"
                    rows={2}
                    value={monitoringTerms}
                    onChange={(e) => setMonitoringTerms(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  />
                </div>

                <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#0B253A]"
                  />
                  <span>Feature on UBA Homepage</span>
                </label>

                {formError && (
                  <p className="text-xs font-medium text-rose-600">{formError}</p>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#0B253A] hover:bg-[#133552] text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <Check className="w-4 h-4" aria-hidden="true" />
                    <span>{editingId ? 'Save Changes' : 'Create Business Listing'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Tab (c): Investor Inquiries Table */}
          {activeTab === 'inquiries' && (
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="font-display text-lg font-bold text-[#0B253A]">
                  Investor Inquiries &amp; Capital Commitments
                </h2>
                <p className="text-xs text-slate-500">
                  Applications submitted via the Invest flow are logged here for Organizer status review.
                </p>
              </div>

              {applications.length === 0 ? (
                <div className="p-10 text-center text-sm text-slate-500">
                  No investor applications have been submitted yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
                        <th className="py-3 px-5 font-medium">Investor</th>
                        <th className="py-3 px-4 font-medium">Business</th>
                        <th className="py-3 px-4 font-medium">Type</th>
                        <th className="py-3 px-4 font-medium text-right">Amount</th>
                        <th className="py-3 px-5 font-medium">Application Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.map((app) => (
                        <tr key={app.id} className="hover:bg-slate-50/70">
                          <td className="py-3.5 px-5">
                            <p className="font-semibold text-[#0B253A]">{app.investorName}</p>
                            <p className="text-xs text-slate-500">{app.investorEmail}</p>
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-medium text-slate-800">{app.businessName}</p>
                            {app.ideaPitch && (
                              <p className="text-xs text-slate-500 line-clamp-1 max-w-xs">
                                {app.ideaPitch}
                              </p>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-xs font-medium text-slate-700 whitespace-nowrap">
                            {app.investmentType}
                          </td>
                          <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold text-[#0B253A] whitespace-nowrap">
                            {app.amount > 0 ? formatCurrency(app.amount) : 'Idea Pitch'}
                          </td>
                          <td className="py-3.5 px-5">
                            <select
                              aria-label={`Update status for ${app.investorName}`}
                              value={app.status}
                              onChange={(e) =>
                                onUpdateApplicationStatus(
                                  app.id,
                                  e.target.value as InvestorApplication['status']
                                )
                              }
                              className="px-2.5 py-1.5 text-xs font-medium bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#0B253A]"
                            >
                              <option value="Under Review">Under Review</option>
                              <option value="Committed">Committed</option>
                              <option value="Approved">Approved</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* Tab (d): Audit & Compliance Control Table */}
          {activeTab === 'audits' && (
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200">
                <h2 className="font-display text-lg font-bold text-[#0B253A]">
                  Audit &amp; Compliance Control Center
                </h2>
                <p className="text-xs text-slate-500">
                  Toggle background check, legal compliance, and overall audit status in real time. Updates immediately reflect across public pages.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
                      <th className="py-3 px-5 font-medium">Business</th>
                      <th className="py-3 px-3 font-medium">Background Check</th>
                      <th className="py-3 px-3 font-medium">Legal Check</th>
                      <th className="py-3 px-3 font-medium">Ongoing Audit</th>
                      <th className="py-3 px-5 font-medium">Overall Verdict</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {businesses.map((biz) => (
                      <tr key={biz.id} className="hover:bg-slate-50/70">
                        <td className="py-3.5 px-5">
                          <p className="font-semibold text-[#0B253A]">{biz.name}</p>
                          <p className="text-xs font-mono text-slate-500">{biz.certificateId}</p>
                        </td>
                        <td className="py-3.5 px-3">
                          <select
                            aria-label={`Background check status for ${biz.name}`}
                            value={biz.backgroundCheck}
                            onChange={(e) =>
                              onUpdateAudit(biz.id, {
                                backgroundCheck: e.target.value as CheckStatus,
                              })
                            }
                            className="px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                          >
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Pending">Pending</option>
                            <option value="Flagged">Flagged</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-3">
                          <select
                            aria-label={`Legal compliance status for ${biz.name}`}
                            value={biz.legalCompliance}
                            onChange={(e) =>
                              onUpdateAudit(biz.id, {
                                legalCompliance: e.target.value as CheckStatus,
                              })
                            }
                            className="px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                          >
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Pending">Pending</option>
                            <option value="Flagged">Flagged</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-3">
                          <select
                            aria-label={`Ongoing audit status for ${biz.name}`}
                            value={biz.ongoingAudit}
                            onChange={(e) =>
                              onUpdateAudit(biz.id, {
                                ongoingAudit: e.target.value as CheckStatus,
                              })
                            }
                            className="px-2 py-1.5 text-xs bg-white border border-slate-300 rounded-md"
                          >
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Pending">Pending</option>
                            <option value="Flagged">Flagged</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-5">
                          <select
                            aria-label={`Overall audit verdict for ${biz.name}`}
                            value={biz.auditStatus}
                            onChange={(e) =>
                              onUpdateAudit(biz.id, {
                                auditStatus: e.target.value as AuditStatus,
                              })
                            }
                            className={`px-2.5 py-1.5 text-xs font-semibold border rounded-md ${
                              biz.auditStatus === 'Verified'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                : biz.auditStatus === 'Flagged'
                                ? 'bg-rose-50 text-rose-800 border-rose-300'
                                : 'bg-amber-50 text-amber-800 border-amber-300'
                            }`}
                          >
                            <option value="Verified">Verified</option>
                            <option value="Pending">Pending</option>
                            <option value="Flagged">Flagged</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
