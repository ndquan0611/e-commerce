import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { ListIcon } from '~/components/Icons';
import { handleSlug } from '~/utils/helpers';
import Menu, { MenuItem } from './Menu';
import styles from './Sidebar.module.scss';

const cx = classNames.bind(styles);

function Sidebar() {
    const { categories } = useSelector((state) => state.app);

    return (
        <aside className={cx('wrapper')}>
            <div className={cx('collections')}>
                <ListIcon />
                <span className={cx('ml-[10px]')}>All Collections</span>
            </div>
            <Menu>
                {categories?.map((category) => (
                    <MenuItem key={category._id} title={category.title} to={handleSlug(category.title)} />
                ))}
            </Menu>
        </aside>
    );
}

export default Sidebar;
