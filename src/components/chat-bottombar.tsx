import React, { useRef, useState } from "react";
import {
    Mic,
    FileImage,
    Paperclip,
    PlusCircle,
    SendHorizontal,
    ThumbsUp,
} from "lucide-react"
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { buttonVariants } from "./ui/button";
import { cn } from "../lib/utils";
import { LoggedInUserData, MessageWithoutID } from "../lib/data";
import { Link } from "react-router-dom";


interface ChatBottombarProps {
    loggedInUser: LoggedInUserData;
    sendMessage: (newMessage: MessageWithoutID) => void;
    isMobile: boolean;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
    sendMessage, isMobile, loggedInUser
  }: ChatBottombarProps) {
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLTextAreaElement>(null);
  
    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(event.target.value);
    };
  
    const handleThumbsUp = () => {
      const newMessage: MessageWithoutID = {
        name: loggedInUser.name,
        message: "👍",
        username: loggedInUser.username,
        role: loggedInUser.role,
      };
      sendMessage(newMessage);
      setMessage("");
    };
  
    const handleSend = () => {
      if (message.trim()) {
        const newMessage: MessageWithoutID = {
          name: loggedInUser.name,
          message: message.trim(),
          username: loggedInUser.username,
          role: loggedInUser.role,
        };
        // console.log(newMessage)
        sendMessage(newMessage);
        // console.log("message sent!")
        setMessage("");
  
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };
  
    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
  
      if (event.key === "Enter" && event.shiftKey) {
        event.preventDefault();
        setMessage((prev) => prev + "\n");
      }
    };
  
    return (
      <div className="p-2 flex justify-between w-full items-center gap-2">
        <div className="flex">
            <Popover>
              <PopoverTrigger asChild>
              <Link
            to="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-9",
              "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <PlusCircle size={20} className="text-primary" />
          </Link>
              </PopoverTrigger>
              <PopoverContent 
              side="top"
              className="w-full p-2">
               {message.trim() || isMobile ? (
                 <div className="flex gap-2">
                  <Link 
                to="/"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
                >
                  <Mic size={20} className="text-primary" />
                </Link>
                 {BottombarIcons.map((icon, index) => (
                   <Link
                     key={index}
                     to="/"
                     className={cn(
                       buttonVariants({ variant: "ghost", size: "icon" }),
                       "h-9 w-9",
                       "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                     )}
                   >
                     <icon.icon size={20} className="text-primary" />
                   </Link>
                 ))}
               </div>
               ) : (
                <Link 
                to="/"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
                >
                  <Mic size={20} className="text-primary" />
                </Link>
               )}
              </PopoverContent>
            </Popover>
        </div>
  
          <div
            key="input"
            className="w-full relative"
          >
            <Textarea
              autoComplete="off"
              value={message}
              ref={inputRef}
              onKeyDown={handleKeyPress}
              onChange={handleInputChange}
              name="message"
              placeholder="Type a message..."
              className=" w-full border rounded-xl flex items-center h-9 resize-none overflow-hidden bg-background text-md"
            ></Textarea>
            <div className="absolute right-2 bottom-0.5  ">
              {/* <EmojiPicker onChange={(value) => {
                setMessage(message + value)
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }} /> */}
            </div>
          </div>
  
          {message.trim() ? (
            <Link
              to="/chat"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
              )}
              onClick={handleSend}
            >
              <SendHorizontal size={20} className="text-primary" />
            </Link>
          ) : (
            <Link
              to="/chat"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
              )}
              onClick={handleThumbsUp}
            >
              <ThumbsUp size={20} className="text-primary" />
            </Link>
          )}
      </div>
    );
  }