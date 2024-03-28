import { OrdersList, OrdersListSkeleton } from '@/app/3_widgets/orders-list';
import clsx from 'clsx';
import { Suspense } from 'react';

export default function ordersPage() {
    return (
        <Suspense fallback={<OrdersListSkeleton />}>
            <OrdersList />
        </Suspense>
    );
}