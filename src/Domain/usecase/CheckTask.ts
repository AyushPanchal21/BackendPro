import type{ TaskRepository } from "../repository/taskRepository.js";
import type{ TaskQuery } from "../enitites/Task.js";
import { MongoTaskRepo } from "../../Data/repository/MongoTaskRepo.js";

export class CheckTask {
    private taskRepository: TaskRepository
    constructor(taskRepository: TaskRepository) {
        this.taskRepository = taskRepository
    }

    async execute(task: TaskQuery) {

        const existingTask = await this.taskRepository.findtask(
            task.projectId,
            task.title
        )

        if (existingTask) {
            return {
                status: false,
                message: "task already exists"
            }
        }

        return {
            status: true,
        }
    }
}

const taskRepository = new MongoTaskRepo();

export const checktask = new CheckTask(taskRepository);