// import { LoginForm } from '../components/login';
import { LoginForm } from '../components/login';
import { LoggedInUserData } from '../lib/data';

export function LoginPage({setUser} :{setUser: (object: LoggedInUserData)=> void}) {
    return(
        <div className="w-full flex flex-col items-center mt-6">
            <LoginForm setUser={setUser} />
        </div>
    )
}