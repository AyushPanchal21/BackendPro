import type{Project} from "../enitites/Project.js"

export interface ProjectRepository{
    findProject(orgid: String,proname:String):Promise< Project | null>
    createProject(pro:Project):Promise<Project>
}