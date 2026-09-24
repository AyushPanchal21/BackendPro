import type{ UserRepository } from "../repository/userRepository.js";
import bcrypt from "bcrypt"
import { MongoUserRepo } from "../../Data/repository/MongoUserRepo.js";

export class LoginUser{
    private userRepository:UserRepository;
    constructor(userRepository:UserRepository){
        this.userRepository=userRepository;
    }
    async execute(email:string,password:string){
        const user = await this.userRepository.findByEmail(email)
        if(!user){
            return {
                status:false,
                message:"user not found!",
            }
        }
        else{
            const hash = user.password;
            console.log(hash);
            console.log(password);
            const ismatch = await bcrypt.compare(password, hash);
            if(!ismatch){
                return{
                    status:false,
                    message:"incorrect password or email"
                }
            }
            return{
                status:true,
                user:user
            }
        }
    }
}

const userRepo = new MongoUserRepo()
export const loginUser = new LoginUser(userRepo);