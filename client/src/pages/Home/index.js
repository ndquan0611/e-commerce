import Banner from '~/components/Banner';
import BestSeller from '~/components/BestSeller';
import Sidebar from '~/components/Sidebar';

function Home() {
    return (
        <div id="Home">
            <div className="px-horizontal mb-[30px] flex gap-5">
                <Sidebar />
                <Banner />
            </div>

            <div className="px-horizontal mb-[30px] flex gap-5 overflow-hidden">
                <div className="w-1/4"></div>
                <BestSeller />
            </div>
        </div>
    );
}

export default Home;
