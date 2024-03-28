'use server';

import { CommentsApi } from "@/app/5_entities/products/comments";
import { Api } from "@/app/6_shared/api/Api";
import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
import { revalidateTag } from "next/cache";

export async function createCommentAction(data: { text: string; stars: number; productCardId: string; }) {
    const jwt = await getJwtFromCookies();
    if(!jwt) return;

    await CommentsApi.createComment(jwt, data);

    revalidateTag(Api.TAGS.product)
}