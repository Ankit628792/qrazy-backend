import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Query, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthRequest } from 'src/types/global';
import { CreateProductDTO, UpdateProductDTO } from './dto/product.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiRoute } from '@common/decorator/swagger.decorator';

// catId = 513794f8-28dd-4272-b6e9-3bc4a4d71f64
// cId = 59ef0eb8-6bee-4c7b-81b0-85379d5658e4
// pId = 62696bcb-23ba-4103-80df-5ed758ae68b7

@ApiBearerAuth()
@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) { }

    @Post("manage")
    @HttpCode(HttpStatus.OK)
    @ApiRoute({
        summary: 'Manage Product',
        status: 200,
        description: 'Product drafted/created/updated successfully'
    })
    async manageProduct(@Req() request: AuthRequest, @Body() body: CreateProductDTO | UpdateProductDTO) {
        const isProduct = body.id ? await this.productService.findById(body.id) : null;

        let data;
        if (isProduct) {
            data = await this.productService.update(request.id, body as UpdateProductDTO)
        }
        else {
            data = await this.productService.create(request.id, body as CreateProductDTO);
        }
        return {
            message: `Product ${body.draft ? 'drafted' : isProduct ? 'updated' : 'created'} successfully`,
            data,
        }
    }

    @Get()
    @ApiRoute({
        summary: 'Get Minified Products',
        status: 200,
        description: 'Products retrieved successfully'
    })
    async getMinifiedProducts(@Req() request: AuthRequest) {
        const data = await this.productService.companyProducts(request.id);
        return {
            data,
            message: 'Products retrieved successfully',
        }
    }

    @Get("list")
    @ApiRoute({
        summary: 'Get All Products',
        status: 200,
        description: 'Products retrieved successfully'
    })
    async getAllProducts(@Req() request: AuthRequest) {
        const data = await this.productService.companyProducts(request.id, false)
        return {
            data,
            message: 'Products retrieved successfully',
        }
    }

    @Get(':id')
    @ApiRoute({
        summary: 'Get Product By ID',
        status: 200,
        description: 'Product retrieved successfully'
    })
    async getProductById(@Param('id') id: string) {
        const data = await this.productService.findById(id);
        if (!data) {
            throw new NotFoundException('Product not found');
        }
        return {
            data,
            message: 'Product retrieved successfully',
        }
    }

    @Delete(':id')
    @ApiRoute({
        summary: 'Remove Product By ID',
        status: 200,
        description: 'Product removed successfully'
    })
    async removeProduct(@Param('id') id: string) {

        return {
            id: await this.productService.remove(id),
            message: 'Product removed successfully',
        }
    }

}
