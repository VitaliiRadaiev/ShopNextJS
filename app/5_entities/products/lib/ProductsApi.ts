import { Api } from "@/app/6_shared/api/Api";
import { GetProductsRequestDataType, GetProductsResponseType, ProductSingleType } from "./types";

export class ProductsApi extends Api {
    static currentUrl: string = `${this.baseUrl}/products`;

    static getProducts = async (requestData: GetProductsRequestDataType) => {
        const res = await fetch(`${this.currentUrl}/get`, {
            method: 'POST',
            body: JSON.stringify({
                filters: [],
                ...requestData,
            }),
            next: {
                tags: [this.TAGS.products]
            },
            headers: this.headers
        })

        return await this.handleResponse<GetProductsResponseType>(res);
    }

    static getProductById = async (productId: string) => {
        const res = await fetch(`${this.currentUrl}/product/${productId}`, {
            method: 'GET',
            headers: this.headers,
            next: {
                tags: [this.TAGS.product]
            },
        })

        return await this.handleResponse<ProductSingleType>(res);
    }
}