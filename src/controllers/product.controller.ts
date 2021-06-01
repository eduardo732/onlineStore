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

export const searcher = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const products = await Product.findAll();
  if (!products) return res.status(400).json("Not Found");
  const word = lowerCase(req.body.word);
  const resp = filter(products, word);
  return res.status(200).send(resp);
};

const lowerCase = (word: string): string => {
  return word.toLowerCase();
};

const filter = (products: Product[], word: string): Product[] => {
  return products.filter((element) => {
    const name = lowerCase(element.name);
    if (name.indexOf(word) !== -1) {
      return element;
    }
  });
};
