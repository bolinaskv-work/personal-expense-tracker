export default interface DashboardPaginationInterface {
  totalPages: number;
  currentPage: number;
  category?: string;
  from?: string;
  to?: string;
}
