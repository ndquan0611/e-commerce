import { faEnvelope, faPhone, faCartShopping, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import CustomFontAwesomeIcon from '~/components/Icons/CustomFontAwesomeIcon';

export const PhoneIcon = ({ width = '0.8125rem', height = '0.8125rem', className }) => (
    <CustomFontAwesomeIcon icon={faPhone} className={className} width={width} height={height} color="#ee3131" />
);

export const EnvelopeIcon = ({ width = '0.8125rem', height = '0.8125rem', className }) => (
    <CustomFontAwesomeIcon icon={faEnvelope} className={className} width={width} height={height} color="#ee3131" />
);

export const CartIcon = ({ width = '1.5rem', height = '1.5rem', className }) => (
    <CustomFontAwesomeIcon icon={faCartShopping} className={className} width={width} height={height} color="#ee3131" />
);

export const ArrowDownIcon = ({ width = '0.625rem', height = '0.625rem', className }) => (
    <CustomFontAwesomeIcon icon={faCaretDown} className={className} width={width} height={height} />
);
