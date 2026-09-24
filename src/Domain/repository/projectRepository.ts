import type { ProjectionType } from "mongoose"
import type{Project} from "../enitites/Project.js"
import type { User } from "../enitites/User.js"

export interface ProjectRepository{
    findProject(orgid: String,proname:String):Promise<Project | null>
    createProject(pro:Project):Promise<Project>
    addMemberToProject(id:String,members:User[]):Promise<Project | null>
    deleteMember(taskid:String,userid:String):Promise<Project | null>
}