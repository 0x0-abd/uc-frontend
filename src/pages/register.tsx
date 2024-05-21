import { RegisterForm } from "../components/register";
import { LoggedInUserData } from "../lib/data";

export function RegisterPage({setUser} :{setUser: (object: LoggedInUserData)=> void}) {
    return(
        <div className="w-full flex flex-col items-center mt-6">
            <RegisterForm setUser={setUser} />
        </div>
    )
}