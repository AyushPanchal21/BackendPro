import type { ApplicationRepository } from "../repository/applicationRepository.js"
import { Status, type ApplicationInputFields, type ApplicationQuery } from "../enitites/Application.js"
import { MongoAppRepo } from "../../Data/repository/MongoAppRepo.js"


export class getApplication {
    private applicationRepository: ApplicationRepository
    constructor(applicationRepository: ApplicationRepository) {
        this.applicationRepository = applicationRepository
    }

    async execute(app: ApplicationQuery) {

        const existingApplication = await this.applicationRepository.checkApplication(
                app.userid,
                app.orgid
            )

        if (existingApplication) {
            return {
                status: false,
                message: "User has already applied"
            }
        }

        return {
            status: true,
            message: "User has not applied"
        }
    }
}

const applicationRepository = new MongoAppRepo();

export const checkApplication = new getApplication(applicationRepository);