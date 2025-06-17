import Header from '@/components/Header';
import AuctionComponent from '@/components/auction/AuctionComponent';
import '@/styles/Auction.scss'


const Auction = () => {
    return (
        <>
            <Header/>
            <div className="auction">
                <h1>RacketBid</h1>
                <p>En esta pagina podras participar en las subastas.</p>
                <div className='auction__card'>
                    <AuctionComponent/>
                </div>
            </div>
        </>
        
    );
}

export default Auction;