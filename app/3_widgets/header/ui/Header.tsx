'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import headerBg from '@/public/images/header-bg.jpg';
import Logo from '@/public/logos/main-logo.svg';
import IconBasket from '@/public/icons/basket.svg';
import IconKey from '@/public/icons/key.svg';
import IconTelegram from '@/public/icons/telegram.svg';
import IconSearch from '@/public/icons/search.svg';
import IconClose from '@/public/icons/x-mark.svg';
import { UserIcon, ClipboardDocumentListIcon, StarIcon } from '@heroicons/react/24/solid';

import Link from 'next/link';
import { Badge } from '@mui/base/Badge';
import { CategoryType } from '@/app/5_entities/categories';
import { CSSTransition } from 'react-transition-group';
import { addCurrencySymbol } from '@/app/6_shared/utils/addCurrencySymbol';
import { HeaderCategories } from './HeaderCategories';
import { Burger } from './Burger';
import { Menu } from './Menu';
import { usePathname } from 'next/navigation';
import { Search } from '@/app/4_features/main-search';
import { UserType } from '@/app/5_entities/users';
import { BasketType } from '@/app/5_entities/basket';
import { WishlistType } from '@/app/5_entities/wishlist';

interface HeaderProps {
    categories: CategoryType[];
    user?: UserType;
    basket?: BasketType;
    wishlist?: WishlistType;
}

