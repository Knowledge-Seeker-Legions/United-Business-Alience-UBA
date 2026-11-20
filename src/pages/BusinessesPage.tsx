import React from 'react';
import { Search, RotateCcw, Building2 } from 'lucide-react';
import {
  Business,
  INDUSTRY_CATEGORIES,
  INVESTMENT_MODELS,
  IndustryCategory,
  InvestmentModel,
} from '../types/uba';
import { BusinessCard } from '../components/BusinessCard';

interface BusinessesPageProps {
  businesses: Business[];
  searchKeyword: string;
  selectedCategories: IndustryCategory[];
  selectedModel: InvestmentModel | 'All';
  selectedStatus: 'All' | 'Open' | 'Funded';
  onSearchChange: (val: string) => void;
  onToggleCategory: (cat: IndustryCategory) => void;
  onModelChange: (model: InvestmentModel | 'All') => void;
  onStatusChange: (status: 'All' | 'Open' | 'Funded') => void;
  onClearFilters: () => void;
  onViewDetails: (businessId: string) => void;
  onNavigatePitch: () => void;
}

export const BusinessesPage: React.FC<BusinessesPageProps> = ({
  businesses,
  searchKeyword,
  selectedCategories,
  selectedModel,
  selectedStatus,
  onSearchChange,
  onToggleCategory,
  onModelChange,
  onStatusChange,
  onClearFilters,
  onViewDetails,
  onNavigatePitch,
}) => {
  const filteredBusinesses = businesses.filter((biz) => {
    const q = searchKeyword.trim().toLowerCase();
    const matchesKeyword =
      !q ||
      biz.name.toLowerCase().includes(q) ||
      biz.industry.toLowerCase().includes(q) ||
      biz.shortTagline.toLowerCase().includes(q) ||
      biz.location.toLowerCase().includes(q) ||
      biz.investmentModel.toLowerCase().includes(q);

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(biz.industry);

    const matchesModel =
      selectedModel === 'All' || biz.investmentModel === selectedModel;

    const isFunded = biz.raisedAmount >= biz.fundingGoal;
    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Funded' && isFunded) ||
      (selectedStatus === 'Open' && !isFunded);

    return matchesKeyword && matchesCategory && matchesModel && matchesStatus;
  });

  const hasActiveFilters =
    searchKeyword.trim().length > 0 ||
    selectedCategories.length > 0 ||
    selectedModel !== 'All' ||
    selectedStatus !== 'All';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Header & Status Segmented Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B253A] tracking-tight">
            All Verified &amp; Listed Businesses
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Filter opportunities by sector, funding progress, and partnership model.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div
            className="inline-flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200"
            role="group"
            aria-label="Filter by funding status"
          >
            {(['All', 'Open', 'Funded'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => onStatusChange(status)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedStatus === status
                    ? 'bg-white text-[#0B253A] shadow-sm font-semibold'
                    : 'text-slate-600 hover:text-[#0B253A]'
                }`}
              >
                {status === 'All'
                  ? 'All Opportunities'
                  : status === 'Open'
                  ? 'Open for Funding'
                  : 'Fully Funded'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <aside className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-semibold text-[#0B253A]">
              Filters
            </h2>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-800 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Live Keyword Search */}
          <div>
            <label
              htmlFor="catalog-search"
              className="block text-xs font-semibold text-slate-700 mb-2"
            >
              Keyword Search
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="catalog-search"
                type="text"
                value={searchKeyword}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Name, city, or sector..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#0B253A]"
              />
            </div>
          </div>

          {/* 6 Industry Categories */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-700 mb-3">
              Industry Category
            </p>
            <div className="space-y-2.5">
              {INDUSTRY_CATEGORIES.map((category) => {
                const checked = selectedCategories.includes(category);
                return (
                  <label
                    key={category}
                    className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer select-none"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleCategory(category)}
                      className="w-4 h-4 rounded border-slate-300 text-[#0B253A] focus:ring-[#0B253A]"
                    />
                    <span>{category}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Investment Type Selector */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-700 mb-3">
              Investment Model
            </p>
            <div className="space-y-2">
              {(['All', ...INVESTMENT_MODELS] as const).map((model) => (
                <label
                  key={model}
                  className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    name="investment-model-filter"
                    checked={selectedModel === model}
                    onChange={() => onModelChange(model)}
                    className="w-4 h-4 border-slate-300 text-[#0B253A] focus:ring-[#0B253A]"
                  />
                  <span>{model === 'All' ? 'All Models' : model}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onClearFilters}
            className="w-full px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </aside>

        {/* Main Business Grid */}
        <div className="lg:col-span-9 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm text-slate-600">
            <p className="tabular-nums">
              Showing <strong className="text-[#0B253A]">{filteredBusinesses.length}</strong> of{' '}
              <strong className="text-[#0B253A]">{businesses.length}</strong> listed businesses
            </p>
            <button
              type="button"
              onClick={onNavigatePitch}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer text-left sm:text-right"
            >
              Are you a business owner? Pitch your venture →
            </button>
          </div>

          {filteredBusinesses.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold text-[#0B253A]">
                No businesses found
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                No listed ventures matched your current keyword, category, or investment model combination.
              </p>
              <button
                type="button"
                onClick={onClearFilters}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[#0B253A] text-white rounded-lg hover:bg-[#133552] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Reset Filters</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredBusinesses.map((biz) => (
                <BusinessCard
                  key={biz.id}
                  business={biz}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
