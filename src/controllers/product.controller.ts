import { Product } from "./../models/product.model";
import { Request, Response } from "express";

export const findAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const products = await Product.findAll();
  if (!products) return res.status(400).json("Not Found");
  return res.status(200).send(products);
};
