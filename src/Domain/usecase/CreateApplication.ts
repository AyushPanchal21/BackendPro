import { ApplicationModel } from "../../Data/Models/ApplicationSchema.js"
import type { ApplicationRepository } from "../repository/applicationRepository.js"
import {Status,type ApplicationInputFields,type Application} from "../enitites/Application.js"
import { MongoAppRepo } from "../../Data/repository/MongoAppRepo.js"

export class createApplication{
    private applicationRepository : ApplicationRepository
    constructor(applicationRepository:ApplicationRepository){
        this.applicationRepository = applicationRepository
    }

    async execute(app:ApplicationInputFields){
        
        const newapplication = await this.applicationRepository.createApplication({
            orgid:app.orgid,
            userid:app.userid,
            role:app.role,
            experience:app.experience,
            status:Status.Pending,
        })
        
        return {
                status: true,
                message: "application created",
                user:newapplication
            }
    }
}

const applicationRepository = new MongoAppRepo();

export const createapplication = new createApplication(applicationRepository);