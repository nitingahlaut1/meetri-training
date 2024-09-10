import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createMany(products: Product[]): Promise<Product[]> {
    return this.productModel.insertMany(products);
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  // Fetch products by category from the database
  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ category }).exec(); // Query MongoDB for products in a specific category
  }
}
