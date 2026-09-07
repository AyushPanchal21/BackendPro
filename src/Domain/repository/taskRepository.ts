import type {Task} from "../enitites/Task.js"
export interface TaskRepository{
    findById(id:string):Promise<Task | null>
}