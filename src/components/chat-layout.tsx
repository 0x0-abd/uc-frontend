"use client";

import { LoggedInUserData, Message, MessageWithoutID } from "../lib/data";
import { Chat } from "./chat";

interface ChatLayoutProps {
    messageState: Message[];
    navCollapsedSize: number;
    sendMessage: (message: MessageWithoutID) => void;
    user: LoggedInUserData;
    setMessages: (some: any) => void;
}

export function ChatLayout({messageState, sendMessage, setMessages, user
  }: ChatLayoutProps) {
  
    return (
      <div className="h-full w-full lg:w-10/12 items-center">
          <Chat
            messagesState={messageState}
            setMessages={setMessages}
            selectedUser={user}
            isMobile={false}
            sendMessage={sendMessage}
          />
      </div>
    );
  }