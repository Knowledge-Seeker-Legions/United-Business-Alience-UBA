/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Business,
  IndustryCategory,
  InvestmentModel,
  InvestorApplication,
  PageRoute,
} from './types/uba';
import {
  getStoredBusinesses,
  saveStoredBusinesses,
  getStoredApplications,
  saveStoredApplications,
  resetDemoStorage,
} from './data/seedBusinesses';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BusinessesPage } from './pages/BusinessesPage';
import { BusinessDetailsPage } from './pages/BusinessDetailsPage';
import { InvestPage } from './pages/InvestPage';
import { PitchPage } from './pages/PitchPage';
import { CompliancePage } from './pages/CompliancePage';
import { DashboardPage } from './pages/DashboardPage';

const VALID_PAGES: PageRoute[] = [
  'home',
  'businesses',
  'details',
  'invest',
  'pitch',
  'compliance',
  'dashboard',
];

function readRouteFromUrl(): { page: PageRoute; id?: string } {
  try {
    const params = new URLSearchParams(window.location.search);
    const rawPage = params.get('page') as PageRoute | null;
    const id = params.get('id') ?? undefined;
    if (rawPage && VALID_PAGES.includes(rawPage)) {
      return { page: rawPage, id };
    }
  } catch {
    // Ignore URL parsing issues
  }
  return { page: 'home' };
}

