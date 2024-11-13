import { Exclude } from "class-transformer";
import { BaseEntity } from "src/common/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "admins" })
export class Admin extends BaseEntity {

    @Column({ type: "varchar", length: 255 })
    firstName: string;

    @Column({ type: "varchar", length: 255 })
    lastName: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;

    @Exclude()
    @Column({ type: "varchar", length: 255 })
    password: string;

}