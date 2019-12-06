export type SpecUploadRequestModel = {
    title: string,
    audience: string,
    intendedUse: string,
    functionalRequirements: string[],
    nonFunctionalRequirements: string[]
}

export const DefaultSpecUploadRequestModel: SpecUploadRequestModel = {
    title: "",
    audience: "",
    intendedUse: "",
    functionalRequirements: [""],
    nonFunctionalRequirements: [""]
}