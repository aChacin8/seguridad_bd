import { useEffect, useState } from "react";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '@/hooks/useAuthContext';
import Header from '@/components/Header';
import UpdateProfileComponent from "@/components/profile/UpdateProfileComponent";
import '@/styles/Profile.scss';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
  const {
    token,
    userPayload,
    setShowModal,
    setSelectedUser,
    userData,
    setUserData
  } = useAuthContext();

  const [auctionId, setAuctionId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar usuario autenticado
  useEffect(() => {
    if (!userPayload?.id_users) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/api/users/${userPayload.id_users}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Error al obtener datos del usuario');
        const result = await response.json();
        setUserData(result);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        setError("No se pudo cargar el perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userPayload, token, setUserData]);

  // Cargar subasta activa
  useEffect(() => {
    fetch(`${API_URL}/api/auctions`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener subastas');
        return res.json();
      })
      .then((data) => {
        const active = data.find(a => a.status === 'pending' && a.active);
        if (active) setAuctionId(active.id_auctions);
      })
      .catch((err) => {
        console.error("Error al buscar subasta activa:", err);
      });
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleContinue = () => {
    if (auctionId) {
      navigate(`/subasta/${auctionId}`);
    } else {
      alert('No hay subasta activa en este momento.');
    }
  };

  if (loading) return <Spinner animation="border" className="mt-4" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <Header />
      <div className="profile">
        <Card className="userCard">
          <Card.Body className="userCard__body">
            <Card.Title>Perfil</Card.Title>
            {userData && (
              <div className="userCard__content">
                <Card.Text>Nombre: {userData.first_name}</Card.Text>
                <Card.Text>Apellido: {userData.last_name}</Card.Text>
                <Card.Text>Dirección: {userData.address}</Card.Text>
                <Card.Text>Teléfono: {userData.phone_num}</Card.Text>
                <Card.Text>RFC: {userData.rfc}</Card.Text>
                <Button
                  variant="primary"
                  className='userCard__buttonUpdate'
                  onClick={() => handleEdit(userData)}
                >
                  Editar
                </Button>
              </div>
            )}
            <Button variant="secondary" className="mt-3" onClick={() => navigate('/subasta')}>
              Regresar
            </Button>
            <Button variant="success" className="mt-3 ms-2" onClick={handleContinue}>
              Continuar
            </Button>
          </Card.Body>
        </Card>
        <UpdateProfileComponent />
      </div>
    </>
  );
};

export default Profile;
