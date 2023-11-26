import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import { apiGetProducts } from '~/api/productService';
import Image from '~/components/Image';
import Product from '~/components/Product';
import styles from './BestSeller.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const tabs = [
    {
        id: 1,
        name: 'Best Seller',
    },
    {
        id: 2,
        name: 'New Arrivals',
    },
    {
        id: 3,
        name: 'Tablet',
    },
];

function BestSeller() {
    const [bestSellers, setBestSellers] = useState(null);
    const [newProducts, setNewProducts] = useState(null);
    const [activeTab, setActiveTab] = useState(1);
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await Promise.all([
                apiGetProducts({ sort: '-sold' }),
                apiGetProducts({ sort: '-createdAt' }),
            ]);
            if (response[0]?.status === 'Ok') {
                setBestSellers(response[0].data);
                setProducts(response[0].data);
            }
            if (response[1]?.status === 'Ok') setNewProducts(response[1].data);
        };
        fetchProduct();
    }, []);

    useEffect(() => {
        if (activeTab === 1) setProducts(bestSellers);
        if (activeTab === 2) setProducts(newProducts);
    }, [activeTab]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('tabs')}>
                {tabs.map((item) => (
                    <span
                        key={item.id}
                        className={cx('tab-item', `${activeTab !== item.id && 'text-[#151515] opacity-50'}`)}
                        onClick={() => setActiveTab(item.id)}
                    >
                        {item.name}
                    </span>
                ))}
            </div>

            <div className={cx('content')}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    slidesPerView={3}
                    spaceBetween={20}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    navigation={true}
                >
                    {products?.map((item) => (
                        <SwiperSlide key={item._id}>
                            <Product data={item} isType={activeTab === 1 ? false : true} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={cx('flex items-center gap-5')}>
                <Image src={images.banner1} alt="banner1" className={cx('w-full h-auto object-cover')} />
                <Image src={images.banner2} alt="banner2" className={cx('w-full h-auto object-cover')} />
            </div>
        </div>
    );
}

export default BestSeller;
