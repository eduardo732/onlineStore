import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { Request, Response } from 'express';

export const findAll = async (req: Request, res: Response): Promise<Response> => {
    const categories = await Category.findAll();
    if(!categories) return res.status(400).json("Not Found");
    return res.status(200)
        .json({
            categories: categories
        });
}

export const getProductsFromCategory = async (req: Request, res: Response) => {
    const products = await Category.findAll({ include: [Product] });
    if(!products) return res.status(400).json("Not Found");
    return res.status(200)
        .json({
            products
        })

}