import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDTO, ResponseCategoryDTO, UpdateCategoryDTO } from './dto/category.dto';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) { }

    async create(data: CreateCategoryDTO) {
        const category = this.categoryRepository.create(data)
        return instanceToPlain(await this.categoryRepository.save(category));
    }

    async findAll() {
        return instanceToPlain(await this.categoryRepository.find());
    }

    async findById(id: string) {
        return this.categoryRepository.findOne({ where: { id } })
    }

    async find(data: {
        id?: string;
        name?: string;
        createdBy?: string;
        private?: boolean;
    }) {
        return this.categoryRepository.find({ where: data });
    }

    async updateCategory(id: string, data: UpdateCategoryDTO) {
        const category = await this.findById(id);
        if (!category) {
            throw new BadRequestException('Category not found');
        }
        const updateCategory = await this.categoryRepository.save({ ...category, ...data });
        return instanceToPlain(updateCategory)
    }

    async removeCategory(id: string) {
        const category = await this.findById(id);
        if (!category) {
            throw new BadRequestException('Category not found')
        }
        const result = await this.categoryRepository.delete(id)
        if (!result.affected) {
            throw new BadRequestException('Unable to remove category')
        }
        return {
            message: 'Category removed successfully',
            id: category.id
        }
    }


}
