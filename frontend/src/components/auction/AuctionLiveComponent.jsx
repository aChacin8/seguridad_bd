import { useEffect, useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL;
const socket = io(SOCKET_URL);

const AuctionLiveComponent = ({ auctionId, currentPrice, onNewPrice, onAuctionEnded }) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [inAuction, setInAuction] = useState(false);
    const [bidAmount, setBidAmount] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit('joinAuction', auctionId);

        socket.on('timer', (seconds) => setTimeLeft(seconds));

        socket.on('newBid', ({ bidder, amount }) => {
            setMessages(prev => [`${bidder} hizo una puja de $${amount}`, ...prev]);
            onNewPrice(amount);
        });

        socket.on('auctionEnded', ({ winner }) => {
            onAuctionEnded(winner);
            setInAuction(false);
        });

        return () => {
            socket.off('timer');
            socket.off('newBid');
            socket.off('auctionEnded');
        };
    }, [auctionId]);

    const startAuction = () => {
        setInAuction(true);
        setMessages([]);
    };

    const handleBid = () => {
        const amount = parseFloat(bidAmount);
        if (isNaN(amount) || amount <= currentPrice) {
            alert('La puja debe ser mayor al precio actual');
            return;
        }

        socket.emit('userBid', {
            auctionId,
            bidder: 'Usuario',
            amount
        });

        setBidAmount('');
    };

    return (
        <>
            <p><strong>Tiempo restante:</strong> {timeLeft ?? 'Esperando...'}</p>

            {!inAuction && (
                <Button variant="success" onClick={startAuction}>
                    Participar
                </Button>
            )}

            {inAuction && timeLeft > 0 && (
                <>
                    <input
                        type="number"
                        className="form-control my-2"
                        placeholder="Cantidad a pujar"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                    />
                    <p  style={{ fontSize: '0.8rem', color: 'gray', marginTop: '1rem' }} >Ingresa un monto ideal (El monto debe ser completo)</p>
                    <Button variant="primary" onClick={handleBid}>
                        Pujar
                    </Button>
                </>
            )}

            {inAuction && timeLeft === 0 && (
                <Alert variant="info">La subasta ha terminado.</Alert>
            )}

            {messages.length > 0 && (
                <div className="mt-3">
                    <h5>Historial de pujas:</h5>
                    <ul>
                        {messages.map((msg, i) => <li key={i}>{msg}</li>)}
                    </ul>
                </div>
            )}
        </>
    );
};

export default AuctionLiveComponent;
