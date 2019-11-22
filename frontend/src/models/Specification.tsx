export type SpecRequirement = {
    description: string,
    orderNumber: number
}

export type SpecificationModel = {
    id: number,
    slug: string,
    title: string,
    audience: string,
    intendedUse: string,
    functionalRequirements: SpecRequirement[],
    nonFunctionalRequirements: SpecRequirement[],
    createdAt: Date,
    lastModified: Date
}

export type DetailedSpecification = {
    id: number,
    slug: string,
    title: string,
    audience: string,
    intendedUse: string,
    functionalRequirements: string[],
    nonFunctionalRequirements: string[],
    createdAt: Date,
    lastModified: Date,
    userDetails: {
        username: string,
        pictureUrl: string
    }
}

export type ShortenedSpecificationModel = {
    id: number,
    title: string,
    slug: string,
    createdAt: Date,
    lastModified: Date
}

export default SpecificationModel;