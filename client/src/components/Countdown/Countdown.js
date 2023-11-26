import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Countdown.module.scss';

const cx = classNames.bind(styles);

function Countdown({ number, unit }) {
    return (
        <div className={cx('wrapper')}>
            <span className={cx('text-[18px] font-semibold text-[#151515]')}>{number}</span>
            <span className={cx('text-[12px] font-normal text-[#8b8b8b]')}>{unit}</span>
        </div>
    );
}

Countdown.propTypes = {
    number: PropTypes.number,
    unit: PropTypes.string,
};

export default Countdown;
