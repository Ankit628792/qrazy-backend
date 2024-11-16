import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminService } from '@admin/admin.service';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,

        private readonly adminService: AdminService,
    ) { }

    async create(adminId: string, data: CreateProductDTO) {
        const admin = await this.adminService.findById(adminId);
        if (!admin) {
            throw new BadRequestException('Admin not found');
        }
        const product = this.productRepository.create({ ...data, createdBy: adminId, updatedBy: adminId, company: admin.company })
        return this.productRepository.save(product);
    }

    async find(data: {
        id?: string;
        title?: string;
        category?: string;
        company?: string;
    }) {
        return this.productRepository.find({ where: data });
    }

    async findById(id: string | null | undefined) {
        if (!id) {
            return null
        }
        return this.productRepository.findOne({ where: { id } })
    }



    async update(adminId: string, data: UpdateProductDTO) {
        const admin = await this.adminService.findById(adminId);
        if (!admin) {
            throw new BadRequestException('Admin not found');
        }

        const existingProduct = await this.findById(data.id);
        if (!existingProduct) {
            throw new BadRequestException('Product not found');
        }

        if (existingProduct.company !== admin.company) {
            throw new BadRequestException('Permission Denied');
        }

        const updatedProduct = { ...existingProduct, ...data, updatedBy: adminId };
        await this.productRepository.save(updatedProduct);
        return updatedProduct;
    }

    async companyProducts(adminId: string, minified: boolean = true) {
        const admin = await this.adminService.findById(adminId);
        if (!admin) {
            throw new BadRequestException('Admin not found');
        }
        const filter = {
            where: {
                company: admin.company,
                draft: false,
            },
            select: []
        }
        if (minified) {
            filter.where.draft = false;
            filter.select = ['id', 'category', 'description', 'image', 'thumbnail', 'title', 'mrl'];
        }
        else {
            delete filter.where.draft
            delete filter.select
        }
        return this.productRepository.find(filter);
    }

    async remove(id: string) {
        const product = await this.findById(id);
        if (!product) {
            throw new BadRequestException('Product not found');
        }
        const result = await this.productRepository.delete({ id });
        if (!result.affected) {
            throw new BadRequestException('Unable to remove category')
        }
        return product.id
    }

}
