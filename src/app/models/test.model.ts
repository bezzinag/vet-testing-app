
export interface Test {
  id: number;
  petName: string;
  petType: string;
  ownerName: string;
  locality: string;
  testType: string;
  status: string;
  result: string;
  dateSubmitted: string; // ISO format recommended, e.g. "2025-06-14T10:30:00Z"
}
