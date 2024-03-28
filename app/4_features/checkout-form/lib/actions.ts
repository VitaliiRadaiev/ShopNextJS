'use server';

import { CreateOrderQueryDataType, OrdersApi } from "@/app/5_entities/orders";
import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
import { RedirectType, redirect } from "next/navigation";

export async function createOrderAction(data: CreateOrderQueryDataType) {
    const jwt = await getJwtFromCookies();
    if (!jwt) throw new Error();

    const newOrder = await OrdersApi.createOrder(jwt, data);

    redirect('/ordersConfirmation/'+newOrder.id, RedirectType.replace);
}