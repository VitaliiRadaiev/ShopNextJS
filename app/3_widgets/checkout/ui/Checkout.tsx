import { RemoveFromBasket } from '@/app/4_features/basket';
import { CheckoutForm } from '@/app/4_features/checkout-form';
import { BasketProductCardMini, fetchBasket } from '@/app/5_entities/basket';
import { fetchMe } from '@/app/5_entities/users';
import { ButtonLink } from '@/app/6_shared/ui/Buttons/ButtonLink';
import { addCurrencySymbol } from '@/app/6_shared/utils/addCurrencySymbol';
import clsx from 'clsx';

export async function Checkout() {
    const basket = await fetchBasket();
    const me = await fetchMe();

    if (!basket || !basket.products.length) {
        return (
            <section>
                <div className="container">
                    <div
                        className={clsx(
                            "mt-6 text-[20px]"
                        )}
                    >
                        Корзина пустая.
                    </div>
                    <div className='mt-4'>
                        <ButtonLink href='/categories'>Вернуться к покупкам</ButtonLink>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="container">
                <div className="flex flex-col gap-5 lg:gap-8 md:flex-row-reverse mt-4">
                    <div className="md:shrink-0 md:grow-0 md:basis-[300px] lg:basis-[400px] relative">
                        <div className='sticky top-[150px]'>
                            <div className="bg-slate-100 rounded p-4">
                                <ul className='flex flex-col gap-2'>
                                    {basket.products.map(orderItem => {
                                        return (
                                            <li className='p-2 bg-slate-50 rounded' key={orderItem.id}>
                                                <BasketProductCardMini
                                                    orderItem={orderItem}
                                                    removeFromBasketSlot={<RemoveFromBasket orderProductId={orderItem.id} />}
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                                <hr className='mt-4'/>
                                <div className='mt-4 flex items-center justify-between gap-4'>
                                    <span className='text-primary-light text-[16px]'>Стоимость доставки</span>
                                    <span className='font-bold text-[#5e616b] text-end'>По тарифам перевозчика</span>
                                </div>
                                <hr className='mt-4'/>
                                <div className='mt-4 flex items-center justify-between flex-wrap gap-4'>
                                    <span className='text-primary-light text-[22px]'>Итого:</span>
                                    <span className='text-[38px] leading-none font-bold text-[#5e616b]'>{addCurrencySymbol(basket.totalPrice)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:shrink md:grow'>
                        <CheckoutForm me={me}/>
                    </div>
                </div>
            </div>
        </section>
    );
}