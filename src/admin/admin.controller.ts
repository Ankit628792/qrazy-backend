import { Body, Controller, Delete, Get, Param, Patch } from "@nestjs/common";
import { ValidIdPipe } from "src/common/pipe/valid-id.pipe";
import { UpdateAdminDTO } from "./dto/update-admin.dto";
import { AdminService } from "./admin.service";
import { ApiTags } from "@nestjs/swagger";

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
    ) { }


}