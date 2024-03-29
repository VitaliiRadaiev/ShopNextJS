import { Catalog, CatalogSkeleton } from '@/app/3_widgets/catalog';
import { LastViewedProductsContainer } from '@/app/3_widgets/last-viewed-products';
import { LastViewedProductsSkeleton } from '@/app/5_entities/last-viewed-products';
import clsx from 'clsx';
import { Suspense } from 'react';

export default function catalogPage(
    { params, searchParams }:
        {
            params: { id: string },
            searchParams: Record<string, string>
        }
) {
    const id = params.id;

    return (
        <main className=''>
            <div className="mt-9 lg:mt-20">
                <Suspense fallback={<CatalogSkeleton />}>
                    <Catalog catalogId={id} searchParams={searchParams}/>
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