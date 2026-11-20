import React, { useState, useEffect } from 'react';
import { CheckCircle2, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import {
  Business,
  INVESTMENT_MODELS,
  InvestmentModel,
  InvestorApplication,
  PageRoute,
} from '../types/uba';
import { formatCurrency } from '../data/seedBusinesses';

interface InvestPageProps {
  businesses: Business[];
  preselectedBusinessId?: string;
  prefillAmount?: number;
  onSubmitInvestment: (application: {
    businessId: string;
    investorName: string;
    investorEmail: string;
    investmentType: InvestmentModel;
    amount: number;
    ideaPitch: string;
  }) => InvestorApplication | null;
  onNavigate: (page: PageRoute, businessId?: string) => void;
}

export const InvestPage: React.FC<InvestPageProps> = ({
  businesses,
  preselectedBusinessId,
  prefillAmount,
  onSubmitInvestment,
  onNavigate,
}) => {
  const openBusinesses = businesses.filter(
    (b) => b.raisedAmount < b.fundingGoal && b.auditStatus !== 'Flagged'
  );

  const initialBiz =
    businesses.find((b) => b.id === preselectedBusinessId) ??
    openBusinesses[0] ??
    businesses[0];

  const [businessId, setBusinessId] = useState<string>(initialBiz?.id ?? '');
  const [investorName, setInvestorName] = useState('');
  const [investorEmail, setInvestorEmail] = useState('');
  const [investmentType, setInvestmentType] = useState<InvestmentModel>(
    initialBiz?.investmentModel ?? 'Money'
  );
  const [amountInput, setAmountInput] = useState<string>(
    prefillAmount && prefillAmount > 0 ? String(prefillAmount) : '5000'
  );
  const [ideaPitch, setIdeaPitch] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [receipt, setReceipt] = useState<InvestorApplication | null>(null);
  const [submittedError, setSubmittedError] = useState('');

  useEffect(() => {
    if (preselectedBusinessId) {
      const target = businesses.find((b) => b.id === preselectedBusinessId);
      if (target) {
        setBusinessId(target.id);
        setInvestmentType(target.investmentModel);
      }
    }
    if (typeof prefillAmount === 'number' && prefillAmount > 0) {
      setAmountInput(String(prefillAmount));
    }
  }, [preselectedBusinessId, prefillAmount, businesses]);

  const selectedBiz = businesses.find((b) => b.id === businessId);
  const remainingGoal = selectedBiz
    ? Math.max(0, selectedBiz.fundingGoal - selectedBiz.raisedAmount)
    : 0;

  const requiresMoney = investmentType === 'Money' || investmentType === 'Idea+Money';
  const requiresIdea = investmentType === 'Idea' || investmentType === 'Idea+Money';
  const numericAmount = Number(amountInput) || 0;
  const minThreshold = Math.min(1000, remainingGoal);

  // Real-time field validation
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(investorEmail.trim());
  const amountError = (() => {
    if (!requiresMoney) return '';
    if (!selectedBiz) return 'Select an active business first.';
    if (remainingGoal <= 0) return 'This business has already reached its funding goal.';
    if (numericAmount < minThreshold) {
      return `Minimum capital contribution is ${formatCurrency(minThreshold)}.`;
    }
    if (numericAmount > remainingGoal) {
      return `Amount exceeds remaining funding needed (${formatCurrency(remainingGoal)}).`;
    }
    return '';
  })();

  const ideaError =
    requiresIdea && ideaPitch.trim().length < 15
      ? 'Please describe your operational idea or strategic contribution (at least 15 characters).'
      : '';

  // Progress bar math
  let completedSteps = 0;
  if (businessId) completedSteps += 1;
  if (investorName.trim().length >= 2) completedSteps += 1;
  if (emailValid) completedSteps += 1;
  if ((!requiresMoney || !amountError) && (!requiresIdea || !ideaError)) completedSteps += 1;
  if (termsAccepted) completedSteps += 1;
  const completionPct = Math.round((completedSteps / 5) * 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBiz) {
      setSubmittedError('Please choose a valid business opportunity.');
      return;
    }
    if (selectedBiz.auditStatus === 'Flagged') {
      setSubmittedError('Applications are paused for businesses with an active audit flag.');
      return;
    }
    if (investorName.trim().length < 2) {
      setSubmittedError('Please enter your full legal name.');
      return;
    }
    if (!emailValid) {
      setSubmittedError('Please enter a valid email address.');
      return;
    }
    if (amountError) {
      setSubmittedError(amountError);
      return;
    }
    if (ideaError) {
      setSubmittedError(ideaError);
      return;
    }
    if (!termsAccepted) {
      setSubmittedError('Please acknowledge UBA governance and audit terms before submitting.');
      return;
    }

    setSubmittedError('');
    const created = onSubmitInvestment({
      businessId: selectedBiz.id,
      investorName: investorName.trim(),
      investorEmail: investorEmail.trim(),
      investmentType,
      amount: requiresMoney ? numericAmount : 0,
      ideaPitch: ideaPitch.trim(),
    });

    if (created) {
      setReceipt(created);
    }
  };

  if (receipt) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500">Receipt ID: {receipt.id}</p>
              <h1 className="font-display text-2xl font-bold text-[#0B253A]">
                Investment Application Confirmed
              </h1>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Your commitment has been recorded in UBA local registry and the business funding progress bar has been updated. Organizers can now review your application in the Dashboard.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Target Business</span>
              <span className="font-semibold text-[#0B253A] text-right">
                {receipt.businessName}
              </span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Applicant</span>
              <span className="font-medium text-slate-800">{receipt.investorName}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-500">Partnership Model</span>
              <span className="font-medium text-slate-800">{receipt.investmentType}</span>
            </div>
            <div className="flex justify-between gap-4 pt-2 border-t border-slate-200">
              <span className="text-slate-500">Committed Amount</span>
              <span className="font-mono tabular-nums font-bold text-emerald-700">
                {receipt.amount > 0 ? formatCurrency(receipt.amount) : 'Strategic Idea Pitch'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('details', receipt.businessId)}
              className="flex-1 px-4 py-2.5 text-sm font-semibold bg-[#0B253A] text-white rounded-lg hover:bg-[#133552] transition-colors cursor-pointer"
            >
              View Updated Business Progress
            </button>
            <button
              type="button"
              onClick={() => {
                setReceipt(null);
                setInvestorName('');
                setInvestorEmail('');
                setIdeaPitch('');
                setTermsAccepted(false);
              }}
              className="px-4 py-2.5 text-sm font-medium bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Submit Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <button
          type="button"
          onClick={() =>
            selectedBiz ? onNavigate('details', selectedBiz.id) : onNavigate('businesses')
          }
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#0B253A] cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to Business</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {/* Top Completion Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100">
          <div
            className="h-full bg-[#10B981] transition-all duration-200"
            style={{ width: `${completionPct}%` }}
          />
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-1.5 pb-4 border-b border-slate-100">
            <h1 className="font-display text-2xl font-bold text-[#0B253A]">
              Investor Application Form
            </h1>
            {selectedBiz && (
              <p className="text-sm font-semibold text-emerald-700">
                {selectedBiz.name} · Remaining Goal:{' '}
                <span className="font-mono tabular-nums">
                  {formatCurrency(remainingGoal)}
                </span>
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Select Business */}
            <div>
              <label
                htmlFor="invest-business"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Select Business Opportunity
              </label>
              <select
                id="invest-business"
                value={businessId}
                onChange={(e) => {
                  const nextId = e.target.value;
                  setBusinessId(nextId);
                  const found = businesses.find((b) => b.id === nextId);
                  if (found) {
                    setInvestmentType(found.investmentModel);
                  }
                }}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
              >
                {businesses.map((b) => {
                  const rem = Math.max(0, b.fundingGoal - b.raisedAmount);
                  return (
                    <option key={b.id} value={b.id} disabled={rem === 0 || b.auditStatus === 'Flagged'}>
                      {b.name} — {rem === 0 ? 'Fully Funded' : `${formatCurrency(rem)} remaining`}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="invest-name"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Full Legal Name
                </label>
                <input
                  id="invest-name"
                  type="text"
                  value={investorName}
                  onChange={(e) => setInvestorName(e.target.value)}
                  placeholder="e.g., Imran Hossain"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="invest-email"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  Email Address
                </label>
                <input
                  id="invest-email"
                  type="email"
                  value={investorEmail}
                  onChange={(e) => setInvestorEmail(e.target.value)}
                  placeholder="investor@domain.com"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  required
                />
                {investorEmail.length > 0 && !emailValid && (
                  <p className="text-xs text-rose-600 mt-1">Enter a valid email address.</p>
                )}
              </div>
            </div>

            {/* Investment Model */}
            <div>
              <label
                htmlFor="invest-model"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                Select Contribution Model
              </label>
              <div className="grid grid-cols-3 gap-2">
                {INVESTMENT_MODELS.map((model) => (
                  <button
                    key={model}
                    type="button"
                    onClick={() => setInvestmentType(model)}
                    className={`py-2.5 px-3 text-xs sm:text-sm font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                      investmentType === model
                        ? 'bg-[#0B253A] text-white border-[#0B253A]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {model}
                  </button>
                ))}
              </div>
            </div>

            {/* Capital Amount */}
            {requiresMoney && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="invest-amount"
                    className="block text-xs font-semibold text-slate-700"
                  >
                    Investment Amount ($)
                  </label>
                  <span className="text-xs text-slate-500 tabular-nums">
                    Min: {formatCurrency(minThreshold)} · Max: {formatCurrency(remainingGoal)}
                  </span>
                </div>
                <input
                  id="invest-amount"
                  type="number"
                  min={minThreshold}
                  max={remainingGoal}
                  step={500}
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm font-mono tabular-nums font-semibold border rounded-lg focus:outline-none ${
                    amountError
                      ? 'border-rose-400 focus:border-rose-600'
                      : 'border-slate-300 focus:border-[#0B253A]'
                  }`}
                />
                {remainingGoal > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[2500, 5000, 10000, 25000]
                      .filter((preset) => preset <= remainingGoal)
                      .map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setAmountInput(String(preset))}
                          className="px-2.5 py-1 text-xs font-mono tabular-nums bg-slate-100 hover:bg-slate-200 text-slate-700 rounded border border-slate-200 cursor-pointer"
                        >
                          {formatCurrency(preset)}
                        </button>
                      ))}
                  </div>
                )}
                {amountError && (
                  <p className="text-xs text-rose-600 mt-1.5 font-medium">{amountError}</p>
                )}
              </div>
            )}

            {/* Idea Pitch / Operational Notes */}
            <div>
              <label
                htmlFor="invest-pitch"
                className="block text-xs font-semibold text-slate-700 mb-1.5"
              >
                {requiresIdea
                  ? 'Strategic Idea & Operational Contribution (Required)'
                  : 'Investment Notes (Optional)'}
              </label>
              <textarea
                id="invest-pitch"
                rows={3}
                value={ideaPitch}
                onChange={(e) => setIdeaPitch(e.target.value)}
                placeholder={
                  requiresIdea
                    ? 'Detail the operational expertise, distribution channels, or leadership role you will contribute...'
                    : 'Optional notes for the business owner and UBA audit desk...'
                }
                className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
              />
              {ideaError && ideaPitch.length > 0 && (
                <p className="text-xs text-rose-600 mt-1">{ideaError}</p>
              )}
            </div>

            {/* Terms Acceptance */}
            <label className="flex items-start gap-2.5 p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#10B981] focus:ring-[#10B981]"
              />
              <span>
                I understand that this prototype records my commitment in browser storage for Organizer audit review, with UBA governance fee ({selectedBiz?.ubaPlatformFeePercent ?? 2.5}%) applied on capital disbursements.
              </span>
            </label>

            {submittedError && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{submittedError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-[#10B981] hover:bg-[#059669] text-white rounded-lg transition-colors duration-150 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              <span>Securely Submit Application</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
