import type { OrganizationRepository } from "../repository/organizationRepository.js";
import bcrypt from "bcrypt"
import { MongoOrgRepo } from "../../Data/repository/MongoOrgRepo.js";
import { Status, type InputFieldsForOrganization } from "../enitites/Organization.js";

export class CreateOrg {
    private orgRepository: OrganizationRepository;
    constructor(orgRepository: OrganizationRepository) {
        this.orgRepository = orgRepository;
    }
    async execute(org:InputFieldsForOrganization) {
        const user = await this.orgRepository.findByEmail(org.email)
        if (user) {
            return {
                status: false,
                message: "user exists!",
            }
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(org.password, salt);
            const newUser = await this.orgRepository.createOrg({
                password: hash,
                email : org.email,
                orgName:org.orgName,
                orgOwner:true,
                project:[],
                allMem:[],
                createdAt: new Date(),
                orgstatus: Status.NotSuspended
            })
            return {
                status: true,
                message: "user profile created",
                user:newUser
            }
        }
    }
}

const orgRepository = new MongoOrgRepo();

export const createorg = new CreateOrg(orgRepository);