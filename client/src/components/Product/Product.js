import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Image from '../Image';

const cx = classNames.bind(styles);

function Product({ data }) {
    return (
        <div>
            <Image src={data.images[0] || ''} alt={data.title} />
            <div className={cx('info')}>
                <h4>{data.title}</h4>
            </div>
        </div>
    );
}

Product.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Product;
