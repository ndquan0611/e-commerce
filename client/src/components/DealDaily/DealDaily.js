import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { formatMoney, renderStarFromNumber } from '~/utils/helpers';
import { apiGetProducts } from '~/api/productService';
import { MenuIcon, StarIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Button from '~/components/Button';
import Countdown from '~/components/Countdown';
import styles from './DealDaily.module.scss';

const cx = classNames.bind(styles);

let timer;
function DealDaily() {
    const [dealDaily, setDealDaily] = useState(null);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [expireTime, setExpireTime] = useState(false);

    const fetchDealDaily = async () => {
        const res = await apiGetProducts({ limit: 1, page: Math.round(Math.random() * 10) });
        if (res.status === 'Ok') {
            setDealDaily(res.data[0]);
            setHour(24);
            setMinute(59);
            setSecond(59);
        }
    };

    // useEffect(() => {
    //     fetchDealDaily();
    // }, []);

    useEffect(() => {
        fetchDealDaily();
        return () => {
            clearInterval(timer);
        };
    }, [expireTime]);

    useEffect(() => {
        timer = setInterval(() => {
            console.log('Interval');
            if (second > 0) setSecond((prev) => prev - 1);
            else {
                if (minute > 0) {
                    setMinute((prev) => prev - 1);
                    setSecond(59);
                } else {
                    if (hour > 0) {
                        setHour((prev) => prev - 1);
                        setMinute(59);
                        setSecond(59);
                    } else {
                        setExpireTime(!expireTime);
                    }
                }
            }
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, [second, minute, hour, expireTime]);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('header')}>
                <StarIcon className={cx('absolute left-0 top-[2px]')} />
                <span>Daily Deals</span>
            </h2>
            <div className={cx('content')}>
                <div className={cx('thumb')}>
                    <Image src={dealDaily?.thumb} alt={dealDaily?.title} className={cx('w-full h-auto object-cover')} />
                </div>
                <div className={cx('info')}>
                    <h4 className={cx('title')}>
                        <Link>{dealDaily?.title.toLowerCase()}</Link>
                    </h4>
                    <div className={cx('rating-star')}>{renderStarFromNumber(dealDaily?.totalRatings, 16)}</div>
                    <p className={cx('money')}>{`${formatMoney(dealDaily?.price / 100)} VND`}</p>
                </div>
            </div>

            <div className={cx('flex items-center mb-[15px] gap-2')}>
                <Countdown number={hour} unit={'Hours'} />
                <Countdown number={minute} unit={'Minutes'} />
                <Countdown number={second} unit={'Seconds'} />
            </div>

            <Button primary leftIcon={<MenuIcon />} className={cx('option-btn')}>
                Options
            </Button>
        </div>
    );
}

export default memo(DealDaily);
