import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Banner() {
    return (
        <div className={cx('wrapper')}>
            <Image
                src="https://digital-world-2.myshopify.com/cdn/shop/files/slideshow3-home2_1920x.jpg?v=1613166679"
                alt="banner"
                className={cx('w-full h-[480px] object-cover')}
            />
        </div>
    );
}

export default Banner;
