import { Product } from './product.model';
import { Table, Column, Model, HasMany} from 'sequelize-typescript';

@Table({timestamps: false, tableName:'category'})
export class Category extends Model {

    @Column
    name!: string;

    @HasMany(() => Product)
    products!: Product[];

}