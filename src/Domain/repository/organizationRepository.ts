import type{Organization} from "../enitites/Organization.js"

export interface OrganizationRepository{
    findByEmail(email:string):Promise<Organization | null>
}