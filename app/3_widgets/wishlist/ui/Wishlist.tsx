import { AddToBasket } from '@/app/4_features/basket';
import { ToggleWishlistProduct } from '@/app/4_features/toggle-wishlist-product';
import { fetchBasket } from '@/app/5_entities/basket';
import { GridListProducts } from '@/app/5_entities/products';
import { ProductCard } from '@/app/5_entities/products/ui/ProductCard';
import { fetchWishlist } from '@/app/5_entities/wishlist';
import clsx from 'clsx';

export async function Wishlist() {
    const wishlist = await fetchWishlist();
    const basket = await fetchBasket();

    if (!wishlist || !wishlist.products.length) {
        return (
            <p>Список пуст.</p>
        );
    }
    return (
        <GridListProducts
            columnsClassNames='basis-1/2 md:basis-1/3'
            items={wishlist.products}
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
                        addToWishListSlot={<ToggleWishlistProduct inWishlist={inWishlist} productId={product.id} />}
                    />
                );
            }}
        />
    );
}