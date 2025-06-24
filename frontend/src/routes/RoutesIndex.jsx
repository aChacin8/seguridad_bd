import {Routes, Route} from 'react-router-dom';
import { useAuthContext } from '@/hooks/useAuthContext';
import SignUp from '@/pages/auth/SignUp';
import Home from '@/pages/home/Home';
import Login from '@/pages/auth/Login';
import Auction from '@/pages/auction/Auction';
import Profile from '@/pages/profile/Profile';
import AdminLoginPage from '../pages/auth/AdminLoginPage';
import IdAuction from '../pages/auction/IdAuction';

const RoutesIndex = () => {
    const {isAuth} = useAuthContext(); // Consumir el contexto de autenticación
    return (
        <Routes>
            <Route path='/' element= {<SignUp/>}/>
            <Route path='/SignUp' element= {<SignUp/>}/>
            <Route path='/Login' element = {<Login/>}/>
            <Route path='/subasta' element = {isAuth ? <Auction/> : <Login/>}/>
            <Route path='/subasta/:id' element = {isAuth ? <IdAuction/> : <Login/>}/>
            <Route path='/perfil' element = {isAuth ? <Profile/> : <Login/>}/>
            <Route path='/admin/login' element= {<AdminLoginPage/>}/>
        </Routes>   
    );
}

export default RoutesIndex;