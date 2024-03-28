import { Wishlist, WishlistSkeleton } from '@/app/3_widgets/wishlist';
import clsx from 'clsx';
import { Suspense } from 'react';

export default function wishlistPage() {
    return (
        <Suspense fallback={<WishlistSkeleton />}>
            <Wishlist />
        </Suspense>
    );
}