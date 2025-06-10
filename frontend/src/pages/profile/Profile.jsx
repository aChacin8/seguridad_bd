import { Card, Button } from "react-bootstrap";
import { useAuthContext } from '@/hooks/useAuthContext';
import { useEffect } from "react";
import Header from '@/components/Header'
import UpdateProfileComponent from "@/components/profile/UpdateProfileComponent";
import '@/styles/Profile.scss'


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

    useEffect(() => {
        const userById = async () => {
            try {
                const response = await fetch(`${API_URL}/api/users/${userPayload.id_users}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });

                const result = await response.json();                
                setUserData(result);
            } catch (error) {
                console.log("Error al encontrar por Id", error);
            }
        };

        userById();
    }, [userPayload, token, setUserData]);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    }

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
                                onClick={()=> handleEdit (userData)}
                                >
                                    Editar
                                </Button>
                        </div>
                    )}
                </Card.Body>
            </Card>
            <UpdateProfileComponent/>
            </div>
        </>
    );
};

export default Profile;
