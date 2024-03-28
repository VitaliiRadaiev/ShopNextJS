import clsx from 'clsx';
import { ProductSingleType, ProductType } from '../lib/types';

interface LabelProps {
    product: ProductType | ProductSingleType;
}


export function Label({ product }: LabelProps) {
    return (
        <>
            {product.isNew &&
                <div
                    className='py-[2px] px-1 rounded-[2px] uppercase text-[8px] md:text-[11px] leading-none self-start text-white bg-info '
                >
                    новинка
                </div>
            }
            {product.isPromotion &&
                <div
                    className='py-[2px] px-1 rounded-[2px] uppercase text-[8px] md:text-[11px] leading-none self-start text-white bg-secondary '
                >
                    Акция
                </div>
            }
            {product.isBestseller &&
                <div
                    className='py-[2px] px-1 rounded-[2px] uppercase text-[8px] md:text-[11px] leading-none self-start text-white bg-primary '
                >
                    Топ продаж
                </div>
            }
        </>
    );
}
