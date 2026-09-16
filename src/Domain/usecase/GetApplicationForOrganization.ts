import type { ApplicationRepository } from "../repository/applicationRepository.js"
import { Status, type ApplicationInputFields, type OrgApplicationQuery } from "../enitites/Application.js"
import { MongoAppRepo } from "../../Data/repository/MongoAppRepo.js"


export class getApplicationForOrganization {
    private applicationRepository: ApplicationRepository
    constructor(applicationRepository: ApplicationRepository) {
        this.applicationRepository = applicationRepository
    }

    async execute(app: OrgApplicationQuery) {

        const Application = await this.applicationRepository.getApplication(
            app.orgid,
        )
        if (!Application || Application.length === 0) {
            return {
                message: "no applications"
            }
        }

        return {
            applications: Application
        }
    }
}

const applicationRepository = new MongoAppRepo();

export const getapplication = new getApplicationForOrganization(applicationRepository);