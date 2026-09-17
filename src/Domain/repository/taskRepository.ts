import type {Task} from "../enitites/Task.js"
export interface TaskRepository{
    findtask(projectId:String,title:String):Promise<Task | null>
    createTask(task:Task):Promise<Task | null>
}