"use client";

import React, { JSX, ReactNode, useEffect, useState } from 'react';
import clsx from 'clsx';
import { CommentType } from '..';
import { Stars } from '@/app/6_shared/ui/Stars';

interface CommentProps {
    comment: CommentType;
    updateCommentSlot: (text: string) => JSX.Element;
    deleteCommentSlot: ReactNode;
    likeDislikeCommentSlot: ReactNode;
    meId: string;
}

export function Comment({ meId, comment, updateCommentSlot, deleteCommentSlot, likeDislikeCommentSlot }: CommentProps): JSX.Element {
    const [isMode, setIsMode] = useState(false);
    const [value, setValue] = useState(comment.text);

    useEffect(() => {
        setIsMode(false);
    }, [comment.text])


    return (
        <div className=''>
            <div className='flex justify-between'>
                <div>
                    <div className='text-[20px]'>{comment.author.firstName}</div>
                    <div className='mt-1'>
                        <Stars
                            startValue={comment.stars}
                            clickable={false}
                        />
                    </div>
                </div>
                <div className='text-[12px] text-primary-light'>{new Date(comment.createdAt).toLocaleString()}</div>
            </div>
            {isMode
                ? <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={clsx(
                        'flex items-center h-20 py-2 px-3 rounded border border-[#c9c9c9] bg-[#f1f1f1] w-full',
                        'focus:border-[#9f9e9e] focus:ring-transparent mt-3 text-wrap',
                        '-tracking-wide text-[#666666] mt-4',
                    )}
                    autoFocus
                >
                </textarea>
                : <div className='mt-3 break-words max-w-[600px]'>
                    {comment.text}
                </div>
            }

            <div className='mt-3 flex items-center justify-between'>
                {(meId === comment.author.id) &&
                    <div
                        className={clsx(
                            'flex gap-2 [&_button]:text-[12px] [&_button]:underline',
                            'hover:[&_button]:text-secondary-light [&_button]:transition-colors'
                        )}
                    >
                        {isMode
                            ? <>
                                {updateCommentSlot(value)}
                                <button onClick={() => setIsMode(false)}>Отмена</button>
                            </>
                            : <>
                                <button
                                    onClick={() => setIsMode(true)}
                                >Редактировать</button>
                                {deleteCommentSlot}
                            </>
                        }
                    </div>
                }
                <div className='ms-auto'>
                    {likeDislikeCommentSlot}
                </div>
            </div>

            {!!comment.subcomments?.length &&
                <div
                    className='p-4 rounded bg-slate-100 mt-4'
                >
                    <div className='font-bold'>Администрация магазина</div>
                    <div className='mt-4'>
                        {comment.subcomments[0].text}
                    </div>
                </div>
            }
        </div>
    );
}