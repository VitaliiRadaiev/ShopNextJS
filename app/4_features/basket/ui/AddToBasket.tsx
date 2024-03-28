"use client";

import React, { JSX } from 'react';
import clsx from 'clsx';

import { SubmitButton } from '@/app/6_shared/ui/Buttons/SubmitButton';
import { addProductToBasketAction } from '../lib/actions';

interface AddToBasketProps {
    productId: string;
    inStock: boolean;
    inBasket?: boolean;
}

export function AddToBasket({ inStock, productId, inBasket }: AddToBasketProps): JSX.Element {
    const actionWithProductId = addProductToBasketAction.bind(null, productId);
    return (
        <form action={actionWithProductId}>
            <SubmitButton
                className={clsx({
                    'pointer-events-none opacity-70': !inStock || inBasket
                })}
            >
                {inBasket
                    ? 'В корзине'
                    : 'Заказать'
                }
                
            </SubmitButton>
        </form>
    );
}