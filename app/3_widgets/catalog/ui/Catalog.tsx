import { FilterBox } from '@/app/5_entities/catalog';
import { fetchCategoryById } from '@/app/5_entities/categories';
import { H2 } from '@/app/6_shared/ui/Titles';
import clsx from 'clsx';
import { Filter } from './Filter';
import { Suspense } from 'react';
import { GridListProductsSkeleton, fetchProducts } from '@/app/5_entities/products';
import { ProductsContainer } from './ProductsContainer';
import { SortByType } from '@/app/5_entities/products';
import { ProductsSort } from './ProductsSort';
import Pagination from './Pagination';

interface CatalogProps {
    catalogId: string;
    searchParams: Record<string, string>
}

export async function Catalog({ catalogId, searchParams }: CatalogProps) {
    const category = await fetchCategoryById(catalogId);
    const products = await fetchProducts({
        categoryId: catalogId,
        inStock: searchParams?.inStock ? true : undefined,
        isNew: searchParams?.isNew ? true : undefined,
        isPromotion: searchParams?.isPromotion ? true : undefined,
        isBestseller: searchParams?.isBestseller ? true : undefined,
        isRecommended: searchParams?.isRecommended ? true : undefined,
        filters: searchParams?.filters && JSON.parse(searchParams.filters),
        priceRange: searchParams?.priceRange && JSON.parse(searchParams.priceRange),
        sortBy: searchParams?.sortBy as SortByType || 'rank',
        page: searchParams?.page ? Number(searchParams?.page ) : undefined,
        count: 15
    })

    return (
        <div className="container">
            <H2>{category.title}</H2>
            <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-10 mt-4">
                <div>
                    <FilterBox>
                        <Filter
                            category={category}
                            priceRange={{
                                lowestPrice: products.lowestPrice,
                                highestPrice: products.highestPrice
                            }}
                        />
                    </FilterBox>
                </div>
                <div>
                    <ProductsSort />

                    <div className='mt-4'>
                        <ProductsContainer
                            products={products.items}
                        />
                    </div>
                    <div className="mt-4">
                        <Pagination totalPages={Math.ceil(products.count / 15)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}