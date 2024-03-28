import clsx from 'clsx';
import { ReactNode } from 'react';
import { OrderedProductType } from '../lib/types';
import { ImageRemote } from '@/app/6_shared/ui/Images';
import { getRemoteImage } from '@/app/6_shared/utils/getRemoteImage';
import Link from 'next/link';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import { truncateText } from '@/app/6_shared/utils/trancateText';
import { addCurrencySymbol } from '@/app/6_shared/utils/addCurrencySymbol';

interface BasketProductCardProps {
    orderItem: OrderedProductType;
    removeFromBasketSlot: ReactNode;
    quantitySlot: ReactNode;
}

export function BasketProductCard({ orderItem, removeFromBasketSlot, quantitySlot }: BasketProductCardProps) {
    return (
        <div 
            className={clsx(
                'grid grid-cols-[60px_1fr] gap-3 py-4 px-2 relative',
                'md:grid-cols-[200px_1fr_auto_minmax(160px,_auto)] md:py-8 md:ps-5 md:pr-10 md:gap-5'
            )}
        >
            <div className="absolute z-5 top-3 right-1">
                {removeFromBasketSlot}
            </div>
            <div className="absolute top-0 left-0 z-6 flex items-start justify-between p-1 md:p-2">
                <div className='flex flex-col gap-1'>
                    <Label product={orderItem.product} />
                </div>
            </div>
            <div className="row-span-3 md:row-auto" >
                <Link
                    href={'/product/' + orderItem.product.id}
                    className={clsx(
                        'flex items-center justify-center h-28 md:h-[200px]',
                        'transition-opacity hover:opacity-70'
                    )}
                >
                    <ImageRemote
                        src={getRemoteImage(orderItem.product.images)}
                        className='w-auto h-auto max-w-full max-h-full'
                    />
                </Link>
            </div>
            <div className="">
                <Link
                    href={'/product/' + orderItem.product.id}
                    className={clsx(
                        'text-secondary text-[16px] md:text-[20px] leading-snug -tracking-wide ',
                        'uppercase font-semibold pr-8 block md:pr-0',
                        'transition-colors hover:text-secondary-light'
                    )}
                >
                    {orderItem.product.title}
                </Link>
                {!!orderItem.product.shortDescription.trim().length &&
                    <div
                        className="text-[14px] md:text-[16px] text-primary mt-1 w-full">
                        {truncateText(orderItem.product.shortDescription, 70)}
                    </div>
                }
                <div className="mt-auto pt-2 md:pt-3">
                    <Status status={orderItem.product.inStock} />
                </div>
            </div>
            <div className="">
                {quantitySlot}
            </div>
            <div className="md:text-right">
                <div className="text-[24px] md:text-[28px] text-[#5e616b]">
                    <div className=" font-bold">{addCurrencySymbol(orderItem.product.price, { space: true })}</div>
                    {orderItem.product.oldPrice > 0 &&
                        <div
                            className="text-[0.6em] text-primary-light line-through">
                            {addCurrencySymbol(orderItem.product.oldPrice, { space: true })}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

interface LabelProps {
    product: OrderedProductType['product'];
}


function Label({ product }: LabelProps) {
    return (
        <>
            {product.isNew &&
                <div
                    className='py-[2px] px-1 rounded-[2px] uppercase text-[8px] md:text-[11px] leading-none self-start text-white bg-info '
                >
                    новинка
                </div>
            }
            {product.isPromotion &&
                <div
                    className='py-[2px] px-1 rounded-[2px] uppercase text-[8px] md:text-[11px] leading-none self-start text-white bg-secondary '
                >
                    Акция
                </div>
            }
            {product.isBestseller &&
                <div
                    className='py-[2px] px-1 rounded-[2px] uppercase text-[8px] md:text-[11px] leading-none self-start text-white bg-primary '
                >
                    Топ продаж
                </div>
            }
        </>
    );
}


interface StatusProps {
    status: boolean;
}

function Status({ status }: StatusProps) {

    const value = status
        ? <>
            <CheckCircleIcon className='text-[#6a9a4d] h-[1.4em] w-auto absolute top-1/2 left-0 -translate-y-1/2' />
            <span className='border-b border-[currentColor] border-dashed'>
                В наличии
            </span>
        </>
        : <>
            <XCircleIcon className='text-[#ff0000] h-[1.4em] w-auto absolute top-1/2 left-0 -translate-y-1/2' />
            <span className='border-b border-[currentColor] border-dashed'>
                Не в наличии
            </span>
        </>

    return (
        <div className='text-primary-light text-[12px] md:text-[14px] flex justify-start'>
            <div className='flex items-center justify-center gap-1 relative self-center pl-5'>
                {value}
            </div>
        </div>
    );
}