import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calculator,
  ArrowRight,
  MapPin,
  Calendar,
  User,
} from 'lucide-react';
import { Business, InvestorApplication, PageRoute } from '../types/uba';
import { formatCurrency } from '../data/seedBusinesses';
import { IndustryArtwork } from '../components/IndustryArtwork';

interface BusinessDetailsPageProps {
  business: Business | undefined;
  applications: InvestorApplication[];
  onNavigate: (page: PageRoute, businessId?: string, prefillAmount?: number) => void;
}

export const BusinessDetailsPage: React.FC<BusinessDetailsPageProps> = ({
  business,
  applications,
  onNavigate,
}) => {
  const remainingNeeded = business
    ? Math.max(0, business.fundingGoal - business.raisedAmount)
    : 0;
  const isFunded = remainingNeeded === 0;

  const defaultCalcAmount = business
    ? Math.min(Math.max(1000, Math.round(remainingNeeded * 0.25)), Math.max(1000, remainingNeeded))
    : 10000;

  const [calcAmount, setCalcAmount] = useState<number>(defaultCalcAmount);

  useEffect(() => {
    if (business) {
      const rem = Math.max(0, business.fundingGoal - business.raisedAmount);
      setCalcAmount(rem > 0 ? Math.min(10000, rem) : 0);
    }
  }, [business?.id, business?.fundingGoal, business?.raisedAmount]);

  if (!business) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <h1 className="font-display text-2xl font-bold text-[#0B253A]">
          Business Not Found
        </h1>
        <p className="text-sm text-slate-600">
          The requested business record could not be located or was removed by an Organizer.
        </p>
        <button
          type="button"
          onClick={() => onNavigate('businesses')}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#0B253A] text-white rounded-lg hover:bg-[#133552] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Back to All Businesses</span>
        </button>
      </div>
    );
  }

  const progressPercent = Math.min(
    100,
    Math.round((business.raisedAmount / Math.max(1, business.fundingGoal)) * 100)
  );

  const safeAmount = Math.max(0, Math.min(calcAmount, remainingNeeded));
  const ubaFee = Math.round((safeAmount * business.ubaPlatformFeePercent) / 100);
  const netCapitalToBusiness = Math.max(0, safeAmount - ubaFee);
  const estimatedAnnualReturn = Math.round(
    (safeAmount * business.expectedMarginPercent) / 100
  );

  const businessApplications = applications.filter(
    (app) => app.businessId === business.id
  );

  const milestones = [
    {
      step: '1. Background Check',
      status: business.backgroundCheck,
      detail: 'Founder identity, credit standing, and physical operational inspection.',
    },
    {
      step: '2. Legal Audit Check',
      status: business.legalCompliance,
      detail: 'Trade license validation, tax clearance, and UBA partnership covenants.',
    },
    {
      step: '3. Fund Disbursement Governance',
      status:
        business.auditStatus === 'Verified'
          ? 'Completed'
          : business.auditStatus === 'Flagged'
          ? 'Flagged'
          : 'In Progress',
      detail: 'Milestone escrow release controls managed by UBA Organizers.',
    },
    {
      step: '4. Ongoing Financial Audit',
      status: business.ongoingAudit,
      detail: 'Quarterly ledger audits and revenue reconciliation reporting.',
    },
  ];

  const renderCheckIcon = (status: string) => {
    if (status === 'Completed') {
      return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden="true" />;
    }
    if (status === 'Flagged') {
      return <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" aria-hidden="true" />;
    }
    return <Clock className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          type="button"
          onClick={() => onNavigate('businesses')}
          className="inline-flex items-center gap-1.5 font-medium text-slate-600 hover:text-[#0B253A] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Businesses</span>
        </button>
        <span aria-hidden="true">/</span>
        <span>{business.industry}</span>
        <span aria-hidden="true">/</span>
        <span className="text-[#0B253A] font-medium truncate">{business.name}</span>
      </div>

      {/* Hero Split Overview */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-5 bg-slate-50 border-b lg:border-b-0 lg:border-r border-slate-200 flex items-center justify-center">
          <IndustryArtwork
            industry={business.industry}
            className="w-full h-60 lg:h-full object-cover"
          />
        </div>

        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{business.auditStatus} Audit</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-slate-700">{business.industry}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{business.certificateId}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B253A] tracking-tight">
              {business.name}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {business.shortTagline}
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                <span>Principal: {business.ownerName}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                <span>{business.location}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 tabular-nums">
                <Calendar className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                <span>Est. {business.establishedYear}</span>
              </span>
            </div>
          </div>

          {/* Progress Strip */}
          <div className="space-y-2 pt-4 border-t border-slate-100">
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-slate-600">
                Committed:{' '}
                <strong className="font-mono tabular-nums text-[#0B253A]">
                  {formatCurrency(business.raisedAmount)}
                </strong>
              </span>
              <span className="font-mono tabular-nums font-semibold text-emerald-700">
                {progressPercent}% Funded
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  isFunded ? 'bg-[#0B253A]' : 'bg-[#10B981]'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4-Metric KPI Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500 mb-1">Funding Goal</p>
          <p className="font-mono tabular-nums text-xl sm:text-2xl font-semibold text-[#0B253A]">
            {formatCurrency(business.fundingGoal)}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500 mb-1">Remaining Needed</p>
          <p className="font-mono tabular-nums text-xl sm:text-2xl font-semibold text-[#0B253A]">
            {isFunded ? '$0 (Goal Met)' : formatCurrency(remainingNeeded)}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500 mb-1">Investment Model</p>
          <p className="font-display text-xl sm:text-2xl font-semibold text-[#0B253A]">
            {business.investmentModel}
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <p className="text-xs font-medium text-slate-500 mb-1">Audit Status</p>
          <p
            className={`font-display text-xl sm:text-2xl font-semibold ${
              business.auditStatus === 'Verified'
                ? 'text-emerald-700'
                : business.auditStatus === 'Flagged'
                ? 'text-rose-700'
                : 'text-amber-700'
            }`}
          >
            {business.auditStatus}
          </p>
        </div>
      </section>

      {/* Main Content + Sticky Margin Calculator Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-8">
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
            <div>
              <h2 className="font-display text-xl font-bold text-[#0B253A] mb-2">
                About This Project
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {business.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h3 className="font-display text-sm font-semibold text-[#0B253A] mb-1.5">
                Monitoring &amp; Governance Terms
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {business.monitoringTerms}
              </p>
            </div>
          </section>

          {/* Vertical Verification & Audit Timeline */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-[#0B253A] mb-1.5">
              Verification &amp; Audit Milestone Timeline
            </h2>
            <p className="text-sm text-slate-600 mb-6">
              Live compliance checkpoints tracked by the UBA Organizer Desk.
            </p>

            <ol className="space-y-6">
              {milestones.map((m, idx) => (
                <li key={m.step} className="relative flex gap-4">
                  <div className="flex flex-col items-center">
                    {renderCheckIcon(m.status)}
                    {idx < milestones.length - 1 && (
                      <div className="w-px flex-1 bg-slate-200 mt-2" aria-hidden="true" />
                    )}
                  </div>
                  <div className="pb-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-sm font-semibold text-[#0B253A]">
                        {m.step}
                      </h3>
                      <span className="text-xs font-medium text-slate-500">
                        · {m.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {m.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Recent Commitments for this Business */}
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <h2 className="font-display text-lg font-bold text-[#0B253A] mb-4">
              Recent Partner Commitments ({businessApplications.length})
            </h2>
            {businessApplications.length === 0 ? (
              <p className="text-sm text-slate-500">
                No partner applications logged yet for this venture. Be the first investor or strategic partner to apply.
              </p>
            ) : (
              <div className="divide-y divide-slate-100">
                {businessApplications.map((app) => (
                  <div
                    key={app.id}
                    className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-[#0B253A]">
                        {app.investorName}{' '}
                        <span className="text-xs font-normal text-slate-500">
                          · {app.investmentType}
                        </span>
                      </p>
                      {app.ideaPitch && (
                        <p className="text-xs text-slate-600 mt-0.5">{app.ideaPitch}</p>
                      )}
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <p className="font-mono tabular-nums font-semibold text-[#0B253A]">
                        {app.amount > 0 ? formatCurrency(app.amount) : 'Strategic Idea'}
                      </p>
                      <p className="text-xs text-emerald-700">{app.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Sticky Investment & UBA Margin Calculator */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24 bg-white border border-slate-200 rounded-xl p-6 sm:p-7 space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
            <div className="w-9 h-9 rounded-lg bg-[#0B253A] text-white flex items-center justify-center shrink-0">
              <Calculator className="w-4 h-4" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-[#0B253A]">
                Investment &amp; UBA Margin Calculator
              </h2>
              <p className="text-xs text-slate-500">
                Estimate net allocation and projected annual return
              </p>
            </div>
          </div>

          {isFunded ? (
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 space-y-2">
              <p className="font-semibold text-[#0B253A]">Funding Goal Reached</p>
              <p>
                This business has reached 100% of its target capital ({formatCurrency(business.fundingGoal)}). You can still explore open opportunities or submit a strategic Idea inquiry.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('businesses')}
                className="w-full mt-2 px-4 py-2.5 text-sm font-medium bg-[#0B253A] text-white rounded-lg hover:bg-[#133552] transition-colors cursor-pointer"
              >
                Browse Open Opportunities
              </button>
            </div>
          ) : (
            <>
              {business.investmentModel === 'Idea' ? (
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-sm text-emerald-900 space-y-1.5">
                  <p className="font-semibold">Idea Partnership Model</p>
                  <p className="text-xs leading-relaxed text-emerald-800">
                    This venture seeks operational, marketing, or supply-chain expertise rather than direct cash capital. Projected revenue share: {business.expectedMarginPercent}% upon milestone delivery.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="calc-amount-input"
                      className="text-xs font-semibold text-slate-700"
                    >
                      Contribution Amount ($)
                    </label>
                    <span className="text-xs text-slate-500 tabular-nums">
                      Max: {formatCurrency(remainingNeeded)}
                    </span>
                  </div>

                  <input
                    id="calc-amount-input"
                    type="number"
                    min={Math.min(1000, remainingNeeded)}
                    max={remainingNeeded}
                    step={500}
                    value={safeAmount}
                    onChange={(e) => setCalcAmount(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 text-base font-mono tabular-nums font-semibold text-[#0B253A] border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  />

                  <input
                    type="range"
                    min={Math.min(1000, remainingNeeded)}
                    max={remainingNeeded}
                    step={500}
                    value={safeAmount}
                    onChange={(e) => setCalcAmount(Number(e.target.value))}
                    aria-label="Adjust investment amount slider"
                    className="w-full accent-[#10B981] cursor-pointer"
                  />
                </div>
              )}

              {/* Breakdown Rows */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">
                    UBA Audit &amp; Platform Margin ({business.ubaPlatformFeePercent}%)
                  </span>
                  <span className="font-mono tabular-nums font-medium text-slate-800">
                    {business.investmentModel === 'Idea' ? '$0' : formatCurrency(ubaFee)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Net Capital to Business</span>
                  <span className="font-mono tabular-nums font-medium text-[#0B253A]">
                    {business.investmentModel === 'Idea'
                      ? 'Skill Allocation'
                      : formatCurrency(netCapitalToBusiness)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="font-medium text-slate-800">
                    Est. Annual Return ({business.expectedMarginPercent}%)
                  </span>
                  <span className="font-mono tabular-nums font-bold text-emerald-700">
                    {business.investmentModel === 'Idea'
                      ? `${business.expectedMarginPercent}% Share`
                      : formatCurrency(estimatedAnnualReturn)}
                  </span>
                </div>
              </div>

              {business.auditStatus === 'Flagged' ? (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                  New commitments are paused while this business resolves an active audit flag.
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    onNavigate(
                      'invest',
                      business.id,
                      business.investmentModel === 'Idea' ? 0 : safeAmount
                    )
                  }
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-[#10B981] hover:bg-[#059669] text-white rounded-lg transition-colors duration-150 cursor-pointer"
                >
                  <span>Invest Now</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              )}

              <p className="text-xs text-slate-500 text-center">
                No payment is charged here. Applications are logged for Organizer escrow verification.
              </p>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};
