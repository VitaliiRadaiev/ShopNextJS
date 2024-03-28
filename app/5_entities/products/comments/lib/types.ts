export type CommentType = {
    id: string;
    createdAt: Date;
    text: string;
    stars: number;
    author: AuthorType;
    productCardId: string;
    likes: LikesType;
    dislikes: DislikesType;
    subcomments: SubcommentType[];
}

type AuthorType = {
    id: string;
    firstName: string;
    lastName: string;
}

export type LikesType = {
    id: string;
    commentId: string;
    items: LikesDislikesItemType[]
}
export type DislikesType = {
    id: string;
    commentId: string;
    items: LikesDislikesItemType[]
}

type LikesDislikesItemType = {
    id: string;
}

type SubcommentType = {
    id: string;
    createdAt: Date;
    text: string;
    commentId: string;
}