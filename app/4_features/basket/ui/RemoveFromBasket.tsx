'use client';

import clsx from 'clsx';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useFormStatus } from 'react-dom';
import { Spinner } from '@/app/6_shared/ui/Spinner';
import { removeProductFromBasketAction } from '../lib/actions';

interface RemoveFromBasketProps {
    orderProductId: string;
}

function ButtonSubmit() {
    const { pending } = useFormStatus();
    return (
        <button
            className={clsx(
                'h-8 w-8 p-1 flex items-center justify-center cursor-pointer stroke-[2px]',
                'transition hover:bg-slate-100',
                {
                    'cursor-default': pending
                }
            )}
            onClick={(e) => {
                if (pending) e.preventDefault();
            }}
        >
            {pending
                ? <Spinner className='w-4/5 h-auto'/>
                : <XMarkIcon className='w-auto h-auto max-h-full max-w-full'/>
            }
        </button>
    );
}

export function RemoveFromBasket( { orderProductId }: RemoveFromBasketProps ) {
    return (
        <form action={removeProductFromBasketAction.bind(null, orderProductId)}>
            <ButtonSubmit />
        </form>
    );
}