export type IndustryCategory =
  | 'Restaurant'
  | 'Construction Developer'
  | 'Organic Food'
  | 'Export & Import'
  | 'Agriculture'
  | 'Travel Agency';

export type InvestmentModel = 'Idea' | 'Money' | 'Idea+Money';

export type AuditStatus = 'Verified' | 'Pending' | 'Flagged';

export type CheckStatus = 'Completed' | 'In Progress' | 'Pending' | 'Flagged';

export interface Business {
  id: string;
  name: string;
  ownerName: string;
  ownerEmail: string;
  location: string;
  industry: IndustryCategory;
  investmentModel: InvestmentModel;
  fundingGoal: number;
  raisedAmount: number;
  expectedMarginPercent: number;
  ubaPlatformFeePercent: number;
  auditStatus: AuditStatus;
  backgroundCheck: CheckStatus;
  legalCompliance: CheckStatus;
  ongoingAudit: CheckStatus;
  shortTagline: string;
  description: string;
  monitoringTerms: string;
  establishedYear: number;
  certificateId: string;
  featured: boolean;
  createdAt: string;
}

export interface InvestorApplication {
  id: string;
  businessId: string;
  businessName: string;
  investorName: string;
  investorEmail: string;
  investmentType: InvestmentModel;
  amount: number;
  ideaPitch: string;
  status: 'Committed' | 'Under Review' | 'Approved';
  submittedAt: string;
}

export type PageRoute =
  | 'home'
  | 'businesses'
  | 'details'
  | 'invest'
  | 'pitch'
  | 'compliance'
  | 'dashboard';

export const INDUSTRY_CATEGORIES: IndustryCategory[] = [
  'Restaurant',
  'Construction Developer',
  'Organic Food',
  'Export & Import',
  'Agriculture',
  'Travel Agency',
];

export const INVESTMENT_MODELS: InvestmentModel[] = ['Idea', 'Money', 'Idea+Money'];
