import  { useEffect, useState } from 'react';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import '@/styles/Auction.scss';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL; // URL de la API desde el archivo .env

const AuctionComponent = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/auctions`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener subastas');
        return res.json();
      })
      .then((data) => {
        
        setAuctions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="auction-list">
      {auctions.length === 0 && <p>No hay subastas activas.</p>}

      {auctions.map((auction) => (
        <Card className="auction__card" key={auction.id_auctions} style={{ marginBottom: '1rem' }}>
          <Card.Body>
            <Card.Title>{auction.title}</Card.Title>
            <Card.Text>{auction.description}</Card.Text>
            <Card.Img src={auction.url } alt={auction.title} style={{width: '20%'}}/>
            <Card.Text>
              <strong>Precio inicial:</strong> ${auction.start_price}
            </Card.Text>
            <Card.Text>
              <strong>Precio actual:</strong> ${auction.current_price}
            </Card.Text>
            <Button variant="primary" onClick={() => navigate(`/perfil`) }>
              Entrar a Subasta
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default AuctionComponent;
