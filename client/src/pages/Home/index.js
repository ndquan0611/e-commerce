import Banner from '~/components/Banner';
import Sidebar from '~/components/Sidebar';

function Home() {
    return (
        <div>
            <div className="-mx-[20px]">
                <div className="px-horizontal mb-[30px] flex gap-5">
                    <Sidebar />
                    <Banner />
                </div>
            </div>
        </div>
    );
}

export default Home;
