import SpecificationModel from "../models/Specification"
import Axios from "axios";
import { PaginatedSpecificationResponse } from "./response-models/PaginatedSpecificationResponse";
import { OrderingOptions } from "../models/OrderingOptions";

export const fetchSpecData = async (specificationId: number) => {
    const { data } = await Axios.get(`/api/specification/${specificationId}`)
    return data as SpecificationModel;
}

export const fetchPaginatedSpecifications = async (page: number, itemCount: number, ordering: OrderingOptions) => {
    const { data } = await Axios.get(`/api/specification`, {
        params: {
            pageNumber: page,
            itemCount: itemCount,
            sortByTerm: ordering
        }
    });
    return (data as PaginatedSpecificationResponse);
}

export const fetchPaginatedSpecificationsWithSearch = async (searchText: string, page: number, itemCount: number, ordering: OrderingOptions) => {
    const { data } = await Axios.get(`/api/specification/search`, {
        params: {
            searchText: searchText,
            pageNumber: page,
            itemCount: itemCount,
            sortByTerm: ordering
        }
    });
    return (data as PaginatedSpecificationResponse);
}