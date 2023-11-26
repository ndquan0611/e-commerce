import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './SelectOption.module.scss';

function SelectOption({ icon }) {
    return <div className={classNames(styles.wrapper)}>{icon}</div>;
}

SelectOption.propTypes = {
    icon: PropTypes.object.isRequired,
};

export default SelectOption;
