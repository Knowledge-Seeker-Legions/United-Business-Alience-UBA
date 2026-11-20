import { Business, InvestorApplication } from '../types/uba';

const BUSINESSES_STORAGE_KEY = 'uba_platform_businesses_v1';
const APPLICATIONS_STORAGE_KEY = 'uba_platform_applications_v1';

export const SEED_BUSINESSES: Business[] = [
  {
    id: 'uba-agro-01',
    name: 'AgroShift Hydroponics & Cold Chain',
    ownerName: 'Tariqul Islam',
    ownerEmail: 'tariqul@agroshift.example',
    location: 'Bogura Agro Corridor',
    industry: 'Agriculture',
    investmentModel: 'Idea+Money',
    fundingGoal: 120000,
    raisedAmount: 84000,
    expectedMarginPercent: 18.5,
    ubaPlatformFeePercent: 2.5,
    auditStatus: 'Verified',
    backgroundCheck: 'Completed',
    legalCompliance: 'Completed',
    ongoingAudit: 'Completed',
    shortTagline: 'Solar-assisted greenhouse cultivation and refrigerated regional produce distribution.',
    description:
      'AgroShift operates 14 climate-controlled polyhouses supplying high-yield tomatoes, bell peppers, and leafy greens directly to urban retail chains. Capital raised funds a solar cold-storage unit to reduce post-harvest spoilage below 3% while welcoming agri-logistics expertise.',
    monitoringTerms:
      'Quarterly third-party inventory verification, bi-weekly POS settlement review, and escrow milestone disbursement across two expansion phases.',
    establishedYear: 2022,
    certificateId: 'UBA-AUD-2026-0142',
    featured: true,
    createdAt: '2026-09-12T09:00:00.000Z',
  },
  {
    id: 'uba-rest-02',
    name: 'The Copper Hearth Kitchen',
    ownerName: 'Nadia Rahman',
    ownerEmail: 'nadia@copperhearth.example',
    location: 'Banani Commercial District',
    industry: 'Restaurant',
    investmentModel: 'Money',
    fundingGoal: 85000,
    raisedAmount: 62000,
    expectedMarginPercent: 16.0,
    ubaPlatformFeePercent: 2.5,
    auditStatus: 'Verified',
    backgroundCheck: 'Completed',
    legalCompliance: 'Completed',
    ongoingAudit: 'Completed',
    shortTagline: 'Centralized commissary kitchen and second flagship dining room expansion.',
    description:
      'With 28 months of profitable single-unit operations and 41% repeat corporate catering volume, The Copper Hearth is opening a 74-seat second branch paired with a shared commissary line to standardize food cost at 27%.',
    monitoringTerms:
      'Monthly revenue ledger audit via cloud POS feed, supplier invoice reconciliation, and quarterly gross margin reporting.',
    establishedYear: 2023,
    certificateId: 'UBA-AUD-2026-0189',
    featured: true,
    createdAt: '2026-09-20T11:30:00.000Z',
  },
  {
    id: 'uba-const-03',
    name: 'Meridian Civic Builders',
    ownerName: 'Kamrul Hasan',
    ownerEmail: 'kamrul@meridianbuilders.example',
    location: 'Uttara Sector 14',
    industry: 'Construction Developer',
    investmentModel: 'Money',
    fundingGoal: 250000,
    raisedAmount: 250000,
    expectedMarginPercent: 21.0,
    ubaPlatformFeePercent: 2.5,
    auditStatus: 'Verified',
    backgroundCheck: 'Completed',
    legalCompliance: 'Completed',
    ongoingAudit: 'Completed',
    shortTagline: 'Pre-cast modular commercial infill project with pre-leased ground retail.',
    description:
      'Meridian Civic Builders delivers energy-efficient mid-rise commercial structures using pre-stressed concrete elements that shorten structural timelines by 30%. This project is fully subscribed and currently under active milestone monitoring.',
    monitoringTerms:
      'Independent structural engineer sign-off prior to each tranche release, municipal permit verification, and escrow contractor payments.',
    establishedYear: 2020,
    certificateId: 'UBA-AUD-2026-0094',
    featured: true,
    createdAt: '2026-08-05T08:15:00.000Z',
  },
  {
    id: 'uba-org-04',
    name: 'PureRoot Organic Provisions',
    ownerName: 'Farhana Chowdhury',
    ownerEmail: 'farhana@pureroot.example',
    location: 'Sylhet Valley Cluster',
    industry: 'Organic Food',
    investmentModel: 'Idea+Money',
    fundingGoal: 65000,
    raisedAmount: 31500,
    expectedMarginPercent: 17.5,
    ubaPlatformFeePercent: 2.5,
    auditStatus: 'Verified',
    backgroundCheck: 'Completed',
    legalCompliance: 'Completed',
    ongoingAudit: 'In Progress',
    shortTagline: 'Traceable cold-pressed oils, raw forest honey, and stone-milled grains.',
    description:
      'PureRoot partners with 180 certified smallholder farms to package chemical-free pantry staples with batch QR traceability. Seeking capital for automated glass bottling plus retail distribution strategy partners.',
    monitoringTerms:
      'Batch lab purity testing records uploaded monthly, warehouse stock audit, and quarterly distributor receivable reviews.',
    establishedYear: 2024,
    certificateId: 'UBA-AUD-2026-0211',
    featured: false,
    createdAt: '2026-10-02T14:20:00.000Z',
  },
  {
    id: 'uba-exp-05',
    name: 'PortLine Global Trade Co.',
    ownerName: 'Arifuzzaman Khan',
    ownerEmail: 'arif@portlinetrade.example',
    location: 'Chattogram Port Zone',
    industry: 'Export & Import',
    investmentModel: 'Money',
    fundingGoal: 180000,
    raisedAmount: 95000,
    expectedMarginPercent: 19.0,
    ubaPlatformFeePercent: 2.5,
    auditStatus: 'Verified',
    backgroundCheck: 'Completed',
    legalCompliance: 'Completed',
    ongoingAudit: 'Completed',
    shortTagline: 'Verified container consolidation for jute packaging and artisanal ceramics.',
    description:
      'PortLine executes letter-of-credit backed export shipments to European eco-packaging wholesalers. Investment expands working capital capacity for confirmed Q1/Q2 purchase orders with 60-day turnaround cycles.',
    monitoringTerms:
      'Bank LC verification per shipment, customs bill-of-lading archival, and automated escrow repayment upon buyer settlement.',
    establishedYear: 2021,
    certificateId: 'UBA-AUD-2026-0165',
    featured: false,
    createdAt: '2026-10-10T10:00:00.000Z',
  },
  {
    id: 'uba-trv-06',
    name: 'Atlas Horizon Eco-Expeditions',
    ownerName: 'Sadia Afrin',
    ownerEmail: 'sadia@atlashorizon.example',
    location: 'Coxs Bazar & Hill Tracts',
    industry: 'Travel Agency',
    investmentModel: 'Idea',
    fundingGoal: 45000,
    raisedAmount: 18000,
    expectedMarginPercent: 15.5,
    ubaPlatformFeePercent: 2.5,
    auditStatus: 'Pending',
    backgroundCheck: 'Completed',
    legalCompliance: 'In Progress',
    ongoingAudit: 'Pending',
    shortTagline: 'Curated corporate retreats and sustainable coastal eco-tour packages.',
    description:
      'Atlas Horizon seeks strategic hospitality operators, digital booking architects, and fleet partners under UBA Idea & Revenue-Share partnerships to scale sustainable inbound corporate travel experiences.',
    monitoringTerms:
      'Licensing compliance review in final check; partner milestone deliverables tracked bi-monthly by UBA Compliance Desk.',
    establishedYear: 2025,
    certificateId: 'UBA-AUD-2026-0248',
    featured: false,
    createdAt: '2026-10-18T16:45:00.000Z',
  },
];

