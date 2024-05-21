import { LoggedInUserData, Message, MessageWithoutID } from "../lib/data";
import { ChatList } from "./chat-list";

interface ChatProps {
    messagesState: Message[];
    selectedUser: LoggedInUserData;
    setMessages: (some: any) => void;
    isMobile: boolean;
    sendMessage: (message: MessageWithoutID) => void;
}

export function Chat({ messagesState, setMessages , selectedUser, isMobile, sendMessage }: ChatProps) {
  
    // const appendMessage = (newMessage: Message) => {
    //   setMessages([...messagesState, newMessage]);
    // };
  
    return (
      <div className="flex flex-col justify-between w-full h-full">
        <ChatList
          messages={messagesState}
          selectedUser={selectedUser}
          sendMessage={sendMessage}
          isMobile={isMobile}
        />
      </div>
    );
  }