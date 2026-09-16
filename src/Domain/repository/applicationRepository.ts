import type { Application } from "../enitites/Application.js";

export interface ApplicationRepository {
    createApplication(application: Application): Promise<Application>
    checkApplication(userid: string,orgid:string): Promise<Application | null>
}
