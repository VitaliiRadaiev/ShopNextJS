import React, { JSX, ReactNode } from 'react';
import clsx from 'clsx';
import { ProductType } from '../lib/types';
import { ImageRemote } from '@/app/6_shared/ui/Images';
import { getRemoteImage } from '@/app/6_shared/utils/getRemoteImage';
import Link from 'next/link';
import { truncateText } from '@/app/6_shared/utils/trancateText';
import { addCurrencySymbol } from '@/app/6_shared/utils/addCurrencySymbol';
import { shimmer } from '@/app/6_shared/utils/shimmer';
import { Label } from './Label';
import { Status } from './Status';
import { Stars } from '@/app/6_shared/ui/Stars';

interface ProductCardProps {
    product: ProductType;
    addToCartSlot: ReactNode;
    addToWishListSlot: ReactNode;
}

export function ProductCard({ product, addToCartSlot, addToWishListSlot }: ProductCardProps): JSX.Element {
    return (
        <div
            className={clsx(
                "flex flex-col h-full relative"
            )}
        >
            <div className="absolute top-0 left-0 w-full z-6 flex items-start justify-between p-1 md:p-2">
                <div className='flex flex-col gap-1'>
                    <Label product={product} />
                </div>
                <div>
                    {addToWishListSlot}
                </div>
            </div>

            <Link
                href={`/product/${product.id}`}
                className="h-[140px] md:h-[200px] p-3 md:p-5 flex items-center justify-center"
            >
                <ImageRemote
                    src={getRemoteImage(product.images)}
                    className='w-auto h-auto max-w-full max-h-full'
                />
            </Link>
            <div className="px-4 pb-4 md:px-5 md:pb-5 flex flex-col text-center shrink grow">
                <div className='flex justify-center'>
                    <Stars clickable={false} startValue={product.rating} />
                </div>
                <Link
                    href={`/product/${product.id}`}
                    className={clsx(
                        'transition-colors text-secondary hover:text-secondary-light',
                        'font-semibold text-[14px] md:text-[20px] mt-2'
                    )}
                >
                    {product.title}
                </Link>
                {!!product.shortDescription.trim().length &&
                    <div className="text-[12px] md:text-[14px] mt-1 w-full">{truncateText(product.shortDescription, 40)}</div>
                }
                <div className="mt-auto pt-2 md:pt-3 text-[12px] md:text-[14px]">
                    <Status status={product.inStock} />
                </div>
                <div className="text-[20px] md:text-[24px] md:mt-3">
                    <div className=" font-bold">{addCurrencySymbol(product.price, { space: true })}</div>
                    {product.oldPrice > 0 &&
                        <div className="text-[0.6em] text-primary-light line-through">{addCurrencySymbol(product.oldPrice, { space: true })}</div>
                    }
                </div>
                <div className="mt-3">{addToCartSlot}</div>
            </div>
        </div>
    );
}


export function ProductCardSkeleton() {
    return (
        <div
            className={`${shimmer} relative overflow-hidden bg-white p-3: md:p-5 flex flex-col items-center`}
        >
            <div className="h-[140px] md:h-[200px] bg-gray-100 w-full"></div>
            <div className=" bg-gray-100 text-[14px] md:text-[20px] h-[1em] mt-3 w-10/12"></div>
            <div className=" bg-gray-100 text-[14px] md:text-[20px] h-[1em] mt-3 w-1/2"></div>
            <div className=" bg-gray-100 text-[14px] md:text-[20px] h-[1em] mt-3 w-9/12"></div>
            <div className=" bg-gray-100 h-8 md:h-10 mt-6 w-8/12 rounded"></div>
        </div>
    );
}