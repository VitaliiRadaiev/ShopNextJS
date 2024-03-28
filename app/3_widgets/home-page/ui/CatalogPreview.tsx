import { GridListProducts, fetchProducts } from '@/app/5_entities/products';
import clsx from 'clsx';

import StarIcon from '@/public/icons/star.svg';
import { ProductCard, ProductCardSkeleton } from '@/app/5_entities/products/ui/ProductCard';
import { AddToBasket } from '@/app/4_features/basket';
import { fetchBasket } from '@/app/5_entities/basket';
import { fetchWishlist } from '@/app/5_entities/wishlist';
import { ToggleWishlistProduct } from '@/app/4_features/toggle-wishlist-product';



type getProductsDataType = {
    categoryId: string;
    isNew?: boolean;
    isRecommended?: boolean;
    isPromotion?: boolean;
}

interface CatalogPreviewProps {
    requestData: getProductsDataType;
}

export async function CatalogPreview({ requestData }: CatalogPreviewProps) {

    const products = await fetchProducts({
        ...requestData,
        count: 5,
        page: 1
    })

    const basket = await fetchBasket();
    const wishlist = await fetchWishlist();

    return (
        <GridListProducts
            items={products.items}
            renderItem={(product) => {
                const inBasket = basket?.products.find(order => {
                    return order.product.id === product.id
                }) ? true : false;

                const inWishlist = wishlist?.products.find(p => {
                    return p.id === product.id
                }) ? true : false;

                return (
                    <ProductCard
                        product={product}
                        addToCartSlot={<AddToBasket inBasket={inBasket} inStock={product.inStock} productId={product.id} />}
                        addToWishListSlot={<ToggleWishlistProduct inWishlist={inWishlist} productId={product.id}/>}
                    />
                );
            }}
        />
    );
}

export function CatalogPreviewSkeleton() {
    return (
        <ul className='flex flex-wrap'>
            <li
                className={clsx(
                    'w-1/2 md:w-1/3 lg:w-1/5',
                    'outline-1 outline-dashed outline-slate-300',
                    'only-mobile:last:odd:w-full',
                )}
            >
                <ProductCardSkeleton />
            </li>
            <li
                className={clsx(
                    'w-1/2 md:w-1/3 lg:w-1/5',
                    'outline-1 outline-dashed outline-slate-300',
                    'only-mobile:last:odd:w-full',
                )}
            >
                <ProductCardSkeleton />
            </li>
            <li
                className={clsx(
                    'w-1/2 md:w-1/3 lg:w-1/5',
                    'outline-1 outline-dashed outline-slate-300',
                    'only-mobile:last:odd:w-full',
                )}
            >
                <ProductCardSkeleton />
            </li>
            <li
                className={clsx(
                    'w-1/2 md:w-1/3 lg:w-1/5',
                    'outline-1 outline-dashed outline-slate-300',
                    'only-mobile:last:odd:w-full',
                )}
            >
                <ProductCardSkeleton />
            </li>
            <li
                className={clsx(
                    'w-1/2 md:w-1/3 lg:w-1/5',
                    'outline-1 outline-dashed outline-slate-300',
                    'only-mobile:last:odd:w-full',
                )}
            >
                <ProductCardSkeleton />
            </li>
        </ul>
    );
}