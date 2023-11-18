import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';

import Menu, { MenuItem } from './Menu';
import { ArrowDownIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Navbar() {
    return (
        <nav className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('navbar')}>
                    <Menu>
                        <MenuItem title={'Home'} icon={<ArrowDownIcon />} />
                        <MenuItem title={'Mega menu'} icon={<ArrowDownIcon />} />
                        <MenuItem title={'Collection layout'} icon={<ArrowDownIcon />} />
                        <MenuItem title={'Pages'} icon={<ArrowDownIcon />} />
                        <MenuItem title={'Blog'} icon={<ArrowDownIcon />} />
                        <MenuItem title={'Contact us'} />
                    </Menu>
                    <div className={cx('search')}>
                        <input placeholder="Search something" />
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
