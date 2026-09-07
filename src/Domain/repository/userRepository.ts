import type {User} from "../enitites/User.js"

export interface UserRepository{
    findByEmail(email : string): Promise<User | null>
    createUser(user:User):Promise<User>
}