import { QR_STATUS } from "@app/types/enum";
import { Product } from "@product/entity/product.entity";
import { Order } from "src/order/entity/order.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity({ name: "qrs" })
export class QR {
    @OneToOne(() => Order, (o: Order) => o.orderId)
    @Column({ name: "order_id", type: "varchar" })
    orderId: string;

    @OneToOne(() => Product, (p: Product) => p.id)
    @Column({ name: "product_id", type: "uuid" })
    productId: string;

    @Column({ name: "code", type: "varchar", length: 100 })
    code: string;

    @Column({ name: "expiry_date", type: "timestamp" })
    expiryDate: Date;

    @Column({ name: "reward", type: "decimal", precision: 10, scale: 2 })
    reward: number;

    @Column({ name: "status", type: "enum", enum: QR_STATUS, default: QR_STATUS.ACTIVE })
    status: QR_STATUS;

    @Column({ name: "claimed_by", type: "uuid", nullable: true })
    claimedBy: string;

}