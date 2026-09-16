import { ApplicationModel } from "../Models/ApplicationSchema.js"
import type { ApplicationRepository } from "../../Domain/repository/applicationRepository.js"
import type { Application } from "../../Domain/enitites/Application.js"

export class MongoAppRepo implements ApplicationRepository {
    async createApplication(application: Application) {
        const newapplication = new ApplicationModel(application)
        return await newapplication.save()
    }

    async checkApplication(userid: string,orgid:string) {
        return await ApplicationModel.findOne({ userid ,orgid})
    }

    async getApplication(orgid:string) {
        return await ApplicationModel.find({orgid})
    }

}
