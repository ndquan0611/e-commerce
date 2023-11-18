import classNames from 'classnames/bind';

import * as appService from '~/services/appService';
import styles from './Sidebar.module.scss';
import { useEffect } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    useEffect(() => {
        const fetch = async () => {
            const res = await appService.apiGetCategories();
            console.log(res);
        };
        fetch();
    }, []);

    return (
        <aside className={cx('wrapper')}>
            <h1>Sidebar page</h1>
        </aside>
    );
}

export default Sidebar;
