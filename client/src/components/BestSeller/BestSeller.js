import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { apiGetProducts } from '~/api/productService';
import Product from '~/components/Product';
import styles from './BestSeller.module.scss';

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

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await Promise.all([
                apiGetProducts({ sort: '-sold' }),
                apiGetProducts({ sort: '-createdAt' }),
            ]);
            if (response[0]?.status === 'Ok') setBestSellers(response[0].data);
            if (response[1]?.status === 'Ok') setNewProducts(response[1].data);
        };
        fetchProduct();
    }, []);

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
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {bestSellers?.map((e) => (
                        <SwiperSlide key={e.id}>
                            <Product data={e} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default BestSeller;
