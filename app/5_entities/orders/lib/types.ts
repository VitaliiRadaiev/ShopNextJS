export type HistoryType = {
    id: string;
    userId: string;
    orders: OrderType[];
}

export type OrderStatuses = 'processed' | 'delivering' | 'canceled' | 'done';

export type OrderType = {
    id: number;
    createdAt: Date;
    status: OrderStatuses;
    delivery: string;
    deliveryFullAddress: string;
    paymentMethod: string;
    totalPrice: number;
    recipient: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
    },
    products: OrderProductType[]
}

type OrderProductType = {
    id: string;
    count: number;
    product: ProductCardType
}

type ProductCardType = {
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

export type CreateOrderQueryDataType = {
    delivery: string;
    deliveryFullAddress: string;
    paymentMethod: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}