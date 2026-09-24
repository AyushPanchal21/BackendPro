import type { OrganizationRepository } from "../repository/organizationRepository.js";
import { MongoOrgRepo } from "../../Data/repository/MongoOrgRepo.js";

export class CheckOrgOwner {

    private organizationRepository: OrganizationRepository;

    constructor(organizationRepository: OrganizationRepository) {
        this.organizationRepository = organizationRepository;
    }

    async execute(orgId: string) {

        const org = await this.organizationRepository.findById(orgId);

        if (!org) {
            return {
                status: false,
                message: "Organization not found"
            };
        }

        if (!org.orgOwner) {
            return {
                status: false,
                message: "Not an organization owner"
            };
        }

        return {
            status: true
        };
    }
}

const organizationRepository = new MongoOrgRepo();

export const checkorgowner = new CheckOrgOwner(organizationRepository);