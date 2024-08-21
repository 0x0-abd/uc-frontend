import React, { useRef, useState, ChangeEvent } from "react";
import {
  // Mic,
  FileImage,
  Paperclip,
  PlusCircle,
  SendHorizontal,
  ThumbsUp,
  CircleXIcon
} from "lucide-react"
import { Textarea } from "./ui/textarea";
import { Popover, PopoverTrigger } from "./ui/popover";
import { buttonVariants } from "./ui/button";
import { cn } from "../lib/utils";
import { LoggedInUserData, MessageWithoutID } from "../lib/data";
import { Link } from "react-router-dom";
import axios from "../api/axios";


interface ChatBottombarProps {
  loggedInUser: LoggedInUserData;
  sendMessage: (newMessage: MessageWithoutID) => void;
  isMobile: boolean;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];


export default function ChatBottombar({
  sendMessage, isMobile, loggedInUser
}: ChatBottombarProps) {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [loadingProgress, setLoadingProgress] = useState<number | null>(null);

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

  const handleSend = async () => {
    if (!message.trim() && !file) return; // Prevent sending empty message without file

    let imageId = null;
    if (file) {
      // Upload image and get UUID
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post('/media/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: ({loaded, total}) => {
            let percentCompleted = Math.floor((loaded * 100) / (total as number));
            console.log(percentCompleted)
            setLoadingProgress(percentCompleted)
          }
        });
        imageId = response.data.data.path; // Assume server returns the file path or UUID
        console.log('Image uploaded successfully:', imageId);
      } catch (error) {
        console.error('Error uploading image:', error);
        setLoadingProgress(null)
        return;
      }
    }

    const newMessage: MessageWithoutID = {
      name: loggedInUser.name,
      message: message.trim(),
      username: loggedInUser.username,
      role: loggedInUser.role,
      imageId, // Include image UUID in the message
    };

    sendMessage(newMessage);
    // console.log(newMessage)
    setMessage("");
    setImagePreview(null);
    setFile(null);
    setLoadingProgress(null);

    if (inputRef.current) {
      inputRef.current.focus();
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      // console.log(file)
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setImagePreview(imageUrl);
    }
  };
  const handleRemoveImage = () => {
    setFile(null);
    setImagePreview(null);
  };

  return (
    <div className="p-2 flex justify-between w-full items-center gap-2">
      <div className="flex">
        <Popover>
          <PopoverTrigger asChild>
            <div
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white cursor-pointer"
              )}
              onClick={() => {
                const fileInput = document.querySelector<HTMLInputElement>(".file-input");
                fileInput?.click();
              }}
            >
              <input type="file" accept="image/*" onChange={handleFileChange} className="file-input hidden" />
              <PlusCircle size={20} className="text-primary" />
            </div>
          </PopoverTrigger>
          {/* <PopoverContent
            side="top"
            className="w-full p-2">
            {message.trim() || isMobile ? (
              <div className="flex gap-2">
                <div
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <input type="file" onChange={handleFileChange} />
                  <Mic size={20} className="text-primary" />

                </div>
              </div>
            ) : (
              <div
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                )}
              >
                <input type="file" onChange={handleFileChange} />
                <button>
                  <Mic size={20} className="text-primary" />
                </button>
              </div>
            )}
          </PopoverContent> */}
        </Popover>
      </div>

      <div
        key="input"
        className="w-full relative"
      >
        {imagePreview && (
          <div className="absolute bottom-20 w-16 h-16">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg border border-gray-300"
            />
            {/* <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 w-4 h-4 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2"
          >
            x
          </button> */}
            <CircleXIcon onClick={handleRemoveImage} className="absolute cursor-pointer text-primary top-0 right-0 rounded-full p-1 w-7 h-7 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2" />
          </div>
        )}
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
        {loadingProgress !== null && (
          <div className="loading-bar">
            <div className="loading-bar-progress h-1 bg-primary" style={{ width: `${loadingProgress}%` }} />
          </div>
        )}

        <div className="absolute right-2 bottom-0.5  ">
          {/* <EmojiPicker onChange={(value) => {
                setMessage(message + value)
                if (inputRef.current) {
                  inputRef.current.focus();
                }
              }} /> */}
        </div>
      </div>

      {message.trim() || file ? (
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