import { LogOut } from '@/app/4_features/authentication';
import { CabinetNav } from '@/app/5_entities/cabinet';
import clsx from 'clsx';

export default function cabinetLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className=''>
            <section className="py-9 lg:py-20">
                <div className="container">
                    <div className='lg:grid grid-cols-[250px_1fr] gap-8'>
                        <CabinetNav>
                            <LogOut />
                        </CabinetNav>
                        <div className='mt-4 lg:mt-0'>
                            {children}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}