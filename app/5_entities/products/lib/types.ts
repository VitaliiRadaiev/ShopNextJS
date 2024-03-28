import { CommentType } from "../comments";

export type ProductType = {
    id: string;
    title: string;
    price: number;
    oldPrice: number;
    isNew: boolean;
    inStock: boolean;
    isPromotion: boolean;
    isBestseller: boolean;
    isRecommended: boolean;
    shortDescription: string;
    description: string;
    createdAt: Date;
    rating: number;
    categoryId: string;
    images: ProductImageType[];
}

type ProductImageType = {
    id: string;
    url: string;
    isMain: boolean;
    productCardId: string;
}

type ProductFeatureType = {
    id: string;
    title: string;
    value: string;
    productCardId: string;
}

export type SuggestionProductType = {
    id: ProductType['id'],
    title: ProductType['title'];
    price: ProductType['price'];
    oldPrice: ProductType['oldPrice'];
    shortDescription: ProductType['shortDescription'];
    categoryId: ProductType['categoryId'];
    images: ProductType['images'];
}

export type SortByType = 'cheap' | 'expensive' | 'rank';

export type GetProductsRequestDataType = {
    filters?: FilterType[]; 
    priceRange?: { from: number, to: number };
    sortBy?: SortByType;
    isNew?: boolean;
    inStock?: boolean;
    isPromotion?: boolean;
    isBestseller?: boolean;
    isRecommended?: boolean;
    count?: number;
    page?: number;
    term?: string;
    categoryId?: string;
}

type FilterType = {
    id: string;
    items: string[]
}

export type GetProductsResponseType = {
    items: ProductType[];
    count: number;
    lowestPrice: number;
    highestPrice: number;
}

export type ProductSingleType = {
    id: string;
    title: string;
    price: number;
    oldPrice: number;
    isNew: boolean;
    inStock: boolean;
    isPromotion: boolean;
    isBestseller: boolean;
    isRecommended: boolean;
    shortDescription: string;
    description: string;
    createdAt: Date;
    rating: number;
    categoryId: string;
    images: ProductImageType[];
    features: ProductFeatureType[];
    comments: CommentType[];
}