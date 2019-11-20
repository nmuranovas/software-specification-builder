import { ShortenedSpecificationModel } from "../../models/Specification";

export type PaginatedSpecificationResponse = {
    shortenedSpecifications: ShortenedSpecificationModel[],
    totalPageCount: number
}