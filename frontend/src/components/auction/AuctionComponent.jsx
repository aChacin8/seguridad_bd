import {Card, Button} from 'react-bootstrap';
import '@/styles/Auction.scss'
    
const AuctionComponent = () => {
    return  (
        <>
            <Card className='auction__card'>
                <Card.Body>
                    <Card.Title>Subastas En linea</Card.Title>
                    <Card.Text>Contenido</Card.Text>
                    <Button>Participar</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default AuctionComponent;