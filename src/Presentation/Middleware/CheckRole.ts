import type{ UserRepository } from "../../Domain/repository/userRepository.js"
import { MongoUserRepo } from "../../Data/repository/MongoUserRepo.js";

export class CheckRole {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId: string) {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            return {
                status: false,
                message: "User not found"
            };
        }

        return {
            status: true,
            role: user.role
        };
    }
}

const userRepo = new MongoUserRepo();

export const checkrole = new CheckRole(userRepo);