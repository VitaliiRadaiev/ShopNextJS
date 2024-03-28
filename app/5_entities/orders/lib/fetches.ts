'use server';

import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
import { OrdersApi } from "..";

export async function fetchHistory() {
    const jwt = await getJwtFromCookies();
    if(!jwt) return;
    return OrdersApi.getHistory(jwt);
}

export async function fetchOrderById(orderId: number) {
    return OrdersApi.getOrderById(orderId);
}