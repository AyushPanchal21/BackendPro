import type { OrganizationRepository } from "../repository/organizationRepository.js";
import bcrypt from "bcrypt"
import { MongoOrgRepo } from "../../Data/repository/MongoOrgRepo.js";

export class LoginOrg{
    private OrganizationRepository:OrganizationRepository;
    constructor(OrganizationRepository:OrganizationRepository){
        this.OrganizationRepository=OrganizationRepository;
    }
    async execute(email:string,password:string){
        const user = await this.OrganizationRepository.findByEmail(email)
        if(!user){
            return {
                status:false,
                message:"org not found!",
            }
        }
        else{
            const hash = user.password;
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

const orgRepo = new MongoOrgRepo()
export const loginOrg = new LoginOrg(orgRepo);