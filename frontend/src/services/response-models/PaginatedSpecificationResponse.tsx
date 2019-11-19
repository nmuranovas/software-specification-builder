import SpecificationModel from "../../models/Specification";

export type PaginatedSpecificationResponse = {
    shortenedSpecifications: SpecificationModel[],
    totalPageCount: number
}