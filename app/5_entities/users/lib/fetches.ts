import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
import { UsersApi } from "./UsersApi";

export async function fetchMe(jwtToken?: string) {
    if(jwtToken) {
        return await UsersApi.getMe(jwtToken);
    } else {
        const jwt = await getJwtFromCookies();
        if(!jwt) return;
        return await UsersApi.getMe(jwt);
    }
}