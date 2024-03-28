import clsx from 'clsx';
import { CategoryType } from '..';
import Link from 'next/link';

import watchImg1 from '@/public/images/w-1.jpg';
import watchImg2 from '@/public/images/w-2.jpg';
import watchImg3 from '@/public/images/w-3.jpg';
import watchImg4 from '@/public/images/w-4.jpg';
import watchImg5 from '@/public/images/w-5.jpg';
import watchImg6 from '@/public/images/w-6.jpg';
import watchImg7 from '@/public/images/w-7.jpg';
import watchImg8 from '@/public/images/w-8.jpg';
import watchImg9 from '@/public/images/w-9.jpg';
import watchImg10 from '@/public/images/w-10.jpg';
import { ImageFadeIn } from '@/app/6_shared/ui/Images';

const images = [watchImg1, watchImg6, watchImg3, watchImg4, watchImg5, watchImg2, watchImg7, watchImg8, watchImg9, watchImg10];

interface CategoriesGridProps {
    categories: CategoryType[]
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
    return (
        <div className='grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'>
            {categories.map((category, index) => {
                return (
                    <Link
                        key={category.id}
                        href={'/catalog/' + category.id}
                        className={clsx(
                            'flex relative h-36 rounded overflow-hidden text-white text-[24px] items-center justify-center',
                            '[&_img]:hover:scale-105'
                        )}
                    >
                        <div className='absolute inset-0 z-1 bg-black'>
                            <div className='opacity-75 h-full w-full'>
                                <ImageFadeIn
                                    src={images[index]}
                                    className='object-cover block h-full w-full transition-transform duration-500'
                                />
                            </div>
                        </div>
                        <div className='relative z-3'>
                            {category.title}
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}