import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '@/hooks/useAuthContext';
import '@/styles/Header.scss';


const Header = () => {
    const {isAuth, logout} = useAuthContext(); //Consumir el contexto para determinar ciertas acciones
    
    const linkIsActive = (isActive) => isActive ? 'navbar__nav--ref active' : 'navbar__nav--ref'; 

    return (
        <Navbar  className='navbar'>
            <Container>
                <Navbar.Brand href='/'><img src="*" alt="Logo" className='navbar__logo'/></Navbar.Brand>
                <Nav className='navbar__nav'>
                    {isAuth ? (
                        <>
                            <NavLink to='/subasta' className={({isActive})=> linkIsActive(isActive)}>Subastas</NavLink>
                            {/* <NavLink to='/perfil' className={({isActive})=> linkIsActive(isActive)}>Perfil</NavLink> */}
                            <NavLink to='/' onClick={logout} className={({isActive})=> linkIsActive(isActive)}>Cerrar Sesion</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to='/Login' className={({isActive})=> linkIsActive(isActive)}>Inicia Sesion</NavLink>
                            <NavLink to='/SignUp' className={({isActive})=> linkIsActive(isActive)}>Registrate</NavLink>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header; 