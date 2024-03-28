import clsx from 'clsx';
import { OrderedProductType } from '../lib/types';
import { ReactNode } from 'react';
import Link from 'next/link';
import { ImageRemote } from '@/app/6_shared/ui/Images';
import { getRemoteImage } from '@/app/6_shared/utils/getRemoteImage';
import { addCurrencySymbol } from '@/app/6_shared/utils/addCurrencySymbol';

interface BasketProductCardMiniProps {
    orderItem: OrderedProductType;
    removeFromBasketSlot: ReactNode;
}

export function BasketProductCardMini({ orderItem, removeFromBasketSlot }: BasketProductCardMiniProps) {
    return (
        <div className='relative flex gap-4'>
            <div className="absolute z-5 -top-1 -right-1">
                {removeFromBasketSlot}
            </div>
            <Link
                href={'/product/' + orderItem.product.id}
                className={clsx(
                    'flex items-center justify-center h-14 w-14 shrink-0 grow-0',
                    'transition-opacity hover:opacity-70 border border-slate-300'
                )}
            >
                <ImageRemote
                    src={getRemoteImage(orderItem.product.images)}
                    className='w-auto h-auto max-w-full max-h-full'
                />
            </Link>
            <div className='pr-8 shrink grow flex flex-col gap-2'>
                <Link
                    href={'/product/' + orderItem.product.id}
                    className={clsx(
                        'text-secondary text-[14px] leading-snug -tracking-wide ',
                        'uppercase font-semibold block',
                        'transition-colors hover:text-secondary-light'
                    )}
                >
                    {orderItem.product.title}
                </Link>
                <div className="flex justify-between text-[12px]">
                    <div>
                        Количество: <span className='font-bold'>{orderItem.count}</span> ед.
                    </div>
                    <div>
                        <span className='font-bold'>{addCurrencySymbol(orderItem.product.price)}</span>
                        {orderItem.product.oldPrice > 0 && 
                            <> - <span className='text-primary-light line-through text-'>{addCurrencySymbol(orderItem.product.oldPrice)}</span></>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}