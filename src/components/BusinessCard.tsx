import React from 'react';
import { ShieldCheck, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { Business } from '../types/uba';
import { formatCurrency } from '../data/seedBusinesses';
import { IndustryArtwork } from './IndustryArtwork';

interface BusinessCardProps {
  business: Business;
  onViewDetails: (businessId: string) => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  onViewDetails,
}) => {
  const progressPercent = Math.min(
    100,
    Math.round((business.raisedAmount / Math.max(1, business.fundingGoal)) * 100)
  );
  const isFunded = business.raisedAmount >= business.fundingGoal;

  const renderAuditStatus = () => {
    if (business.auditStatus === 'Verified') {
      return (
        <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Verified Audit</span>
        </span>
      );
    }
    if (business.auditStatus === 'Flagged') {
      return (
        <span className="inline-flex items-center gap-1 text-rose-700 font-medium">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Audit Flagged</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-amber-700 font-medium">
        <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        <span>Pending Audit</span>
      </span>
    );
  };

  return (
    <article className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col transition-transform duration-150 hover:-translate-y-0.5 hover:border-slate-300">
      <div className="relative border-b border-slate-100 bg-slate-50">
        <IndustryArtwork industry={business.industry} className="w-full h-44 object-cover" />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        {/* Clean unboxed metadata row */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 mb-2">
          <span className="font-medium text-slate-700">{business.industry}</span>
          <span aria-hidden="true">·</span>
          <span>{business.investmentModel}</span>
          <span aria-hidden="true">·</span>
          {renderAuditStatus()}
        </div>

        <h3 className="font-display text-lg font-semibold text-[#0B253A] leading-snug mb-2">
          {business.name}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-5">
          {business.shortTagline}
        </p>

        {/* Funding Progress */}
        <div className="mt-auto space-y-2.5 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between text-xs">
            <span className="text-slate-500">
              Raised{' '}
              <strong className="font-mono tabular-nums text-[#0B253A] font-semibold">
                {formatCurrency(business.raisedAmount)}
              </strong>
            </span>
            <span className="font-mono tabular-nums text-slate-600 font-medium">
              {isFunded ? '100% Funded' : `${progressPercent}%`}
            </span>
          </div>

          <div
            className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Funding progress for ${business.name}`}
          >
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isFunded ? 'bg-[#0B253A]' : 'bg-[#10B981]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
            <span>
              Goal:{' '}
              <span className="font-mono tabular-nums text-slate-800 font-medium">
                {formatCurrency(business.fundingGoal)}
              </span>
            </span>
            <span>
              Est. Margin:{' '}
              <span className="font-mono tabular-nums text-emerald-700 font-medium">
                {business.expectedMarginPercent}%
              </span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => onViewDetails(business.id)}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#0B253A] hover:bg-[#133552] rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B253A]"
          >
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
};
