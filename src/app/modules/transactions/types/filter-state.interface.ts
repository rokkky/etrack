export interface IFilterState {
  sortOptions: ISortOptions;
  pageSize: number;
  pageIndex: number;
  period: string;
  searchReq: string;
}

export interface ISortOptions {
  active?: string;
  direction?: string;
}
