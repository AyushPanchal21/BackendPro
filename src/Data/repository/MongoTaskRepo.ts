import type { Task } from "../../Domain/enitites/Task.js"
import type { TaskRepository } from "../../Domain/repository/taskRepository.js"
import { TaskModel } from "../Models/TaskSchema.js"

export class MongoTaskRepo implements TaskRepository {
    async findtask(projectId: string,title:string) {
        return TaskModel.findOne({ projectId ,title})
    }
    async createTask(task: Task): Promise<Task> {
        const newTask = new TaskModel(task)
        return await newTask.save()
    }
}