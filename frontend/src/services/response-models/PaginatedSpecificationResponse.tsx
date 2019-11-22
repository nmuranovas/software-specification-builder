import { ShortenedSpecificationModel } from "../../models/Specification";

export type PaginatedSpecificationResponse = {
    data: ShortenedSpecificationModel[],
    page: number,
    pageSize: number,
    totalItemCount: number
}