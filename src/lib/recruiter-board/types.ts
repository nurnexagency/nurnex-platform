export type AgencyProfile = {
  companyName: string;
  email: string;
  employeeCount: number;
  focusArea: string;
  address: string;
  weeklyJobLimit: number;
  agreementAcceptedAt: string; // ISO
};

export type BoardMember = {
  id: string;
  firstName: string;
  lastName: string;
  description: string;
};

export type Assignment = {
  id: string;
  memberId: string;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
};

export type ResultMetrics = {
  hires: number;
  interviews: number;
  feesPaid: number;
};

export type CandidateComment = {
  id: string;
  text: string;
  author: string;
  createdAt: string;
  assignmentId?: string;
};

export type RecruiterBoardData = {
  agency: AgencyProfile | null;
  members: BoardMember[];
  assignments: Assignment[];
  metrics: ResultMetrics;
  comments: CandidateComment[];
};

export const emptyBoard = (): RecruiterBoardData => ({
  agency: null,
  members: [],
  assignments: [],
  metrics: { hires: 0, interviews: 0, feesPaid: 0 },
  comments: [],
});
