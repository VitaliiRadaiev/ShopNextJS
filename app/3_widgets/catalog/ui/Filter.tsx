'use client';

import { CategoryType } from '@/app/5_entities/categories';
import { Checkbox } from '@/app/6_shared/ui/FormFields/Checkbox';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Slider } from '@mui/base/Slider';
import { Button } from '@/app/6_shared/ui/Buttons/Button';


interface FilterProps {
    category: CategoryType;
    priceRange: {
        lowestPrice: number;
        highestPrice: number;
    }
}

const boxStyles = 'px-4 py-3 border-b border-slate-300 last:border-none flex flex-col gap-2'

export function Filter({ category, priceRange }: FilterProps) {
    const searchParams = useSearchParams() || '';
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);

    const handleFilter = (toggle: boolean, param: { key: string, value: string }) => {
        if (toggle) {
            params.set(param.key, param.value);
        } else {
            params.delete(param.key)
        }
        params.set('page', '1');
        replace(`${pathname}?${params.toString()}`, {
            scroll: false
        });
    }

    return (
        <form className='lg:bg-[#e9e9e9] rounded'>
            <div className={clsx(boxStyles)}>
                <h3 className=' text-[18px] font-bold text-[#3d4d66]'>Фильтр по параметрам</h3>
            </div>
            <div className={clsx(boxStyles)}>
                <RangeSlider priceRange={priceRange} />
            </div>
            <div className={clsx(boxStyles)}>
                <Checkbox
                    defaultChecked={!!params.get('inStock')}
                    onChange={(e) =>
                        handleFilter(
                            e.target.checked,
                            { key: 'inStock', value: String(e.target.checked) }
                        )}
                >
                    Есть в наличии
                </Checkbox>
                <Checkbox
                    defaultChecked={!!params.get('isNew')}
                    onChange={(e) =>
                        handleFilter(
                            e.target.checked,
                            { key: 'isNew', value: String(e.target.checked) }
                        )}
                >
                    Новинка
                </Checkbox>
                <Checkbox
                    defaultChecked={!!params.get('isBestseller')}
                    onChange={(e) =>
                        handleFilter(
                            e.target.checked,
                            { key: 'isBestseller', value: String(e.target.checked) }
                        )}
                >
                    Хит
                </Checkbox>
                <Checkbox
                    defaultChecked={!!params.get('isRecommended')}
                    onChange={(e) =>
                        handleFilter(
                            e.target.checked,
                            { key: 'isRecommended', value: String(e.target.checked) }
                        )}
                >
                    Рекомендуем
                </Checkbox>
                <Checkbox
                    defaultChecked={!!params.get('isPromotion')}
                    onChange={(e) =>
                        handleFilter(
                            e.target.checked,
                            { key: 'isPromotion', value: String(e.target.checked) }
                        )}
                >
                    Акция
                </Checkbox>
            </div>
            {category.filters.map(filterGroup => {
                return (
                    <FilterGroup key={filterGroup.id} filterGroup={filterGroup} />
                );
            })}
            <div className={clsx(boxStyles)}>
                <Button
                    type='reset'
                    className='w-full'
                    onClick={() => replace(`${pathname}`, {
                        scroll: false
                    })}
                >
                    Сбросить
                </Button>
            </div>
        </form>
    );
}

