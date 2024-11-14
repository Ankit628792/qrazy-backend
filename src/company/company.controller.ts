import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { ApiRoute } from '@common/decorator/swagger.decorator';
import { AuthRequest } from 'src/types/global';
import { UpdateCompanyDTO } from './dto/update-category.dto';

@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService,
    ) { }

    @Post()
    @ApiRoute({
        summary: 'Onboard Company',
        status: 201,
        description: 'Company details added successfully',
    })
    addCompany(@Body() body: CreateCompanyDTO, @Req() request: AuthRequest) {
        return this.companyService.create(request.id, body);
    }

    @Get()
    @ApiRoute({
        summary: 'Get Admin Company',
        status: 200,
        description: 'Company details retrieved successfully'
    })
    getCompanyDetails(@Req() request: AuthRequest) {
        return this.companyService.adminCompany(request.id);
    }

    @Patch()
    @ApiRoute({
        summary: 'Update Company',
        status: 200,
        description: 'Company details updated successfully'
    })
    updateCompany(@Body() body: UpdateCompanyDTO, @Req() request: AuthRequest) {
        return this.companyService.update(request.id, body);
    }

}
