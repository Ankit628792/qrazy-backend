import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAdminDTO } from "./dto/create-admin.dto";
import { Repository } from "typeorm";
import { Admin } from "./entity/admin.entity";
import { hashPassword } from "@common/util/crypto.util";
import { ResponseAdminDTO } from "./dto/response-admin.dto";
import { instanceToPlain } from "class-transformer";
import { UpdateAdminDTO } from "./dto/update-admin.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
    ) { }

    async findByEmail(email: string) {
        return this.adminRepository.findOne({ where: { email } })
    }

    async findAll() {
        const admins = await this.adminRepository.find()
        return instanceToPlain(admins);
    }

    async findById(id: string): Promise<ResponseAdminDTO | null> {
        const admin = await this.adminRepository.findOne({ where: { id } })
        if (!admin) {
            return null;
        }
        return instanceToPlain(admin) as ResponseAdminDTO
    }

    async findOne(data: {
        email?: string;
        name?: string;
        id?: string;
    }) {
        return await this.adminRepository.findOne({ where: data })
    }

    async create(data: CreateAdminDTO) {
        const admin = await this.findByEmail(data.email);
        if (admin) {
            throw new BadRequestException('Email already exists')
        }
        const hashedPassword = await hashPassword(data.password);
        const newAdmin = this.adminRepository.create({
            ...data,
            password: hashedPassword,
        })
        const savedAdmin = await this.adminRepository.save(newAdmin)
        return instanceToPlain(savedAdmin)
    }

    async update(id: string, data: UpdateAdminDTO) {
        const admin = await this.findById(id)
        if (!admin) {
            throw new BadRequestException('Admin not found')
        }
        let updatedAdmin = data;
        if (data.password) {
            updatedAdmin.password = await hashPassword(data.password)
        }
        const savedAdmin = await this.adminRepository.save({ ...admin, ...updatedAdmin })
        return instanceToPlain(savedAdmin)
    }

    async removeAdmin(id: string) {
        const admin = await this.findById(id)
        if (!admin) {
            throw new BadRequestException('Admin not found')
        }
        const result = await this.adminRepository.delete(id)
        if (!result.affected) {
            throw new BadRequestException('Unable to remove admin')
        }
        return {
            message: 'Admin deleted successfully',
            id: admin.id
        }
    }

}