export function Header({ categories, user, basket, wishlist }: HeaderProps) {
    const [isMode, setIsMode] = useState(false);
    const searchOverlayRef = useRef(null);
    const basketQuantityRef = useRef(basket?.products.length);
    const pageYOffset = useRef<number>(0);
    const [isHeaderShow, setIsHeaderShow] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();


    const headerScrollHandler = (e: Event) => {
        if (window.scrollY > 200) {
            if (window.scrollY > pageYOffset.current) {
                setIsHeaderShow(false);
            } else if (window.scrollY < pageYOffset.current) {
                setIsHeaderShow(true);
            }
        }

        pageYOffset.current = window.scrollY;


    }

    const searchShowToggle = (state: boolean) => {
        if (state) {
            document.documentElement.classList.add('overflow-hidden');
            setIsMode(true);
        } else {
            document.documentElement.classList.remove('overflow-hidden');
            setIsMode(false);
        }
    }

    useEffect(() => {
        setIsHeaderShow(true);
        searchShowToggle(false);
        setIsMobileMenuOpen(false);
    }, [pathname])

    useEffect(() => {
        pageYOffset.current = window.scrollY;
        window.addEventListener('scroll', headerScrollHandler);

        const id = setInterval(() => {
            if(window.scrollY < 300) {
                setIsHeaderShow(true);
            }
        }, 200);

        return () => {
            clearInterval(id);
            window.removeEventListener('scroll', headerScrollHandler)
        };
    }, [])

    useEffect(() => {
        if (basketQuantityRef.current !== basket?.products.length) {
            if (!isHeaderShow) {
                setIsHeaderShow(true);
            }
        }
    }, [basket?.products.length])

    return (
        <>
            <header className={clsx(
                'fixed w-full z-30 transition-transform',
                {
                    '-translate-y-full': !isHeaderShow,
                    'drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]': isMobileMenuOpen
                }
            )}>
                <div className='relative bg-primary'>
                    <Image
                        src={headerBg}
                        alt=''
                        className='absolute inset-0 object-cover z-1 w-full h-full transition-opacity opacity-0'
                        onLoad={(img) => img.currentTarget.style.opacity = '1'}
                    />

                    <div className='container flex items-center justify-between gap-8 relative z-2 py-3 lg:py-6'>
                        <Link href="/">
                            <Logo className='w-full max-w-[135px] lg:max-w-[328px]' />
                        </Link>
                        <div className='flex items-start justify-between grow-0 gap-4 lg:gap-6'>
                            <div className="flex flex-col items-end hidden lg:block" >
                                <Link
                                    href='tel:380932290322'
                                    className='text-2xl font-bold transition-colors text-slate-300 whitespace-nowrap hover:text-white'
                                >+380 (93) 22-903-22</Link>
                                <Link href='https://t.me/VitaliiRadaiev' className='flex gap-2 items-center text-secondary text-sm justify-end transition-colors hover:text-secondary-light'>
                                    <IconTelegram className="h-4 shrink-0 grow-0 w-auto" />
                                    Написать в Telegram
                                </Link>
                            </div>

                            {user?.isIdentified
                                ? <>
                                    <Link href="/cabinet" className='text-secondary hover:text-secondary-light transition-colors'>
                                        <UserIcon className='h-6 w-auto w-auto' />
                                    </Link>
                                    <Link href="/cabinet/orders" className='text-secondary hover:text-secondary-light transition-colors'>
                                        <ClipboardDocumentListIcon className='h-6 w-auto w-auto' />
                                    </Link>
                                    <Link href="/cabinet/wishlist" className='text-secondary hover:text-secondary-light transition-colors'>
                                        <Badge
                                            badgeContent={wishlist?.products.length}
                                            slotProps={{
                                                root: {
                                                    className: 'relative shrink-0 grow-0'
                                                },
                                                badge: {
                                                    className: clsx(
                                                        'text-[11px] text-white font-bold absolute',
                                                        'top-0 right-0 z-2',
                                                        'flex justify-center items-center',
                                                        'h-5 min-w-5 rounded-full',
                                                        'translate-x-1/2 translate-y-[-27%]',
                                                        'bg-info border-2 border-white',
                                                        {
                                                            'hidden': !wishlist?.products.length
                                                        }
                                                    )
                                                }
                                            }}
                                        >
                                            <StarIcon className='h-6 w-auto w-auto' />
                                        </Badge>
                                    </Link>
                                </>
                                : <Link href='/authorization' className='hidden lg:flex gap-3 text-secondary hover:text-secondary-light transition-colors'>
                                    <div className=' shrink-0 grow-0'>
                                        <IconKey className='h-6 w-auto' />
                                    </div>
                                    <div className="pt-1">
                                        <div className="mb-1 font-bold text-[17px] leading-tight">Войти</div>
                                        <div className=' text-slate-300 text-sm whitespace-nowrap'>Мой кабинет</div>
                                    </div>
                                </Link>
                            }

                            <Link href='/basket' className='flex gap-3 text-secondary hover:text-secondary-light transition-colors'>
                                <Badge
                                    badgeContent={basket?.products.length}
                                    slotProps={{
                                        root: {
                                            className: 'relative shrink-0 grow-0'
                                        },
                                        badge: {
                                            className: clsx(
                                                'text-[11px] text-white font-bold absolute',
                                                'top-0 right-0 z-2',
                                                'flex justify-center items-center',
                                                'h-5 min-w-5 rounded-full',
                                                'translate-x-1/2 translate-y-[-27%]',
                                                'bg-info border-2 border-white',
                                                {
                                                    'hidden': !basket?.products.length
                                                }
                                            )
                                        }
                                    }}
                                >
                                    <IconBasket className='h-6 w-auto w-auto' />
                                </Badge>
                                <div className="pt-1 hidden lg:block">
                                    <div className="mb-1 font-bold text-[17px] leading-tight">Корзина</div>
                                    <div className=' text-slate-300 text-sm text-right'>
                                        {addCurrencySymbol(basket?.totalPrice || 0, { space: true })}
                                    </div>
                                </div>
                            </Link>

                        </div>
                    </div>
                </div>

                <div className='bg-secondary'>
                    <div className="container flex items-center justify-between relative">
                        <div className='lg:hidden flex -ms-1'>
                            <Burger isActive={isMobileMenuOpen} onClick={() => {
                                setIsMobileMenuOpen(state => {
                                    if (!state) {
                                        document.documentElement.classList.add('overflow-hidden');
                                    } else {
                                        document.documentElement.classList.remove('overflow-hidden');
                                    }
                                    return !state;
                                });
                            }} />
                        </div>
                        <div className="shrink grow min-w-0 hidden lg:block">
                            <HeaderCategories categories={categories} />
                        </div>
                        <button
                            className=' shrink-0 grow-0 h-10 p-2 text-white transition hover:bg-secondary-light lg:min-w-20 flex items-center justify-center lg:border-r lg:border-l lg:border-slate-500 -me-2 lg:me-0'
                            onClick={() => searchShowToggle(true)}
                        >
                            <IconSearch className="h-7 w-auto max-h-full" />
                        </button>
                    </div>
                </div>

            </header>

            <CSSTransition
                in={isMode}
                timeout={400}
                mountOnEnter
                unmountOnExit
                classNames={{
                    enter: 'opacity-0',
                    enterActive: 'transition-opacity opacity-100 duration-400',
                    exit: '',
                    exitActive: 'transition-opacity opacity-0 duration-400'
                }}
                nodeRef={searchOverlayRef}
            >
                <div
                    ref={searchOverlayRef}
                    onClick={() => searchShowToggle(false)}
                    className="fixed z-40 inset-0 h-dvh w-dvw bg-slate-700/50 pt-[48px] lg:pt-[100px] px-4"
                >
                    <div
                        className={`flex max-w-3xl mx-auto w-full`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Search />
                        <button
                            className='shrink-0 grow-0 h-10 p-2 text-white transition bg-secondary hover:bg-secondary-light min-w-12 flex items-center justify-center border-l border-slate-500'
                            onClick={() => searchShowToggle(false)}
                        >
                            <IconClose className="h-7 w-auto max-h-full" />
                        </button>
                    </div>
                </div>
            </CSSTransition>

            <Menu isOpen={isMobileMenuOpen} categories={categories} />

            <div className='pt-[88px] lg:pt-[140px]'></div>
        </>
    );
}