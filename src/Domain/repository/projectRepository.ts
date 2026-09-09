import type{Project} from "../enitites/Project.js"

export interface ProjectRepository{
    findProjectId(id:string):Promise< Project | null>
    createProject(pro:Project):Promise<Project>
}