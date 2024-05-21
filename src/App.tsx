import './App.css';
import { ThemeProvider } from "./components/theme-provider"
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import { Navbar } from './components/navbar';
import {
  Route,
  Routes
} from "react-router-dom";
import ErrorPage from './components/error';
import { ChatPage } from './pages/chat';
import { useState } from 'react';
import { LoggedInUserData } from './lib/data';

function App() {
  const [ user, setUser ] = useState<LoggedInUserData | undefined>()

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className='h-screen w-full'>
      <Navbar user={user} setUser={setUser}/>
      <Routes >
        <Route path="/" element={<LoginPage setUser={setUser} user={user} />} errorElement={<ErrorPage />} />
        <Route path="/signup" element={<RegisterPage setUser={setUser} />} errorElement={<ErrorPage />} />
        <Route path="/chat" element={<ChatPage user={user}/>} errorElement={<ErrorPage />} />
      </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
