import Banner from '~/components/Banner';
import BestSeller from '~/components/BestSeller';
import DealDaily from '~/components/DealDaily';
import Sidebar from '~/components/Sidebar';

function Home() {
    return (
        <div id="Home">
            <div className="px-horizontal mb-[30px] flex gap-5">
                <Sidebar />
                <Banner />
            </div>

            <div className="px-horizontal mb-[30px] flex gap-5">
                <DealDaily />
                <BestSeller />
            </div>
        </div>
    );
}

export default Home;
