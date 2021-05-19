import { Table, Column, Model } from "sequelize-typescript";

@Table({ timestamps: false })
export class Product extends Model {
  @Column
  name: string;

  @Column
  url_image: string;

  @Column
  price: number;

  @Column
  discount: number;

  constructor() {
      super();
      this.name = '';
      this.url_image = '';
      this.price = 0;
      this.discount = 0;

  }
}
