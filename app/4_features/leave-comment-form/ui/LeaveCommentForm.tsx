"use client";

import React, { JSX, useState } from 'react';
import clsx from 'clsx';
import { SubmitButton } from '@/app/6_shared/ui/Buttons/SubmitButton';
import { Stars } from '@/app/6_shared/ui/Stars';
import { z } from 'zod';
import { createCommentAction } from '../lib/actions';

type InitialState = {
    errors: {
        text?: string[];
    }
}

const FormSchema = z.object({
    text: z.coerce.string().min(5, {
        message: 'Отзыв слишком короткий'
    })
});

interface LeaveCommentFormProps {
    productCardId: string;
}

export function LeaveCommentForm({ productCardId }: LeaveCommentFormProps): JSX.Element {
    const [state, setState] = useState<InitialState>({ errors: {} });
    const [textValue, setTextValue] = useState('');


    const onSubmit = async (formData: FormData) => {
        const rawFormData = Object.fromEntries(formData.entries());
        const validatedFields = FormSchema.safeParse({
            text: rawFormData.text.toString().trim()
        });

        if (!validatedFields.success) {
            setState({
                errors: validatedFields.error.flatten().fieldErrors
            })
            return;
        }
        setTextValue('');
        await createCommentAction({
            stars: Number(rawFormData.stars),
            text: validatedFields.data.text,
            productCardId
        })
    }

    return (
        <form action={onSubmit} className=''>
            <div className='text-[26px]'>
                <Stars
                    clickable={true}
                    startValue={0}
                />
            </div>
            <textarea
                placeholder='Ваш отзыв...'
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                name="text"
                className={clsx(
                    'flex items-center h-20 py-2 px-3 rounded border border-[#c9c9c9] bg-[#f1f1f1] w-full',
                    'focus:border-[#9f9e9e] focus:ring-transparent',
                    '-tracking-wide text-[20px] text-[#666666] mt-4',
                )}
                required
            >
            </textarea>
            {state.errors?.text && <div className='text-rose-500 text-[12px]'>{...state.errors?.text}</div>}
            <div className="mt-4">
                <SubmitButton >
                    Оставить отзыв
                </SubmitButton>
            </div>
        </form>
    );
}