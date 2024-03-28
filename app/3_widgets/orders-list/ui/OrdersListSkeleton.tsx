import { shimmer } from '@/app/6_shared/utils/shimmer';
import clsx from 'clsx';

export function OrdersListSkeleton() {
    return (
        <ul className='flex flex-col gap-4'>
            <li className={`${shimmer} relative overflow-hidden bg-gray-100 p-3`}>
                <div className='bg-white w-full h-full rounded p-4 flex gap-4 flex-wrap justify-between min-h-[112px] lg:min-h-[116px]'>

                    <div>
                        <div className='flex gap-2 items-end'>
                            <div className='bg-gray-100 rounded h-6 w-[150px] lg:w-[184px]'></div>
                            <p className='bg-gray-100 rounded h-5 w-[100px]'></p>
                        </div>
                        <div className='text-[14px] bg-gray-100 rounded h-[1em] w-[150px] mt-2'></div>
                    </div>
                    <div>
                        <div className='bg-gray-100 rounded h-6 w-[184px]'></div>
                    </div>
                    <div className='basis-full'>
                        <div className='basis-full bg-gray-100 rounded h-6 w-[164px]'></div>
                    </div>
                </div>
            </li>
            <li className={`${shimmer} relative overflow-hidden bg-gray-100 p-3`}>
                <div className='bg-white w-full h-full rounded p-4 flex gap-4 flex-wrap justify-between min-h-[112px] lg:min-h-[116px]'>

                    <div>
                        <div className='flex gap-2 items-end'>
                            <div className='bg-gray-100 rounded h-6 w-[150px] lg:w-[184px]'></div>
                            <p className='bg-gray-100 rounded h-5 w-[100px]'></p>
                        </div>
                        <div className='text-[14px] bg-gray-100 rounded h-[1em] w-[150px] mt-2'></div>
                    </div>
                    <div>
                        <div className='bg-gray-100 rounded h-6 w-[184px]'></div>
                    </div>
                    <div className='basis-full'>
                        <div className='basis-full bg-gray-100 rounded h-6 w-[164px]'></div>
                    </div>
                </div>
            </li>
            <li className={`${shimmer} relative overflow-hidden bg-gray-100 p-3`}>
                <div className='bg-white w-full h-full rounded p-4 flex gap-4 flex-wrap justify-between min-h-[112px] lg:min-h-[116px]'>

                    <div>
                        <div className='flex gap-2 items-end'>
                            <div className='bg-gray-100 rounded h-6 w-[150px] lg:w-[184px]'></div>
                            <p className='bg-gray-100 rounded h-5 w-[100px]'></p>
                        </div>
                        <div className='text-[14px] bg-gray-100 rounded h-[1em] w-[150px] mt-2'></div>
                    </div>
                    <div>
                        <div className='bg-gray-100 rounded h-6 w-[184px]'></div>
                    </div>
                    <div className='basis-full'>
                        <div className='basis-full bg-gray-100 rounded h-6 w-[164px]'></div>
                    </div>
                </div>
            </li>
            <li className={`${shimmer} relative overflow-hidden bg-gray-100 p-3`}>
                <div className='bg-white w-full h-full rounded p-4 flex gap-4 flex-wrap justify-between min-h-[112px] lg:min-h-[116px]'>

                    <div>
                        <div className='flex gap-2 items-end'>
                            <div className='bg-gray-100 rounded h-6 w-[150px] lg:w-[184px]'></div>
                            <p className='bg-gray-100 rounded h-5 w-[100px]'></p>
                        </div>
                        <div className='text-[14px] bg-gray-100 rounded h-[1em] w-[150px] mt-2'></div>
                    </div>
                    <div>
                        <div className='bg-gray-100 rounded h-6 w-[184px]'></div>
                    </div>
                    <div className='basis-full'>
                        <div className='basis-full bg-gray-100 rounded h-6 w-[164px]'></div>
                    </div>
                </div>
            </li>
            <li className={`${shimmer} relative overflow-hidden bg-gray-100 p-3`}>
                <div className='bg-white w-full h-full rounded p-4 flex gap-4 flex-wrap justify-between min-h-[112px] lg:min-h-[116px]'>

                    <div>
                        <div className='flex gap-2 items-end'>
                            <div className='bg-gray-100 rounded h-6 w-[150px] lg:w-[184px]'></div>
                            <p className='bg-gray-100 rounded h-5 w-[100px]'></p>
                        </div>
                        <div className='text-[14px] bg-gray-100 rounded h-[1em] w-[150px] mt-2'></div>
                    </div>
                    <div>
                        <div className='bg-gray-100 rounded h-6 w-[184px]'></div>
                    </div>
                    <div className='basis-full'>
                        <div className='basis-full bg-gray-100 rounded h-6 w-[164px]'></div>
                    </div>
                </div>
            </li>
            <li className={`${shimmer} relative overflow-hidden bg-gray-100 p-3`}>
                <div className='bg-white w-full h-full rounded p-4 flex gap-4 flex-wrap justify-between min-h-[112px] lg:min-h-[116px]'>

                    <div>
                        <div className='flex gap-2 items-end'>
                            <div className='bg-gray-100 rounded h-6 w-[150px] lg:w-[184px]'></div>
                            <p className='bg-gray-100 rounded h-5 w-[100px]'></p>
                        </div>
                        <div className='text-[14px] bg-gray-100 rounded h-[1em] w-[150px] mt-2'></div>
                    </div>
                    <div>
                        <div className='bg-gray-100 rounded h-6 w-[184px]'></div>
                    </div>
                    <div className='basis-full'>
                        <div className='basis-full bg-gray-100 rounded h-6 w-[164px]'></div>
                    </div>
                </div>
            </li>
        </ul>
    );
}