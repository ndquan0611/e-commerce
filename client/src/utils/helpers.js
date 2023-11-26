import { StarHollowIcon, StarIcon } from '~/components/Icons';

export const handleSlug = (str) =>
    str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .split(' ')
        .join('-');

export const formatMoney = (number) => Number(number.toFixed(1) * 23000).toLocaleString();

export const renderStarFromNumber = (number, size) => {
    if (!Number(number)) return;

    const stars = [];
    for (let i = 0; i < +number; i++)
        stars.push(<StarIcon key={i} width={size || 12} height={size || 12} className={'text-[#f1b400]'} />);
    for (let i = 5; i > +number; i--)
        stars.push(<StarHollowIcon key={i} width={size || 12} height={size || 12} className={'text-[#f1b400]'} />);
    return stars;
};
