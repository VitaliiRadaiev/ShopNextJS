import { GridListProducts, ProductType } from '@/app/5_entities/products';
import { fetchBasket } from '@/app/5_entities/basket';
import { fetchWishlist } from '@/app/5_entities/wishlist';
import { ProductCard } from '@/app/5_entities/products/ui/ProductCard';
import { AddToBasket } from '@/app/4_features/basket';
import { ToggleWishlistProduct } from '@/app/4_features/toggle-wishlist-product';



interface ProductsContainerProps {
    products: ProductType[]
}

export async function ProductsContainer({ products }: ProductsContainerProps) {

    const basket = await fetchBasket();
    const wishlist = await fetchWishlist();

    return (
        <GridListProducts
            columnsClassNames='basis-1/2 md:basis-1/3'
            items={products}
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