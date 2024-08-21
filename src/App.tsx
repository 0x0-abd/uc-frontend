import './App.css';
import { useEffect } from 'react';
import { ThemeProvider } from "./components/theme-provider"
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { Navbar } from './components/navbar';
import {
  Route,
  Routes,
  useNavigate
} from "react-router-dom";
import ErrorPage from './components/error';
import { ChatPage } from './pages/chat';
import { useState } from 'react';
import { LoggedInUserData } from './lib/data';
import axios from './api/axios';
import { ProfilePage } from './pages/profile';
import { Toaster } from './components/ui/toaster';

function App() {
  const [ user, setUser ] = useState<LoggedInUserData | undefined>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/auth/getUser', { withCredentials: true });
        if (response.data.success) {
          setUser(response.data.user);
          navigate('/chat')
          console.log(response.data.user)
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setUser(undefined);
      }
    };
    fetchUserData();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='h-screen w-full'>
      <Navbar user={user} setUser={setUser}/>
      <Routes >
        <Route path="/" element={<LoginPage setUser={setUser} />} errorElement={<ErrorPage />} />
        <Route path="/signup" element={<RegisterPage setUser={setUser} />} errorElement={<ErrorPage />} />
        <Route path="/chat" element={<ChatPage user={user}/>} errorElement={<ErrorPage />} />
        <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} errorElement={<ErrorPage />} />
      </Routes>
      </div>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
