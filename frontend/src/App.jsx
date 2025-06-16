
import './App.css';
import RoutesIndex from '@/routes/RoutesIndex';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';

function App() {

  return (
    <>
    <AuthProvider>
        <BrowserRouter>
          <RoutesIndex/>
        </BrowserRouter>
    </AuthProvider>
    </>
      
  )
}

export default App