export const SEED_APPLICATIONS: InvestorApplication[] = [
  {
    id: 'app-1001',
    businessId: 'uba-agro-01',
    businessName: 'AgroShift Hydroponics & Cold Chain',
    investorName: 'Mahmudul Haque',
    investorEmail: 'm.haque@capitalgroup.example',
    investmentType: 'Money',
    amount: 24000,
    ideaPitch: 'Capital tranche for solar cold-room commissioning.',
    status: 'Approved',
    submittedAt: '2026-10-12T10:15:00.000Z',
  },
  {
    id: 'app-1002',
    businessId: 'uba-rest-02',
    businessName: 'The Copper Hearth Kitchen',
    investorName: 'Rasheda Karim',
    investorEmail: 'rasheda@horizonvc.example',
    investmentType: 'Money',
    amount: 15000,
    ideaPitch: 'Working capital commitment for Banani dining hall equipment.',
    status: 'Committed',
    submittedAt: '2026-10-19T14:40:00.000Z',
  },
  {
    id: 'app-1003',
    businessId: 'uba-org-04',
    businessName: 'PureRoot Organic Provisions',
    investorName: 'Tanvir Ahmed',
    investorEmail: 'tanvir@supplychainpro.example',
    investmentType: 'Idea+Money',
    amount: 10000,
    ideaPitch: 'Retail supermarket onboarding across 22 Dhaka outlets plus seed packaging capital.',
    status: 'Under Review',
    submittedAt: '2026-11-01T09:25:00.000Z',
  },
];

export function getStoredBusinesses(): Business[] {
  try {
    const raw = localStorage.getItem(BUSINESSES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BUSINESSES_STORAGE_KEY, JSON.stringify(SEED_BUSINESSES));
      return SEED_BUSINESSES;
    }
    const parsed = JSON.parse(raw) as Business[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(BUSINESSES_STORAGE_KEY, JSON.stringify(SEED_BUSINESSES));
      return SEED_BUSINESSES;
    }
    return parsed;
  } catch {
    return SEED_BUSINESSES;
  }
}

export function saveStoredBusinesses(businesses: Business[]): void {
  try {
    localStorage.setItem(BUSINESSES_STORAGE_KEY, JSON.stringify(businesses));
  } catch {
    // Ignore storage quota errors in restricted sandboxes
  }
}

export function getStoredApplications(): InvestorApplication[] {
  try {
    const raw = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(SEED_APPLICATIONS));
      return SEED_APPLICATIONS;
    }
    const parsed = JSON.parse(raw) as InvestorApplication[];
    return Array.isArray(parsed) ? parsed : SEED_APPLICATIONS;
  } catch {
    return SEED_APPLICATIONS;
  }
}

export function saveStoredApplications(applications: InvestorApplication[]): void {
  try {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));
  } catch {
    // Ignore storage quota errors
  }
}

export function resetDemoStorage(): {
  businesses: Business[];
  applications: InvestorApplication[];
} {
  saveStoredBusinesses(SEED_BUSINESSES);
  saveStoredApplications(SEED_APPLICATIONS);
  return {
    businesses: SEED_BUSINESSES,
    applications: SEED_APPLICATIONS,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
