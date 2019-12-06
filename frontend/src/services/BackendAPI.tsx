import SpecificationModel, { DetailedSpecification, ShortenedSpecificationModel } from "../models/Specification"
import Axios from "axios";
import { PaginatedSpecificationResponse } from "./response-models/PaginatedSpecificationResponse";
import { OrderingOptions } from "../models/OrderingOptions";
import PaginatedResponse from "./response-models/PaginatedResponse";
import { useAuth0 } from "./react-auth0-spa";

export const fetchSpecData = async (slug: string) => {
    const { data } = await Axios.get(`/api/specification/${slug}`)
    return data as DetailedSpecification;
}

export const fetchPaginatedSpecifications = async (page: number, itemCount: number, ordering: OrderingOptions) => {
    const response = await Axios.get(`/api/specification`, {
        params: {
            pageNumber: page,
            itemCount: itemCount,
            sortByTerm: ordering
        }
    });

    return (response.data as PaginatedResponse<ShortenedSpecificationModel[]>)
}

export const fetchPaginatedSpecificationsWithSearch = async (searchText: string, page: number, itemCount: number, ordering: OrderingOptions) => {
    const response = await Axios.get(`/api/specification/search`, {
        params: {
            searchText: searchText,
            pageNumber: page,
            itemCount: itemCount,
            sortByTerm: ordering
        }
    });

    return (response.data as PaginatedResponse<ShortenedSpecificationModel[]>)
}

export const uploadSpecification = async (jsonData: string, token: string) => {
    if (!jsonData) {
        throw new Error("Specification json data must be specified")
    }
    if (!token) {
        throw new Error("Authorization token must be specified")
    }
    return await Axios({
        method: 'post',
        url: '/api/specification',
        data: jsonData,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export const checkIfSlugIsTaken = async (slug: string, token: string) => {
    return await Axios.get(`/api/slug/exists/${slug}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const generateSlug = async (keyword: string, token: string) => {
    return await Axios.get(`/api/slug/generate/${keyword}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export type SpecificationUpdateModel = {
    audience : string
    intendedUse : string
    functionalRequirements : string[]
    nonFunctionalRequirements : string[]
}

export const putSpecification = async (id: number, model: SpecificationUpdateModel, token: string) => {
    return await Axios.put(`/api/specification/${id}`, model, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const fetchMySpecifications = async (token: string, page: number, itemCount: number, ordering: OrderingOptions) => {
    const response = await Axios.get(`/api/specification/my-specifications`, {
        params: {
            page,
            itemCount,
            ordering
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data as PaginatedResponse<ShortenedSpecificationModel[]>;
}

export const deleteSpecification = async (token: string, id: number) => {
    return await Axios.delete(`/api/specification/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}