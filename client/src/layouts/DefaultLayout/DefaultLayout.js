import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchGetCategories } from '~/features/appSlice';
import Header from '~/layouts/components/Header';
import Navbar from '~/layouts/components/Navbar';
import Footer from '~/layouts/components/Footer';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchGetCategories());
    });

    return (
        <div className={cx('wrapper')}>
            <Header />
            <Navbar />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
