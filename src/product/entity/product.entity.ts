import { Category } from "@category/entity/category.entity";
import { BaseEntity } from "@common/entity/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: "products" })
export class Product extends BaseEntity {

    @Column({ name: "title", type: "varchar" })
    title: string;

    @Column({ name: "description", type: "text", default: "" })
    description: string;

    @Column({ name: "mrp", type: "decimal", precision: 10, scale: 2, nullable: true })
    mrp: number;

    @Column({ name: "mrl", type: "decimal", precision: 10, scale: 2, nullable: true })
    mrl: number;

    @Column({ name: "links", type: "text", array: true, default: [] })
    links: string[]

    @ManyToOne(() => Category, (c: Category) => c.id)
    @Column({ name: "category", type: "uuid", nullable: true })
    category: string;

    @Column({ name: "image", type: "text" })
    image: string;

    @Column({ name: "thumbnail", type: "text" })
    thumbnail: string;

    @Column({ name: 'images', type: 'text', array: true, default: [] })
    images: string[]

    @Column({ name: "created_by", type: "uuid" })
    createdBy: string;

    @Column({ name: "updated_by", type: "uuid", nullable: true })
    updatedBy: string;

    @Column({ name: "company", type: "uuid", nullable: true })
    company: string;

    @Column({ name: "draft", type: "boolean", default: false })
    draft: boolean;

}