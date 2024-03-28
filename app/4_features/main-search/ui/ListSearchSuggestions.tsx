'use client';

import React, { useCallback } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { ImageRemote } from '@/app/6_shared/ui/Images';
import { getRemoteImage } from '@/app/6_shared/utils/getRemoteImage';
import { addCurrencySymbol } from '@/app/6_shared/utils/addCurrencySymbol';
import { useQueryAction } from '@/app/6_shared/hooks/hooks';
import { getSearchedProductsAction } from '../actions/actions';
import { LoadingDots } from '@/app/6_shared/ui/LoadingDots/LoadingDots';


export function ListSearchSuggestions({ searchQuery }: { searchQuery: string }) {
    const callback = useCallback(() => getSearchedProductsAction(searchQuery), [searchQuery]);
    const { data: products, isLoading, error } = useQueryAction(callback);

    return (
        <div
            className={clsx(
                "absolute l-0 w-full transition-opacity top-[calc(100%+0.5rem)]",
                { "opacity-0 pointer-events-none": false }
            )}
        >
            {!!searchQuery.trim().length &&
                <div className='bg-white flex flex-col gap-1 p-1'>
                    {isLoading &&
                        <div className='text-[12px] text-white flex items-center justify-center absolute inset-0 z-10 bg-slate-900/40'>
                            <LoadingDots />
                        </div>
                    }
                    {products && !!products.items.length
                        ? products.items.map(product =>
                            <Link key={product.id} href={`/product/${product.id}`} className="flex gap-3 p-1 transition hover:bg-slate-100">
                                <div className='h-[80px] w-[80px] flex items-center justify-center border bg-white border-slate-200 p-1'>
                                    <ImageRemote
                                        src={getRemoteImage(product.images)}
                                        className='w-auto h-auto max-h-full max-w-full'
                                        width={80}
                                        height={80}
                                    />
                                </div>
                                <div>
                                    <div className=' font-bold text-md'>
                                        {product.title}
                                    </div>

                                    {!!product.shortDescription.trim().length &&
                                        <div className='text-sm'>product.shortDescription</div>
                                    }
                                    <div className='text-sm'>
                                        <strong className='me-1'>Цена:</strong>
                                        <span className='me-1'>
                                            {addCurrencySymbol(product.price)}
                                        </span>
                                        {product.oldPrice > 0 &&
                                            <del className='text-primary-light'>
                                                {addCurrencySymbol(product.oldPrice)}
                                            </del>
                                        }
                                    </div>
                                </div>
                            </Link>
                        )
                        : <div>Ничего не найдено</div>
                    }
                </div>
            }

        </div>

    );
}