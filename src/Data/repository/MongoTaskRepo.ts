import type { Task } from "../../Domain/enitites/Task.js"
import type { TaskRepository } from "../../Domain/repository/taskRepository.js"
import { TaskModel } from "../Models/TaskSchema.js"

export class MongoTaskRepo implements TaskRepository {
    async findtask(projectId: string, title: string) {
        return TaskModel.findOne({ projectId, title })
    }

    async createTask(task: Task): Promise<Task> {
        const newTask = new TaskModel(task)
        return await newTask.save()
    }

    async addMemberToTask(taskid: String, members: String[]) {
    const result = await TaskModel.findByIdAndUpdate(
        taskid,
        {
            $push: {
                taskMem: {
                    $each: members
                }
            }
        },
        {
            returnDocument: "after"
        }
    )
    return result
}

    async deleteMember(taskid: string, userid: string) {
        return TaskModel.findByIdAndUpdate(
            taskid,
            {
                $pull: {
                    taskMem: {
                        userId: userid
                    }
                }
            },
            { returnDocument: "after" }
        )
    }
    
}