export default function App() {
  const initialRoute = readRouteFromUrl();

  const [businesses, setBusinesses] = useState<Business[]>(() => getStoredBusinesses());
  const [applications, setApplications] = useState<InvestorApplication[]>(() =>
    getStoredApplications()
  );
  const [currentPage, setCurrentPage] = useState<PageRoute>(initialRoute.page);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | undefined>(
    initialRoute.id
  );
  const [prefillAmount, setPrefillAmount] = useState<number | undefined>(undefined);

  // Businesses catalog filters
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<IndustryCategory[]>([]);
  const [selectedModel, setSelectedModel] = useState<InvestmentModel | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Open' | 'Funded'>('All');

  // Persist changes to localStorage
  useEffect(() => {
    saveStoredBusinesses(businesses);
  }, [businesses]);

  useEffect(() => {
    saveStoredApplications(applications);
  }, [applications]);

  // Sync browser back/forward navigation
  useEffect(() => {
    const onPopState = () => {
      const next = readRouteFromUrl();
      setCurrentPage(next.page);
      setSelectedBusinessId(next.id);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = useCallback(
    (page: PageRoute, businessId?: string, amount?: number) => {
      setCurrentPage(page);
      setSelectedBusinessId(businessId);
      setPrefillAmount(amount);

      try {
        const url = new URL(window.location.href);
        url.searchParams.set('page', page);
        if (businessId) {
          url.searchParams.set('id', businessId);
        } else {
          url.searchParams.delete('id');
        }
        window.history.pushState({}, '', url.toString());
      } catch {
        // Ignore history pushState errors
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const handleSearchRedirect = (keyword: string, category?: IndustryCategory) => {
    setSearchKeyword(keyword);
    setSelectedCategories(category ? [category] : []);
    setSelectedModel('All');
    setSelectedStatus('All');
    navigate('businesses');
  };

  const handleToggleCategory = (category: IndustryCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const handleClearFilters = () => {
    setSearchKeyword('');
    setSelectedCategories([]);
    setSelectedModel('All');
    setSelectedStatus('All');
  };

  const handleInvestorSubmit = (payload: {
    businessId: string;
    investorName: string;
    investorEmail: string;
    investmentType: InvestmentModel;
    amount: number;
    ideaPitch: string;
  }): InvestorApplication | null => {
    const target = businesses.find((b) => b.id === payload.businessId);
    if (!target) return null;

    const newApp: InvestorApplication = {
      id: `APP-${Date.now().toString().slice(-6)}`,
      businessId: target.id,
      businessName: target.name,
      investorName: payload.investorName,
      investorEmail: payload.investorEmail,
      investmentType: payload.investmentType,
      amount: payload.amount,
      ideaPitch: payload.ideaPitch,
      status: 'Committed',
      submittedAt: new Date().toISOString(),
    };

    setApplications((prev) => [newApp, ...prev]);

    if (payload.amount > 0) {
      setBusinesses((prev) =>
        prev.map((b) =>
          b.id === target.id
            ? {
                ...b,
                raisedAmount: Math.min(b.fundingGoal, b.raisedAmount + payload.amount),
              }
            : b
        )
      );
    }

    return newApp;
  };

  const handlePitchSubmit = (pitch: {
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
  }): Business => {
    const suffix = Date.now().toString().slice(-4);
    const newBiz: Business = {
      id: `uba-pitch-${suffix}`,
      name: pitch.name,
      ownerName: pitch.ownerName,
      ownerEmail: pitch.ownerEmail,
      location: pitch.location,
      industry: pitch.industry,
      investmentModel: pitch.investmentModel,
      fundingGoal: pitch.fundingGoal,
      raisedAmount: 0,
      expectedMarginPercent: pitch.expectedMarginPercent,
      ubaPlatformFeePercent: 2.5,
      auditStatus: 'Pending',
      backgroundCheck: 'Pending',
      legalCompliance: 'Pending',
      ongoingAudit: 'Pending',
      shortTagline: pitch.shortTagline,
      description: pitch.description,
      monitoringTerms: pitch.monitoringTerms,
      establishedYear: pitch.establishedYear,
      certificateId: `UBA-AUD-2026-${suffix}`,
      featured: false,
      createdAt: new Date().toISOString(),
    };

    setBusinesses((prev) => [newBiz, ...prev]);
    return newBiz;
  };

  const handleSaveBusiness = (
    bizData: Omit<Business, 'id' | 'certificateId' | 'createdAt'> & { id?: string }
  ) => {
    if (bizData.id) {
      setBusinesses((prev) =>
        prev.map((b) => (b.id === bizData.id ? { ...b, ...bizData } : b))
      );
    } else {
      const suffix = Date.now().toString().slice(-4);
      const created: Business = {
        ...bizData,
        id: `uba-admin-${suffix}`,
        certificateId: `UBA-AUD-2026-${suffix}`,
        createdAt: new Date().toISOString(),
      };
      setBusinesses((prev) => [created, ...prev]);
    }
  };

  const handleDeleteBusiness = (id: string) => {
    setBusinesses((prev) => prev.filter((b) => b.id !== id));
  };

  const handleUpdateAudit = (
    id: string,
    updates: Partial<
      Pick<Business, 'auditStatus' | 'backgroundCheck' | 'legalCompliance' | 'ongoingAudit'>
    >
  ) => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const handleUpdateApplicationStatus = (
    appId: string,
    status: InvestorApplication['status']
  ) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status } : app))
    );
  };

  const handleResetDemo = () => {
    const reset = resetDemoStorage();
    setBusinesses(reset.businesses);
    setApplications(reset.applications);
  };

  const activeBusiness = businesses.find((b) => b.id === selectedBusinessId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar currentPage={currentPage} onNavigate={navigate} />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            businesses={businesses}
            onNavigate={navigate}
            onSearchRedirect={handleSearchRedirect}
          />
        )}

        {currentPage === 'businesses' && (
          <BusinessesPage
            businesses={businesses}
            searchKeyword={searchKeyword}
            selectedCategories={selectedCategories}
            selectedModel={selectedModel}
            selectedStatus={selectedStatus}
            onSearchChange={setSearchKeyword}
            onToggleCategory={handleToggleCategory}
            onModelChange={setSelectedModel}
            onStatusChange={setSelectedStatus}
            onClearFilters={handleClearFilters}
            onViewDetails={(id) => navigate('details', id)}
            onNavigatePitch={() => navigate('pitch')}
          />
        )}

        {currentPage === 'details' && (
          <BusinessDetailsPage
            business={activeBusiness}
            applications={applications}
            onNavigate={navigate}
          />
        )}

        {currentPage === 'invest' && (
          <InvestPage
            businesses={businesses}
            preselectedBusinessId={selectedBusinessId}
            prefillAmount={prefillAmount}
            onSubmitInvestment={handleInvestorSubmit}
            onNavigate={navigate}
          />
        )}

        {currentPage === 'pitch' && (
          <PitchPage
            onSubmitPitch={handlePitchSubmit}
            onNavigate={navigate}
          />
        )}

        {currentPage === 'compliance' && (
          <CompliancePage
            businesses={businesses}
            onNavigate={navigate}
          />
        )}

        {currentPage === 'dashboard' && (
          <DashboardPage
            businesses={businesses}
            applications={applications}
            onSaveBusiness={handleSaveBusiness}
            onDeleteBusiness={handleDeleteBusiness}
            onUpdateAudit={handleUpdateAudit}
            onUpdateApplicationStatus={handleUpdateApplicationStatus}
            onResetDemo={handleResetDemo}
            onNavigate={navigate}
          />
        )}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
