import { LoggedInUserData, Message, MessageWithoutID } from "../lib/data";
import { cn } from "../lib/utils";
import React, { useRef } from "react";
import ChatBottombar from "./chat-bottombar";
import { ScrollArea } from "./ui/scroll-area";

interface ChatListProps {
  messages?: Message[];
  selectedUser: LoggedInUserData;
  sendMessage: (newMessage: MessageWithoutID) => void;
  isMobile: boolean;
}

export function ChatList({
  messages,
  selectedUser,
  sendMessage,
  isMobile
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();

    const isSameDay = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    const isSameMonth = date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

    const optionsTime: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const optionsDate: Intl.DateTimeFormatOptions = { day: '2-digit' };
    const optionsMonth: Intl.DateTimeFormatOptions = { month: '2-digit' };

    if (isSameDay) {
        return date.toLocaleTimeString([], optionsTime);
    } else if (isSameMonth) {
        return `${date.toLocaleDateString([], optionsDate)} ${date.toLocaleTimeString([], optionsTime)}`;
    } else {
        return `${date.toLocaleDateString([], {...optionsDate, ...optionsMonth})} ${date.toLocaleTimeString([], optionsTime)}`;
    }
}

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden flex flex-col items-center ">
      <ScrollArea className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col" viewportRef={messagesContainerRef} >
      <div
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
        ref={messagesContainerRef}
      >
        {/* <ScrollArea className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col" */}
        {messages?.map((message, index) => (
          <div
            key={index}
            className={cn(
              "flex flex-col gap-1 p-1 whitespace-pre-wrap",
              message.username === selectedUser.username ? "items-end" : "items-start"
            )}
          >
            <div className="flex gap-2 items-center">
              {/* {message.name === selectedUser.name && (
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={message.avatar}
                        alt={message.name}
                        width={6}
                        height={6}
                      />
                    </Avatar>
                  )} */}
              <div className=" bg-accent py-1 px-2 rounded-md max-w-xs mx-4 lg:max-w-md">
                <p className="w-full text-primary">{message.name} <span className="float-right ml-2 text-muted-foreground">{message.username}</span></p>
                <p className="bg-accent">{message.message}</p>
                <p className="float-right text-muted-foreground text-xs">{formatDate(message.time)}</p>
              </div>
              {/* {message.name !== selectedUser.name && (
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={message.avatar}
                        alt={message.name}
                        width={6}
                        height={6}
                      />
                    </Avatar>
                  )} */}
            </div>
          </div>
        ))}
      </div>
      </ScrollArea>
      <ChatBottombar sendMessage={sendMessage} loggedInUser={selectedUser} isMobile={isMobile} />
    </div>
  );
}
