import { Admin } from "@admin/entity/admin.entity";
import { ORDER_STATUS } from "@app/types/enum";
import { BaseEntity } from "@common/entity/base.entity";
import { Column, Entity, OneToOne } from "typeorm";


@Entity({ name: "orders" })
export class Order extends BaseEntity {
    @Column({ name: "amount", type: "decimal", precision: 10, scale: 2, })
    amount: number;

    @Column({ name: "payment_method", type: "varchar" })
    paymentMethod: string;

    @Column({ name: "status", type: "enum", default: ORDER_STATUS.PENDING, enum: ORDER_STATUS })
    status: ORDER_STATUS;

    @OneToOne(() => Admin, (a: Admin) => a.id)
    @Column({ name: "admin", type: "uuid" })
    admin: string;

    @Column({ name: "order_id", type: "varchar" })
    orderId: string;

    @Column({ name: "trx_id", type: "varchar" })
    trxId: string;

    @Column({ name: "discount_rate", type: "integer", default: 1 })
    discount: number;

    @Column({ name: "tax_rate", type: "integer", default: 1 })
    tax: number

    @Column({ name: "sub_total", type: "decimal", precision: 10, scale: 2, default: 0 })
    subTotal: number;

    @Column({ name: "total", type: "decimal", precision: 10, scale: 2, default: 0 })
    total: number;

    @Column({ name: "payment_info", type: "jsonb", default: {} })
    paymentInfo: Record<string, any>;

}