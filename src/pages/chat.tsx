import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { ChatLayout } from '../components/chat-layout';
import { LoggedInUserData, Message, MessageWithoutID } from '../lib/data';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

export function ChatPage({user} : {user: LoggedInUserData | undefined}) {
    // const [welcome, setWelcome] = useState('');
    const [landingIntro, setLandingIntro] = React.useState<string>("Wait while we verify you are signed in")
    const [messagesState, setMessages] = React.useState<Message[]>([]);
    const CHAT_URL = '/chat/'

    useEffect(() => {
        const getMessages = async ()=> {
            try {
                const response = await axios.get(CHAT_URL, {withCredentials: true})
                // console.log(response)
                setMessages(response.data)
            } catch(e) {
                // console.log(e)
                setLandingIntro(prev => "Could not verify the account, please login again")
            } 
        }
        getMessages();
    }, [])
    useEffect(() => {
        // const socket = io('http://localhost:3001/');
        const socket = io('https://uc-backend-pqfj.onrender.com/');
        socket.on('message', (data) => {
            // setWelcome(data);
        });
        socket.on("recieve_message", (data) => {
            console.log(data);
            // alert(data.message)
            setMessages(prevmessages=>[...prevmessages, data]);
        })
        return () => {
            socket.disconnect();
        };
    }, []);

    // useEffect(() => {
    //     setTimeout(()=> {
    //         const msg: Message ={id: 1212,  name:"This is god's message", username:"GOD", message:"this is my order", role:"ADMIN"}
    //         setMessages(prevmessages=>[...prevmessages, msg])
    //     }, 4000)
    // }, [])


    const sendMessage = async (message: MessageWithoutID) => {
        const socket = io('https://uc-backend-pqfj.onrender.com/');
        // const socket = io('http://localhost:3001/');
        // console.log("socket msg sent")
        socket.emit('send_message', message)
    }

    return (
        <main className="w-full h-full flex flex-col items-center justify-center" style={{height: "calc(100% - 4rem)"}}>
            {/* <div className='h-2'>{welcome} </div> */}
            <div className='w-full h-full items-center contents'>
                {user ? (<ChatLayout navCollapsedSize={8} sendMessage={sendMessage} messageState={messagesState} setMessages={setMessages} user={user}/> 
                ): (
                    <div className='contents'>
                    <h2 className='text-2xl py-8 px-4 text-center'>{landingIntro}</h2>
                    <Link to= "/"><h3 className='text-primary underline'>Click here to Login</h3></Link>
                    </div>
                )
                }
            </div>

        </main>
    )
}