import {OrganizationModel} from "../Models/OrganizationSchema.js"
import type{ OrganizationRepository } from "../../Domain/repository/organizationRepository.js";
import type { Organization } from "../../Domain/enitites/Organization.js";

export class MongoOrgRepo implements OrganizationRepository{
    async findByEmail(email: string){
        return OrganizationModel.findOne({email})
    }
    async createOrg(org: Organization) {
        const newOrg = new OrganizationModel(org)
        return await newOrg.save()
    }
}