import { AuthForm } from '@/app/4_features/authentication';
import { ScrollTop } from '@/app/6_shared/ui/ScrollTop';
import { H2 } from '@/app/6_shared/ui/Titles';

export default function authorizationPage() {
    return (
        <main>
            <section className='py-9 lg:py-20'>
                <div className="container">
                    <H2>Авторизация</H2>
                    <AuthForm />
                </div>
            </section >
            <ScrollTop />
        </main >
    );
}