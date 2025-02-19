import { Product } from "@product/entity/product.entity";
import { Order } from "src/order/entity/order.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "qr_products" })
export class QRProduct {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Order, (o: Order) => o.orderId)
    @Column({ name: "order_id", type: "varchar" })
    orderId: string;

    @OneToOne(() => Product, (p: Product) => p.id)
    @Column({ name: "product_id", type: "uuid" })
    productId: string;

    @Column({ name: "mrl", type: "decimal", precision: 10, scale: 2 })
    mrl: number;

    @Column({ name: "quantity", type: "bigint", default: 0 })
    quantity: string;

    @Column({ name: "expiry_date", type: "timestamp" })
    expiryDate: Date;

}