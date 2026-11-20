import React, { useState } from 'react';
import { ShieldCheck, FileCheck2, Scale, Award, ArrowRight } from 'lucide-react';
import { Business, PageRoute } from '../types/uba';
import { formatCurrency } from '../data/seedBusinesses';

interface CompliancePageProps {
  businesses: Business[];
  onNavigate: (page: PageRoute, businessId?: string) => void;
}

export const CompliancePage: React.FC<CompliancePageProps> = ({
  businesses,
  onNavigate,
}) => {
  const verifiedBusinesses = businesses.filter((b) => b.auditStatus === 'Verified');
  const [selectedId, setSelectedId] = useState<string>(
    verifiedBusinesses[0]?.id ?? businesses[0]?.id ?? ''
  );

  const selectedBiz =
    businesses.find((b) => b.id === selectedId) ?? verifiedBusinesses[0] ?? businesses[0];

  return (
    <div>
      {/* Dark Navy Trust Banner */}
      <section className="bg-[#0B253A] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-balance mb-4">
              Verification, Legal Compliance &amp; Audit Governance
            </h1>
            <p className="text-slate-300 text-base leading-relaxed">
              Fraud prevention is the foundation of United Business Alliance. Before any capital or strategic partnership opens, our Organizer compliance desk inspects corporate standing, founder background, and financial reporting controls.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* 3-Step Verification Breakdown */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="font-display text-lg font-semibold text-[#0B253A]">
              01. Founder Background Check
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              National ID verification, beneficial ownership disclosure, credit standing review, and physical site inspection at the primary operating facility.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Scale className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="font-display text-lg font-semibold text-[#0B253A]">
              02. Legal &amp; Tax Compliance
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Active trade license authentication, tax identification check, and standardized profit-sharing or Idea+Money memorandum execution.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <FileCheck2 className="w-5 h-5" aria-hidden="true" />
            </div>
            <h2 className="font-display text-lg font-semibold text-[#0B253A]">
              03. Ongoing Quarterly Audits
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Escrow tranche releases tied to verified operational milestones, monthly ledger reconciliation, and real-time status tracking in the Organizer Hub.
            </p>
          </div>
        </section>

        {/* Interactive Sample Audit Clearance Certificate */}
        {selectedBiz && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-display text-2xl font-bold text-[#0B253A] tracking-tight">
                Live Audit Clearance Registry
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Select any business from the live UBA registry to inspect its current compliance standing and audit certificate record. Updates made by an Organizer in the Dashboard reflect here immediately.
              </p>

              <div className="space-y-2">
                <label
                  htmlFor="compliance-biz-select"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Inspect Business Certificate
                </label>
                <select
                  id="compliance-biz-select"
                  value={selectedBiz.id}
                  onChange={(e) => setSelectedId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
                >
                  {businesses.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.auditStatus})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('details', selectedBiz.id)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#0B253A] text-white rounded-lg hover:bg-[#133552] transition-colors cursor-pointer"
                >
                  <span>Open Business Profile</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white border border-slate-300 text-slate-800 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>Update in Organizer Portal</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#0B253A] text-emerald-400 flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-slate-500">
                      Certificate ID: {selectedBiz.certificateId}
                    </p>
                    <h3 className="font-display text-lg font-bold text-[#0B253A]">
                      {selectedBiz.name}
                    </h3>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs text-slate-500">Current Audit Verdict</p>
                  <p
                    className={`font-display text-sm font-bold ${
                      selectedBiz.auditStatus === 'Verified'
                        ? 'text-emerald-700'
                        : selectedBiz.auditStatus === 'Flagged'
                        ? 'text-rose-700'
                        : 'text-amber-700'
                    }`}
                  >
                    {selectedBiz.auditStatus}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-500 mb-0.5">Principal Owner</p>
                  <p className="font-semibold text-[#0B253A]">{selectedBiz.ownerName}</p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-500 mb-0.5">Sector &amp; Model</p>
                  <p className="font-semibold text-[#0B253A]">
                    {selectedBiz.industry} · {selectedBiz.investmentModel}
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-500 mb-0.5">Background Screening</p>
                  <p className="font-semibold text-[#0B253A]">{selectedBiz.backgroundCheck}</p>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-500 mb-0.5">Authorized Funding Cap</p>
                  <p className="font-mono tabular-nums font-semibold text-[#0B253A]">
                    {formatCurrency(selectedBiz.fundingGoal)}
                  </p>
                </div>
              </div>

              <div className="text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-700 mb-1">
                  Monitoring &amp; Escrow Covenant
                </p>
                <p>{selectedBiz.monitoringTerms}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
