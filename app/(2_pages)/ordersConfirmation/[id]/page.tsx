import { OrderCard, fetchHistory } from '@/app/5_entities/orders';
import { fetchOrderById } from '@/app/5_entities/orders/lib/fetches';
import { fetchMe } from '@/app/5_entities/users';
import { ButtonLink } from '@/app/6_shared/ui/Buttons/ButtonLink';
import { H2 } from '@/app/6_shared/ui/Titles';
import clsx from 'clsx';

export default async function pageOrdersConfirmation({ params }: { params: { id: string } }) {
    const id = params.id;
    const order = await fetchOrderById(+id);
    const me = await fetchMe();

    if (!order) {
        return (
            <main>
                <div className="py-9 lg:py-20">
                    <div className="container">
                        <H2>У вас пока нет ни однго заказа.</H2>

                        <div className='mt-4'>
                            <ButtonLink href='/categories'>Вернуться к покупкам</ButtonLink>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            <div className="py-9 lg:py-20">
                <div className="container">
                    <H2>заказ принят, спасибо!</H2>

                    <div className="mt-4">
                        <OrderCard order={order} isFullContentShow={true} />
                    </div>
                    <div className='mt-4 flex flex-wrap gap-4'>
                        <ButtonLink href='/categories'>Вернуться к покупкам</ButtonLink>
                        {me && me.isIdentified &&
                            <ButtonLink href='/cabinet/orders'>Посмотреть историю заказов</ButtonLink>
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}