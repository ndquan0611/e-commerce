import {
    faEnvelope,
    faPhone,
    faCartShopping,
    faCaretDown,
    faList,
    faStar,
    faBars,
    faHeart,
    faEye,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarHollow } from '@fortawesome/free-regular-svg-icons';
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

export const ListIcon = ({ width = '1rem', height = '1rem', className }) => (
    <CustomFontAwesomeIcon icon={faList} className={className} width={width} height={height} />
);

export const StarIcon = ({ width = '1.25rem', height = '1.25rem', className }) => (
    <CustomFontAwesomeIcon icon={faStar} className={className} width={width} height={height} color="#d11" />
);

export const StarHollowIcon = ({ width = '1.25rem', height = '1.25rem', className }) => (
    <CustomFontAwesomeIcon icon={faStarHollow} className={className} width={width} height={height} />
);

export const MenuIcon = ({ width = '0.9 rem', height = '0.9 rem', className }) => (
    <CustomFontAwesomeIcon icon={faBars} className={className} width={width} height={height} />
);

export const HeartIcon = ({ width = '0.9 rem', height = '0.9 rem', className }) => (
    <CustomFontAwesomeIcon icon={faHeart} className={className} width={width} height={height} />
);

export const EyeIcon = ({ width = '0.9 rem', height = '0.9 rem', className }) => (
    <CustomFontAwesomeIcon icon={faEye} className={className} width={width} height={height} />
);
