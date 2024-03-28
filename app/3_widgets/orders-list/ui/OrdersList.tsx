import { OrderCard, fetchHistory } from '@/app/5_entities/orders';
import clsx from 'clsx';

export async function OrdersList() {
    const userOrders = await fetchHistory();

    if (!userOrders || !userOrders.orders.length) {
        return (
            <p>Список пуст.</p>
        );
    }
    
    return (
        <ul className=''>
            {userOrders.orders.map(order => {
                return (
                    <li key={order.id} className='[&:not(:first-child)]:mt-4'>
                        <OrderCard order={order} />
                    </li>
                );
            })}
        </ul>
    );
}