import { GridListProductsSkeleton } from '@/app/5_entities/products';
import clsx from 'clsx';

export function WishlistSkeleton() {
    return (
        <GridListProductsSkeleton
            columnsClassNames='w-1/2 md:w-1/3 lg:w-1/3'
            countOfItems={6}
        />
    );
}