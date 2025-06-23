import { useEffect, useState } from 'react';
import { Card, Spinner, Alert, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import AuctionLiveComponent from '@/components/auction/AuctionLiveComponent';

const API_URL = import.meta.env.VITE_API_URL;

const IdAuction = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [auction, setAuction] = useState(null);
    const [winner, setWinner] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${API_URL}/api/auctions/${id}`)
            .then(res => res.json())
            .then(data => {
                setAuction(data);
                setLoading(false);
            });
    }, [id]);

    const handleNewPrice = (newPrice) => {
        setAuction(prev => ({ ...prev, current_price: newPrice }));
    };

    if (loading || !auction) return <Spinner animation="border" />;

    return (
        <Card className="mt-4 p-3">
            <Card.Img src={auction.url} style={{ width: '30%', margin: 'auto' }} />
            <Card.Body>
                <Card.Title>{auction.title}</Card.Title>
                <Card.Text>{auction.description}</Card.Text>
                <Card.Text><strong>Precio actual:</strong> ${auction.current_price}</Card.Text>

                <AuctionLiveComponent
                    auctionId={id}
                    currentPrice={auction.current_price}
                    onNewPrice={handleNewPrice}
                    onAuctionEnded={setWinner}
                />

                {winner && (
                    <Alert variant="info" className="mt-3">
                        La subasta ha finalizado. Ganador: <strong>{winner}</strong>
                    </Alert>
                )}

                <Button variant="secondary" className="mt-3" onClick={() => navigate('/subasta')}>
                    Regresar
                </Button>
            </Card.Body>
        </Card>
    );
};

export default IdAuction;
