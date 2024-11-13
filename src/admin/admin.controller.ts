import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { ValidIdPipe } from "src/common/pipe/valid-id.pipe";
import { UpdateAdminDTO } from "./dto/update-admin.dto";
import { AdminService } from "./admin.service";

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
    ) { }

    @Get("/")
    async getAdmins() {
        return this.adminService.findAll();

    }

    @Get(":id")
    async getAdmin(@Param("id", ValidIdPipe) id: string) {
        return this.adminService.findById(id);
    }

    @Patch(":id")
    async updateAdmin(@Param("id", ValidIdPipe) id: string, @Body() body: UpdateAdminDTO) {
        return this.adminService.update(id, body);
    }

    @Delete(":id")
    async removeAdmin(@Param("id", ValidIdPipe) id: string) {
        return this.adminService.removeAdmin(id);
    }

}