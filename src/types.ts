export type DisbursementStatus = 'Draft' | 'Submitted' | 'Verified' | 'Audited';

export interface DisbursementRecord {
  id: string;
  disbursementDate: string;
  loanId: string;
  status: DisbursementStatus;
  applicantName: string;
  bankName: string;
  sanctionedAmt: number;
  verifiedAmt: number | null; // null represents '--'
  referralPct: number;
  creditExecutive: {
    name: string;
    avatar: string;
  };
  bankExecutive: {
    name: string;
    avatar: string;
  };
  notes?: string;
  createdAt?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  avatar: string;
  action: string;
  targetLoanId: string;
  details: string;
}

export type TableColumnId = 
  | 'disbursementDate'
  | 'loanId'
  | 'status'
  | 'applicantName'
  | 'bankName'
  | 'sanctionedAmt'
  | 'verifiedAmt'
  | 'referralPct'
  | 'creditExecutive'
  | 'bankExecutive';

export interface ColumnConfig {
  id: TableColumnId;
  label: string;
  sortable: boolean;
  filterable: boolean;
  visible: boolean;
}
