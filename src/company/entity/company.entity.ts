import { BaseEntity } from "@common/entity/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "companies" })
export class Company extends BaseEntity {

    @Column({ name: "title", type: "varchar", unique: true })
    title: string;

    @Column({ name: "gst_no", type: "varchar", nullable: true })
    gstNo: string;

    @Column({ name: "pan_no", type: "varchar", nullable: true })
    panNo: string;

    @Column({ name: "logo", type: "varchar" })
    logo: string;

    @Column({ name: "description", type: "text" })
    description: string;

    @Column({ name: "website", type: "text" })
    website: string;

    @Column({ name: "address", type: "text" })
    address: string;

    @Column({ name: "pin_code", type: "varchar" })
    pinCode: string;

    @Column({ name: "country", type: "varchar" })
    country: string;

    @Column({ name: "contact_email", type: "varchar" })
    contactEmail: string;

    @Column({ name: "contact_number", type: "varchar" })
    contactNumber: string;

    @Column({ name: "verified", type: "boolean", default: false })
    verified: boolean;
}