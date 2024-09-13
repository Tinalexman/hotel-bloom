export type tLog = {
  id: string;
  created_at: string;
  username: string;
  action: string;
  organization: string;
};

export type tLogData = {
  total: number;
  limit: number;
  logs: tLog[];
};
