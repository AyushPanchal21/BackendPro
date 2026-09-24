import type {Task} from "../enitites/Task.js"
export interface TaskRepository{
    findtask(projectId:String,title:String):Promise<Task | null>
    createTask(task:Task):Promise<Task | null>
    addMemberToTask(taskid:String,members:String[]):Promise<Task | null>
    deleteMember(taskid:String,userid:String):Promise<Task | null>
}