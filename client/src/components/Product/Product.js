import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import { formatMoney, renderStarFromNumber } from '~/utils/helpers';
import { useState } from 'react';
import { EyeIcon, HeartIcon, MenuIcon } from '~/components/Icons';
import Image from '~/components/Image';
import SelectOption from '~/components/SelectOption';
import styles from './Product.module.scss';

const cx = classNames.bind(styles);

function Product({ data, isType }) {
    const [isShowOption, setIsShowOption] = useState(false);

    return (
        <div
            className={cx('wrapper')}
            onMouseEnter={() => setIsShowOption(true)}
            onMouseLeave={() => setIsShowOption(false)}
        >
            <div className={cx('thumbnail')}>
                <Image src={data.thumb} alt={data.title} className={cx('w-full h-auto object-cover')} />
                <div
                    className={cx(
                        'absolute top-0 right-0 w-[70px] pt-[6px] pb-[5px]',
                        `${isType ? 'bg-[#ffb400]' : 'bg-[#003cff]'}`,
                    )}
                >
                    <span className={cx('type', `${isType ? 'after:border-r-[#ffb400]' : 'after:border-r-[#003cff]'}`)}>
                        {isType ? 'New' : 'Trending'}
                    </span>
                </div>
                {isShowOption && (
                    <div
                        className={cx(
                            'absolute bottom-0 left-0 right-0 flex items-center justify-center z-10 animate-slideTop',
                        )}
                    >
                        <SelectOption icon={<HeartIcon />} />
                        <SelectOption icon={<MenuIcon />} />
                        <SelectOption icon={<EyeIcon />} />
                    </div>
                )}
            </div>
            <div className={cx('info')}>
                <h4 className={cx('title')}>
                    <Link>{data.title.toLowerCase()}</Link>
                </h4>
                <div className={cx('rating-star')}>{renderStarFromNumber(data.totalRatings)}</div>
                <p className={cx('money')}>{`${formatMoney(data.price / 100)} VND`}</p>
            </div>
        </div>
    );
}

Product.propTypes = {
    data: PropTypes.object.isRequired,
    isType: PropTypes.bool,
};

export default Product;