interface FilterGroupProps {
    filterGroup: CategoryType['filters'][0]
}
function FilterGroup({ filterGroup }: FilterGroupProps) {
    const searchParams = useSearchParams() || '';
    const pathname = usePathname();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);
    const filters = params.get('filters');
    const parsedFilters: { id: string, items: string[] }[] = filters ? JSON.parse(filters) : null;
    const parsedFilterGroup = parsedFilters ? parsedFilters.find(fg => fg.id === filterGroup.id) : null;
    const state = filterGroup.items.map(filterItem => {
        if (parsedFilterGroup) {
            if (parsedFilterGroup.items.find(id => id === filterItem.id)) return true;
        }
        return false;
    });

    const handleFilter = (checked: boolean, filterItemId: string) => {
        const filters = params.get('filters');

        if (filters) {
            const parsedFilters: { id: string, items: string[] }[] = JSON.parse(filters);

            if (checked) {
                const group = parsedFilters.find(fg => fg.id === filterGroup.id);
                if (group) {
                    parsedFilters.forEach(fg => {
                        if (fg.id === filterGroup.id) {
                            fg.items = [...fg.items, filterItemId]
                        }
                    })
                } else {
                    parsedFilters.push({
                        id: filterGroup.id,
                        items: [filterItemId]
                    })
                }
            } else {
                parsedFilters.forEach(fg => {
                    if (fg.id === filterGroup.id) {
                        fg.items = Array.from(fg.items).filter(id => id !== filterItemId)
                    }
                })
            }

            params.set('filters', JSON.stringify(parsedFilters.filter(pf => !!pf.items.length)));
            params.set('page', '1');
            replace(`${pathname}?${params.toString()}`, {
                scroll: false
            });
        } else {
            if (checked) {
                params.set('filters', JSON.stringify([{
                    id: filterGroup.id,
                    items: [filterItemId]
                }]))
            }
            params.set('page', '1');
            replace(`${pathname}?${params.toString()}`, {
                scroll: false
            });
        }
    }

    return (
        <div key={filterGroup.id} className={clsx(boxStyles)}>
            <h4 className='text-[16px] font-bold text-[#3d4d66]'>{filterGroup.title}</h4>
            {filterGroup.items.map((filterItem, index) => {
                return (
                    <Checkbox
                        key={filterItem.id}
                        defaultChecked={state[index]}
                        onChange={(e) =>
                            handleFilter(
                                e.target.checked,
                                filterItem.id
                            )}
                    >
                        {filterItem.title}
                    </Checkbox>
                );
            })}

        </div>
    );
}

interface RangeSliderProps {
    priceRange: FilterProps['priceRange'];
}

function RangeSlider({ priceRange }: RangeSliderProps) {
    const searchParams = useSearchParams() || '';
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);
    const priceRangeParam = params.get('priceRange') ? JSON.parse(params.get('priceRange') || '') : undefined;
    const startValue = priceRangeParam?.from || priceRange.lowestPrice;
    const endValue = priceRangeParam?.to || priceRange.highestPrice;
    const [value, setValue] = useState<number[]>([startValue, endValue]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    useEffect(() => {
        setValue([
            startValue > priceRange.lowestPrice ? startValue : priceRange.lowestPrice,
            endValue < priceRange.highestPrice ? endValue : priceRange.highestPrice
        ]);
    }, [priceRange.lowestPrice, priceRange.highestPrice, startValue, endValue]);

    const handleFilter = () => {

        params.set('priceRange', JSON.stringify({
            from: value[0],
            to: value[1]
        }))
        params.set('page', '1');
        replace(`${pathname}?${params.toString()}`, {
            scroll: false
        });
    }

    return (
        <div>
            <div className='grid grid-cols-[1fr_1fr_auto] gap-2 mb-4'>
                <input
                    type="text"
                    value={value[0]}
                    onChange={(e) => setValue(prev => {
                        const targetValue = e.target.value.replace(/[^0-9]/g, '');
                        const value = Number(targetValue) > prev[1] ? prev[1] : Number(targetValue);
                        return [value, prev[1]]
                    })}
                    className='h-8 w-full'
                />
                <input
                    type="text"
                    value={value[1]}
                    onChange={(e) => setValue(prev => {
                        const targetValue = e.target.value.replace(/[^0-9]/g, '');
                        const value = Number(targetValue) < prev[0] ? prev[0] : Number(targetValue);
                        return [prev[0], value]
                    })}
                    className='h-8 w-full'
                />
                <Button
                    className='!h-8 !min-h-8 !px-3'
                    onClick={handleFilter}
                    type='button'
                >Ok
                </Button>
            </div>
            <Slider
                value={value}
                onChange={handleChange}
                min={priceRange.lowestPrice}
                max={priceRange.highestPrice}
                className={clsx(
                    'my-4 h-[3px] text-secondary relative block w-full',
                    '[&_.base-Slider-rail]:absolute [&_.base-Slider-rail]:h-full [&_.base-Slider-rail]:w-full',
                    '[&_.base-Slider-rail]:bg-current [&_.base-Slider-rail]:opacity-30 [&_.base-Slider-rail]:block',
                    '[&_.base-Slider-track]:absolute [&_.base-Slider-track]:h-full [&_.base-Slider-track]:block',
                    '[&_.base-Slider-track]:bg-current',
                    '[&_.base-Slider-thumb]:absolute [&_.base-Slider-thumb]:w-5 [&_.base-Slider-thumb]:h-5',
                    '[&_.base-Slider-thumb]:rounded-full [&_.base-Slider-thumb]:bg-current',
                    '[&_.base-Slider-thumb]:top-1/2 [&_.base-Slider-thumb]:-translate-y-1/2 [&_.base-Slider-thumb]:-translate-x-1/2'
                )}
            />
        </div>
    );
}

