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

export type ShortenedSpecificationModel = {
    id: number,
    title: string,
    slug: string,
    createdAt: Date
}

export default SpecificationModel;