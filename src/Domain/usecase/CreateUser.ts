import type { UserRepository } from "../repository/userRepository.js";
import bcrypt from "bcrypt"
import { MongoUserRepo } from "../../Data/repository/MongoUserRepo.js";
import type { InputUserField } from "../enitites/User.js";
import { Role } from "../enitites/User.js";

export class CreateUser {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }
    async execute(user:InputUserField) {
        const usercheck = await this.userRepository.findByEmail(user.email)
        if (usercheck) {
            return {
                status: false,
                message: "user exists!",
            }
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(user.password, salt);
            const newUser = await this.userRepository.createUser({
                name:user.name,
                email:user.email,
                password: hash,
                role:Role.Candidate,
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