export default interface PaginatedResponse<T> {
    data: T;
    page: number,
    pageSize: number,
    totalItemCount: number
}