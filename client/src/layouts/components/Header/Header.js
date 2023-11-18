import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import config from '~/config';
import { CartIcon, EnvelopeIcon, PhoneIcon } from '~/components/Icons';
import Image from '~/components/Image';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('w-1/4')}>
                    <img src={images.logo} alt="Digital world" />
                </Link>

                <div className={cx('actions')}>
                    <div className={cx('action-support')}>
                        <div className={cx('heading')}>
                            <PhoneIcon className={cx('-mt-[2px]')} />
                            <span className={cx('ml-[10px]')}>(+1800) 000 8808</span>
                        </div>
                        <div className={cx('extra')}>Mon-Sat 9:00AM - 8:00PM</div>
                    </div>
                    <div className={cx('action-support')}>
                        <div className={cx('heading')}>
                            <EnvelopeIcon className={cx('-mt-[2px]')} />
                            <span className={cx('ml-[10px]')}>SUPPORT@TADATHEMES.COM</span>
                        </div>
                        <div className={cx('extra')}>Online Support 24/7</div>
                    </div>

                    <div className={cx('cart-btn')}>
                        <CartIcon />
                        <span className={cx('badge')}>12</span>
                    </div>
                    <div>
                        <Image
                            className={cx('user-avatar')}
                            src="https://down-vn.img.susercontent.com/file/637148902990db27d54ec6d27841f7db_tn"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
