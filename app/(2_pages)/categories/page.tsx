import { Categories, CategoriesSkeleton } from '@/app/3_widgets/categories';
import { LastViewedProductsContainer } from '@/app/3_widgets/last-viewed-products';
import { LastViewedProductsSkeleton } from '@/app/5_entities/last-viewed-products';
import clsx from 'clsx';
import { Suspense } from 'react';

export default function categoriesPage() {
    return (
        <main className=''>
            <div className='mt-9 lg:mt-20'>
                <Suspense fallback={<CategoriesSkeleton />}>
                    <Categories />
                </Suspense>
            </div>
            <div className="mt-9 lg:mt-20">
                <Suspense fallback={<LastViewedProductsSkeleton />}>
                    <LastViewedProductsContainer />
                </Suspense>
            </div>
        </main>
    );
}