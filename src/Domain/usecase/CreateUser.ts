import type { UserRepository } from "../repository/userRepository.js";
import bcrypt from "bcrypt"
import { MongoUserRepo } from "../../Data/repository/MongoUserRepo.js";

export class CreateUser {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    async execute(name:string,email: string, password: string) {
        const user = await this.userRepository.findByEmail(email)
        if (user) {
            return {
                status: false,
                message: "user exists!",
            }
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = await this.userRepository.createUser({
                name,
                email,
                password: hash,
                createdAt: new Date()
            })
            return {
                status: true,
                message: "user profile created",
                user:newUser
            }
        }
    }
}

const userRepository = new MongoUserRepo();

export const createUser = new CreateUser(userRepository);