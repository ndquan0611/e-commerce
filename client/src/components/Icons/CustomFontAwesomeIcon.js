import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CustomFontAwesomeIcon({ icon, height, ...restProps }) {
    const styles = height ? { height } : null;

    return <FontAwesomeIcon icon={icon} style={styles} {...restProps} />;
}

export default CustomFontAwesomeIcon;
