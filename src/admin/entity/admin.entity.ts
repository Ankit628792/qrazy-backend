import { Exclude } from "class-transformer";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "@common/entity/base.entity";

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

    @Column({ type: "uuid", nullable: true })
    company: string;

    @Column({ type: "boolean", default: false })
    verified: boolean;

}