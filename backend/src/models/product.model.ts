import { Category } from './category.model';
import { Table, Column, Model, BelongsTo, ForeignKey } from "sequelize-typescript";

@Table({ timestamps: false, tableName: 'product' })
export class Product extends Model {
  @Column
  name!: string;

  @Column
  url_image!: string;

  @Column
  price!: number;

  @Column
  discount!: number;

  @ForeignKey(() => Category)
  @Column
  category!: number;

  @BelongsTo(() => Category)
  categoryR!: Category;

  
}
