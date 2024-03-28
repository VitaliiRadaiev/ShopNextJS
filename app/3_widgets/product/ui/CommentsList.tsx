'use client'

import { CommentType } from '@/app/5_entities/products/comments';
import clsx from 'clsx';
import { Comment } from '@/app/5_entities/products/comments';
import { DeleteComment, LikeDislikeComment, UpdateComment } from '@/app/4_features/comment';

interface CommentsListProps {
    comments: CommentType[];
    meId: string;
}

export function CommentsList({ comments, meId }: CommentsListProps) {
    return (
        <ul>
            {
                comments.map(comment => {
                    return (
                        <li
                            className='[&:not(:first-child)]:pt-4 pb-4 border-b border-slate-200'
                            key={comment.id}
                        >
                            <Comment
                                comment={comment}
                                updateCommentSlot={(text: string) => <UpdateComment commentId={comment.id} text={text} />}
                                deleteCommentSlot={<DeleteComment commentId={comment.id}/>}
                                likeDislikeCommentSlot={<LikeDislikeComment commentId={comment.id} likes={comment.likes} dislikes={comment.dislikes} />}
                                meId={meId}
                            />
                        </li>
                    );
                })
            }
        </ul>
    );
}