'use client';

import { Spinner } from '@/app/6_shared/ui/Spinner';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { changeOrderedProductCountAction } from '../lib/actions';

interface ChangeQuantityProps {
    orderProductId: string;
    value: number;
}

export function ChangeQuantity({ orderProductId, value }: ChangeQuantityProps) {

    const changeCounTHandler = async (newValue: number) => {
        if ((newValue === value) || newValue < 1) return;
        changeOrderedProductCountAction(orderProductId, newValue);
    }

    return (
        <div className='flex gap-2'>
            <form
                action={changeCounTHandler.bind(null, value - 1)}
                className=' shrink-0 grow-0'>
                <ButtonSubmit>
                    <MinusIcon />
                </ButtonSubmit>
            </form>
            <form
                action={async (formData: FormData) => {
                    const rawFormData = Object.fromEntries(formData.entries());
                    changeCounTHandler(+rawFormData.count)
                }}
                className=' shrink-0 grow-0'
            >

                <InputSubmit value={value.toString()} />
            </form>
            <form
                action={changeCounTHandler.bind(null, value + 1)}
                className=' shrink-0 grow-0'>
                <ButtonSubmit>
                    <PlusIcon />
                </ButtonSubmit>
            </form>
        </div>
    );
}

function ButtonSubmit({ children }: PropsWithChildren) {
    const { pending } = useFormStatus();
    return (
        <button
            className={clsx(
                'h-9 w-9 p-1 flex items-center justify-center cursor-pointer',
                'bg-[#f1f1f1] rounded text-primary',
                'transition hover:bg-[#e9e9e9]',
                {
                    'cursor-default pointer-events-none': pending
                }
            )}
            onClick={(e) => {
                if (pending) e.preventDefault();
            }}
        >
            {pending
                ? <Spinner className='w-4/5 h-auto' />
                : <>{children}</>
            }
        </button>
    );
}

function InputSubmit({ value }: { value: string }) {
    const [inputValue, setInputValue] = useState<string>(value);
    const { pending } = useFormStatus();
    const buttonRef = useRef<HTMLButtonElement>(null)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (/^\d*$/.test(inputValue)) {
            setInputValue(inputValue);
        }
    };

    useEffect(() => {
        setInputValue(value);
    }, [value])

    return (
        <div
            className={
                clsx(
                    'bg-[#f1f1f1] h-9 w-9 flex items-center justify-center text-[16px]',
                    'rounded font-bold text-[#5E616B]'
                )
            }>
            {pending
                ? <Spinner className='w-4/5 h-auto' />
                : <>
                    <input
                        name='count'
                        value={inputValue}
                        onChange={handleChange}
                        onBlur={(e) => {
                            if(+e.target.value < 1) {
                                setInputValue('1');
                                return;
                            }
                            if (buttonRef) {
                                buttonRef.current?.click();
                            }
                        }}
                        type='text'
                        className={clsx(
                            'bg-[#f1f1f1] h-9 w-9 p-1 flex items-center justify-center text-[16px]',
                            'rounded font-bold text-[#5E616B] outline outline-1 outline-[#c9c9c9]',
                            'text-center'
                        )}
                    />
                    <button ref={buttonRef} ></button>
                </>
            }
        </div>
    );
}

