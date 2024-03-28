import { CatalogPreview, CatalogPreviewSkeleton, CatalogPreviewTabs } from "@/app/3_widgets/home-page";
import { LastViewedProductsContainer } from "@/app/3_widgets/last-viewed-products";
import { Product } from "@/app/3_widgets/product";
import { ProductSkeleton } from "@/app/3_widgets/product/ui/ProductSkeleton";
import { LastViewedProductsSkeleton, saveProductAsLastViewedAction } from "@/app/5_entities/last-viewed-products";
import { fetchProductById } from "@/app/5_entities/products";
import { H2 } from "@/app/6_shared/ui/Titles";
import { Suspense } from "react";

export default async function ProductPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const product = await fetchProductById(id);
    saveProductAsLastViewedAction(id);

    return (
        <main className="">
            <div className="mt-9 lg:mt-20">
                <Suspense fallback={<ProductSkeleton />}>
                    <Product productId={id} />
                </Suspense>
            </div>
            <div className="mt-9 lg:mt-20">
                <CatalogPreviewTabs
                    key={product.categoryId}
                    slotTitle={
                        <H2>
                            Похожие товары
                        </H2>
                    }
                    categoryId={product.categoryId}
                    slotCatalogPreviewNew={
                        <Suspense fallback={<CatalogPreviewSkeleton />}>
                            <CatalogPreview requestData={{
                                categoryId: product.categoryId,
                                isNew: true
                            }} />
                        </Suspense>
                    }
                    slotCatalogPreviewRecommended={
                        <Suspense fallback={<CatalogPreviewSkeleton />}>
                            <CatalogPreview requestData={{
                                categoryId: product.categoryId,
                                isRecommended: true
                            }} />
                        </Suspense>
                    }
                    slotCatalogPreviewPromotion={
                        <Suspense fallback={<CatalogPreviewSkeleton />}>
                            <CatalogPreview requestData={{
                                categoryId: product.categoryId,
                                isPromotion: true
                            }} />
                        </Suspense>
                    }
                />
            </div>
            <div className="mt-9 lg:mt-20">
                <Suspense fallback={<LastViewedProductsSkeleton />}>
                    <LastViewedProductsContainer />
                </Suspense>
            </div>
        </main>
    );
}
