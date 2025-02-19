import { Admin } from "@admin/entity/admin.entity";
import { BaseEntity } from "@common/entity/base.entity";
import { Product } from "@product/entity/product.entity";
import { Order } from "src/order/entity/order.entity";
import { QR_Type } from "src/types/global";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { QRProduct } from "./qr-product.entity";

@Entity({ name: "qr_orders" })
export class QROrder extends BaseEntity {

    @OneToOne(() => Order, (o: Order) => o.orderId)
    @Column({ name: "order_id", type: "varchar" })
    orderId: string;

    @Column({ name: "qr_type", type: "enum", enum: QR_Type, default: QR_Type.DIGITAL })
    qrType: QR_Type;

    @Column({ name: "qr_template", type: "uuid" })
    qrTemplate: string;

    @OneToMany(() => QRProduct, (p: QRProduct) => p.id)
    @Column({ name: 'qr_products', type: 'uuid', array: true })
    qrProducts: string[];

    @OneToOne(() => Admin, (a: Admin) => a.id)
    @Column({ name: "admin_id", type: "uuid" })
    adminId: string;


}