import Header from '@/components/Header';
import AuctionComponent from '@/components/auction/AuctionComponent';
import '@/styles/Auction.scss'


const Auction = () => {
    return (
        <>
            <Header/>
            <div className="auction">
                <h1>Auction Page</h1>
                <p>Welcome to the auction page. Here you can view and participate in auctions.</p>
                <div className='auction__card'>
                    <AuctionComponent/>
                    <AuctionComponent/>
                </div>
            </div>
        </>
        
    );
}

export default Auction;