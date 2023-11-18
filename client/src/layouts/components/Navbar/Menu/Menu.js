import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Menu.module.scss';

function Menu({ children }) {
    return <div className={classNames(styles.wrapper)}>{children}</div>;
}

Menu.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Menu;
