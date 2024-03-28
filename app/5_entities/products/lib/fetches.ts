import { ProductsApi } from "./ProductsApi";
import { GetProductsRequestDataType } from "./types";

export async function fetchProducts(requestData: GetProductsRequestDataType) {
    return await ProductsApi.getProducts(requestData);
}

export async function fetchProductById(productId: string) {
    return await ProductsApi.getProductById(productId);
}