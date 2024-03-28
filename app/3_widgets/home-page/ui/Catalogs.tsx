import { fetchCategories } from '@/app/5_entities/categories';
import { CatalogPreviewTabs } from './CatalogPreviewTabs';
import { CatalogPreview, CatalogPreviewSkeleton } from './CatalogPreview';
import { Suspense } from 'react';
import { H2 } from '@/app/6_shared/ui/Titles';


export async function Catalogs() {
    const categories = await fetchCategories();

    return (
        <>
            {categories.map(category =>
                <CatalogPreviewTabs
                    key={category.id}
                    slotTitle={
                        <H2>
                            Каталог: <span className='text-[0.6em] lg:text-[1em]'>{category.title}</span>
                        </H2>
                    }
                    categoryId={category.id}
                    slotCatalogPreviewNew={
                        <Suspense fallback={<CatalogPreviewSkeleton />}>
                            <CatalogPreview requestData={{
                                categoryId: category.id,
                                isNew: true
                            }} />
                        </Suspense>
                    }
                    slotCatalogPreviewRecommended={
                        <Suspense fallback={<CatalogPreviewSkeleton />}>
                            <CatalogPreview requestData={{
                                categoryId: category.id,
                                isRecommended: true
                            }} />
                        </Suspense>
                    }
                    slotCatalogPreviewPromotion={
                        <Suspense fallback={<CatalogPreviewSkeleton />}>
                            <CatalogPreview requestData={{
                                categoryId: category.id,
                                isPromotion: true
                            }} />
                        </Suspense>
                    }
                />
            )}
        </>
    );
}