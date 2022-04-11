export interface EditProductDto {
  productName?: string;
  desc?: string;
  thumpNail?: string;
  price?: number;
  unitsInStock?: number;
  categoryId?: string[];
  productStatus?: string;
}
