import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import {
  Business,
  INDUSTRY_CATEGORIES,
  INVESTMENT_MODELS,
  IndustryCategory,
  InvestmentModel,
  PageRoute,
} from '../types/uba';
import { formatCurrency } from '../data/seedBusinesses';

interface PitchPageProps {
  onSubmitPitch: (pitch: {
    name: string;
    ownerName: string;
    ownerEmail: string;
    location: string;
    industry: IndustryCategory;
    investmentModel: InvestmentModel;
    fundingGoal: number;
    expectedMarginPercent: number;
    establishedYear: number;
    shortTagline: string;
    description: string;
    monitoringTerms: string;
  }) => Business;
  onNavigate: (page: PageRoute, businessId?: string) => void;
}

export const PitchPage: React.FC<PitchPageProps> = ({
  onSubmitPitch,
  onNavigate,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 fields
  const [name, setName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState<IndustryCategory>('Restaurant');
  const [establishedYear, setEstablishedYear] = useState('2023');

  // Step 2 fields
  const [fundingGoal, setFundingGoal] = useState('75000');
  const [investmentModel, setInvestmentModel] = useState<InvestmentModel>('Idea+Money');
  const [expectedMargin, setExpectedMargin] = useState('16.5');
  const [shortTagline, setShortTagline] = useState('');
  const [description, setDescription] = useState('');

  // Step 3 fields
  const [monitoringTerms, setMonitoringTerms] = useState(
    'Quarterly ledger audit, POS revenue reporting, and milestone-based disbursement review.'
  );
  const [consentBackground, setConsentBackground] = useState(false);
  const [consentLicense, setConsentLicense] = useState(false);

  const [error, setError] = useState('');
  const [createdBusiness, setCreatedBusiness] = useState<Business | null>(null);

  const validateStep1 = (): boolean => {
    if (name.trim().length < 3 || ownerName.trim().length < 2) {
      setError('Please enter both your business name and principal owner name.');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerEmail.trim())) {
      setError('Please provide a valid business contact email.');
      return false;
    }
    if (location.trim().length < 2) {
      setError('Please specify your primary operating city or district.');
      return false;
    }
    setError('');
    return true;
  };

  const validateStep2 = (): boolean => {
    const goalNum = Number(fundingGoal);
    const marginNum = Number(expectedMargin);
    if (!goalNum || goalNum < 5000) {
      setError('Funding goal must be at least $5,000.');
      return false;
    }
    if (!marginNum || marginNum < 1 || marginNum > 60) {
      setError('Expected annual partner margin must be between 1% and 60%.');
      return false;
    }
    if (shortTagline.trim().length < 10 || description.trim().length < 25) {
      setError('Please provide a concise tagline and detailed business overview.');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentBackground || !consentLicense) {
      setError('Please confirm both background audit consent and trade license readiness.');
      return;
    }
    if (monitoringTerms.trim().length < 15) {
      setError('Please specify clear audit and monitoring terms.');
      return;
    }

    setError('');
    const saved = onSubmitPitch({
      name: name.trim(),
      ownerName: ownerName.trim(),
      ownerEmail: ownerEmail.trim(),
      location: location.trim(),
      industry,
      investmentModel,
      fundingGoal: Number(fundingGoal),
      expectedMarginPercent: Number(expectedMargin),
      establishedYear: Number(establishedYear) || 2024,
      shortTagline: shortTagline.trim(),
      description: description.trim(),
      monitoringTerms: monitoringTerms.trim(),
    });
    setCreatedBusiness(saved);
  };

  if (createdBusiness) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500">
                Certificate Ref: {createdBusiness.certificateId}
              </p>
              <h1 className="font-display text-2xl font-bold text-[#0B253A]">
                Pitch Submitted for Background Audit
              </h1>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Your proposal for <strong>{createdBusiness.name}</strong> has been saved to UBA with status{' '}
            <strong className="text-amber-700">Pending Background Audit</strong>. An Organizer can verify and approve it from the Organizer Dashboard.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Industry</span>
              <span className="font-medium text-[#0B253A]">{createdBusiness.industry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Partnership Model</span>
              <span className="font-medium text-[#0B253A]">{createdBusiness.investmentModel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Target Goal</span>
              <span className="font-mono tabular-nums font-semibold text-[#0B253A]">
                {formatCurrency(createdBusiness.fundingGoal)}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="flex-1 px-4 py-2.5 text-sm font-semibold bg-[#0B253A] text-white rounded-lg hover:bg-[#133552] transition-colors cursor-pointer"
            >
              Review in Organizer Dashboard
            </button>
            <button
              type="button"
              onClick={() => onNavigate('details', createdBusiness.id)}
              className="px-4 py-2.5 text-sm font-medium bg-white border border-slate-300 text-slate-800 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Preview Business Listing
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B253A] tracking-tight">
          Pitch Your Business for Verification
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Business owners in UBA’s six core industries can submit funding and strategic partnership proposals for background audit clearance.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {/* Step Tabs Header */}
        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50 text-xs sm:text-sm font-medium">
          {[
            { num: 1 as const, label: '01. About Business' },
            { num: 2 as const, label: '02. Goals & Model' },
            { num: 3 as const, label: '03. Audit Readiness' },
          ].map((tab) => (
            <button
              key={tab.num}
              type="button"
              onClick={() => {
                if (tab.num < step) {
                  setError('');
                  setStep(tab.num);
                }
              }}
              className={`py-3.5 px-3 text-center border-b-2 transition-colors whitespace-nowrap truncate ${
                step === tab.num
                  ? 'border-[#10B981] text-[#0B253A] bg-white font-semibold'
                  : step > tab.num
                  ? 'border-transparent text-emerald-700 cursor-pointer'
                  : 'border-transparent text-slate-400 cursor-default'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6" noValidate>
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pitch-biz-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Business Name
                  </label>
                  <input
                    id="pitch-biz-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., GreenHarvest Cold Storage"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  />
                </div>
                <div>
                  <label htmlFor="pitch-owner" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Principal Owner Name
                  </label>
                  <input
                    id="pitch-owner"
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="e.g., Mahmud Hasan"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pitch-email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Business Email
                  </label>
                  <input
                    id="pitch-email"
                    type="email"
                    value={ownerEmail}
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    placeholder="founder@business.com"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  />
                </div>
                <div>
                  <label htmlFor="pitch-location" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Operating Location
                  </label>
                  <input
                    id="pitch-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g., Gulshan 2, Dhaka"
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-700 mb-2">
                  Industry Category (Select One)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {INDUSTRY_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setIndustry(cat)}
                      className={`px-3 py-2.5 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                        industry === cat
                          ? 'bg-[#0B253A] text-white border-[#0B253A]'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="max-w-xs">
                <label htmlFor="pitch-year" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Year Established
                </label>
                <input
                  id="pitch-year"
                  type="number"
                  min={1980}
                  max={2026}
                  value={establishedYear}
                  onChange={(e) => setEstablishedYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pitch-goal" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Target Funding Goal ($)
                  </label>
                  <input
                    id="pitch-goal"
                    type="number"
                    min={5000}
                    step={1000}
                    value={fundingGoal}
                    onChange={(e) => setFundingGoal(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  />
                </div>
                <div>
                  <label htmlFor="pitch-margin" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Expected Annual Margin (%)
                  </label>
                  <input
                    id="pitch-margin"
                    type="number"
                    min={1}
                    max={60}
                    step={0.5}
                    value={expectedMargin}
                    onChange={(e) => setExpectedMargin(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm font-mono tabular-nums border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                  />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-700 mb-2">
                  Desired Partnership Model
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {INVESTMENT_MODELS.map((model) => (
                    <button
                      key={model}
                      type="button"
                      onClick={() => setInvestmentModel(model)}
                      className={`px-3 py-2.5 text-xs sm:text-sm font-medium rounded-lg border transition-colors cursor-pointer ${
                        investmentModel === model
                          ? 'bg-[#0B253A] text-white border-[#0B253A]'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="pitch-tagline" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  One-Line Executive Summary
                </label>
                <input
                  id="pitch-tagline"
                  type="text"
                  value={shortTagline}
                  onChange={(e) => setShortTagline(e.target.value)}
                  placeholder="Concise summary of expansion goal and revenue driver..."
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                />
              </div>

              <div>
                <label htmlFor="pitch-desc" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Detailed Business Overview &amp; Use of Funds
                </label>
                <textarea
                  id="pitch-desc"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe historical traction, operational capacity, and how partner funds or expertise will be deployed..."
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <label htmlFor="pitch-terms" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Proposed Audit &amp; Monitoring Terms
                </label>
                <textarea
                  id="pitch-terms"
                  rows={3}
                  value={monitoringTerms}
                  onChange={(e) => setMonitoringTerms(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentBackground}
                    onChange={(e) => setConsentBackground(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#10B981] focus:ring-[#10B981]"
                  />
                  <span>
                    I authorize United Business Alliance Organizers to conduct founder background verification and physical site checks prior to publishing this listing as Verified.
                  </span>
                </label>

                <label className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentLicense}
                    onChange={(e) => setConsentLicense(e.target.checked)}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#10B981] focus:ring-[#10B981]"
                  />
                  <span>
                    Our trade license, tax identification, and quarterly financial statements are up to date for compliance inspection.
                  </span>
                </label>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-medium text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {/* Step Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setStep((prev) => (prev === 3 ? 2 : 1));
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold bg-[#0B253A] hover:bg-[#133552] text-white rounded-lg transition-colors cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-[#10B981] hover:bg-[#059669] text-white rounded-lg transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                <span>Submit for Verification</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
