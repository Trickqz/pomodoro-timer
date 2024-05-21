import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import LogoSvg from '/logo.svg';
import TimerSvg from '/timer.svg';
import RegisterSvg from '/register.svg';

interface BaseProps {
    children: ReactNode;
}

const Base: React.FC<BaseProps> = ({ children }) => {
    return (
        <div className='w-full h-full bg-[#202024] flex justify-center items-center'>
            <div className='w-[656px] h-[744px]'>
                <div className='flex items-center relative mt-12 h-12'>
                    <Link to='/'>
                        <img src={LogoSvg} alt="" />
                    </Link>
                    <div className='flex absolute right-1 items-center gap-6'>
                        <Link to='/'>
                            <img src={TimerSvg} alt="" />
                        </Link>
                        <Link to='/logs'>
                            <img src={RegisterSvg} alt="" />
                        </Link>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Base;