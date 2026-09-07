import type{Project} from "../enitites/Project.js"

export interface ProjectRepository{
    findById(id:string):Promise< Project | null>
}