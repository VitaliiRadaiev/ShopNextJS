'use server';

import { BasketApi } from "../../../5_entities/basket/lib/BasketApi";
import { revalidateTag } from "next/cache";
import { Api } from "@/app/6_shared/api/Api";
import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";

export async function addProductToBasketAction(productId: string) {
    const jwt = await getJwtFromCookies();
    if(!jwt) return;

    await BasketApi.addProductToBasket(jwt, productId);
    revalidateTag(Api.TAGS.basket);
}

export async function removeProductFromBasketAction(productId: string) {
    const jwt = await getJwtFromCookies();
    if(!jwt) return;

    await BasketApi.removeProductFromBasket(jwt, productId);
    revalidateTag(Api.TAGS.basket);
}

export async function changeOrderedProductCountAction(orderProductId: string, count: number) {
    const jwt = await getJwtFromCookies();
    if(!jwt) return;

    await BasketApi.changeOrderedProductCount(jwt, orderProductId, count);
    revalidateTag(Api.TAGS.basket);
}