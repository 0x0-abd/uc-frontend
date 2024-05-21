// import { LoginForm } from '../components/login';
import { useEffect } from 'react';
import { LoginForm } from '../components/login';
import { LoggedInUserData } from '../lib/data';
import { useNavigate } from 'react-router-dom';

export function LoginPage({setUser, user} :{setUser: (object: LoggedInUserData)=> void, user:LoggedInUserData | undefined}) {

    const navigate = useNavigate()

    useEffect(()=>{
        if(user) navigate("/chat")
    },[user, navigate])

    return(
        <div className="w-full flex flex-col items-center mt-6">
            <LoginForm setUser={setUser} />
        </div>
    )
}