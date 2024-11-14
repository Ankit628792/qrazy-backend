import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { UpdateCompanyDTO } from './dto/update-category.dto';
import { AdminService } from '@admin/admin.service';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,

        private readonly adminService: AdminService,
    ) { }

    async create(adminId: string, data: CreateCompanyDTO) {
        const admin = await this.adminService.findById(adminId);

        if (!admin) {
            throw new BadRequestException('Admin not found');
        }
        if (!admin.verified) {
            throw new UnauthorizedException('Admin not verified');
        }
        if (admin.company) {
            throw new BadRequestException('Admin already has a company');
        }

        const company = this.companyRepository.create(data);
        const savedCompany = await this.companyRepository.save(company);
        if (savedCompany.id) {
            admin.company = company.id;
            await this.adminService.update(admin.id, { company: company.id })
        }

        return {
            message: 'Company detailed added successfully',
            id: savedCompany.id
        }
    }

    findById(id: string) {
        return this.companyRepository.findOne({ where: { id } });
    }

    findBy(data: { id?: string, name?: string, gstNo?: string }) {
        return this.companyRepository.findOne({ where: data });
    }

    findAll() {
        return this.companyRepository.find();
    }

    async adminCompany(id: string) {
        const admin = await this.adminService.findById(id);
        if (!admin) {
            throw new BadRequestException('Admin not found');
        }
        if (!admin.company) {
            throw new BadRequestException('Admin does not have a company');
        }
        return this.findById(admin.company);
    }

    async update(adminId: string, data: UpdateCompanyDTO) {
        const admin = await this.adminService.findById(adminId);
        if (!admin) {
            throw new BadRequestException('Company not found');
        }
        const company = await this.findById(admin.company);
        if (admin.company !== company.id) {
            throw new BadRequestException('Permission Denied');
        }
        const updateCompany = await this.companyRepository.save({ ...company, ...data });
        return {
            message: 'Company updated successfully',
            ...updateCompany
        }
    }

    async remove(id: string) {
        const company = await this.findById(id);
        if (!company) {
            throw new BadRequestException('Company not found');
        }
        const result = await this.companyRepository.delete(id);
        if (!result.affected) {
            throw new BadRequestException('Unable to remove company');
        }
        return {
            message: 'Company removed successfully',
            id: company.id
        };
    }

}
