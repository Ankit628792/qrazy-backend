import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO, ResponseCategoryDTO, UpdateCategoryDTO } from './dto/category.dto';
import { ApiRoute } from '@common/decorator/swagger.decorator';
import { Public } from '@common/guard/auth.guard';
import { AuthRequest } from 'src/types/global';
import { ApiBearerAuth } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';

@ApiBearerAuth()
@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Post()
    @ApiRoute({
        summary: 'Add a category',
        status: 201,
        description: 'Category added successfully'
    })
    async createCategory(@Body() body: CreateCategoryDTO, @Req() request: AuthRequest) {
        return this.categoryService.create({ ...body, createdBy: request.id });
    }

    @Public()
    @Get()
    @ApiRoute({
        summary: 'Retrieve all categories',
        description: 'Retrieved all categories',
    })
    async findAllCategories() {
        return await this.categoryService.findAll();
    }

    @Public()
    @Get(':id')
    @ApiRoute({
        summary: 'Retrieve a category',
        description: 'Retrieved a category by ID'
    })
    findCategoryById(@Param('id') id: string) {
        return this.categoryService.findById(id);
    }

    @Public()
    @Patch(':id')
    @ApiRoute({
        summary: 'Update category',
        description: 'Category updated successfully'
    })
    updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDTO) {
        return this.categoryService.updateCategory(id, body);
    }

    @Public()
    @Delete(':id')
    @ApiRoute({
        summary: 'Remove a category',
        description: 'Category removed successfully'
    })
    removeCategory(@Param('id') id: string) {
        return this.categoryService.removeCategory(id);
    }



}
