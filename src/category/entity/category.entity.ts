import { BaseEntity } from "@common/entity/base.entity";
import { Exclude } from "class-transformer";
import { Column, Entity } from "typeorm";

@Entity({ name: "categories" })
export class Category extends BaseEntity {

    @Column({ name: "name", type: "varchar" })
    name: string;

    @Column({ name: "description", type: "text", nullable: true })
    description?: string;

    @Exclude()
    @Column({ name: "created_by", type: "uuid" })
    createdBy: string;

    @Exclude()
    @Column({ name: "is_private", type: "boolean", default: false })
    isPrivate: boolean;

}