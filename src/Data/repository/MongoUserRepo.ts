import type { User } from "../../Domain/enitites/User.js"
import type { UserRepository } from "../../Domain/repository/userRepository.js"
import { UserModel } from "../Models/UserSchema.js"

export class MongoUserRepo implements UserRepository {
    async findByEmail(email: string) {
        return UserModel.findOne({ email })
    }
    async createUser(user: User): Promise<User> {
        const newUser = new UserModel(user)
        return await newUser.save()
    }
    async findById(id: string): Promise<User | null> {
        return await UserModel.findById(id);
    }
}
