export interface IQueryModel {
  appName: string;
  category: string;
  pageNumber: number;
  pageSize: 25 | 50;
}

type AppRow = {
  appId: string;
  appName: string;
  appSources: string[];
  category: string;
};

export interface IQueryResponse {
  appRows: AppRow[];
  totalCount: number;
}
