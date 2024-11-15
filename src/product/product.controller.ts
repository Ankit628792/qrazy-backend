import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Query, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthRequest } from 'src/types/global';
import { CreateProductDTO } from './dto/product.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiRoute } from '@common/decorator/swagger.decorator';

// catId = 513794f8-28dd-4272-b6e9-3bc4a4d71f64
// cId = 59ef0eb8-6bee-4c7b-81b0-85379d5658e4

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
    async manageProduct(@Req() request: AuthRequest, @Body() data: CreateProductDTO) {
        const isProduct = data.id ? await this.productService.findById(data.id) : null;

        let product;
        console.log({ data })
        if (isProduct) {
            product = await this.productService.update(request.id, data)
        }
        else {
            product = await this.productService.create(request.id, data);
        }
        return {
            message: `Product ${data.draft ? 'drafted' : isProduct ? 'updated' : 'created'} successfully`,
            product,
        }
    }

    @Get()
    @ApiRoute({
        summary: 'Get Minified Products',
        status: 200,
        description: 'Products retrieved successfully'
    })
    async getMinifiedProducts(@Req() request: AuthRequest) {
        const products = await this.productService.companyProducts(request.id);
        return {
            products,
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
        const products = await this.productService.companyProducts(request.id)
        return {
            products,
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
        const product = await this.productService.findById(id);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        return {
            product,
            message: 'Product retrieved successfully',
        }
    }

}
