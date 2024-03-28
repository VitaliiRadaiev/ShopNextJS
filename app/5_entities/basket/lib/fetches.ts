import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
import { BasketApi } from "./BasketApi";

export async function fetchBasket() {
    const jwt = await getJwtFromCookies();
    if(!jwt) return;
    return await BasketApi.getBasket(jwt);
}