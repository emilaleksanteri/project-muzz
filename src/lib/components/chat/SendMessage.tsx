import { useState, useEffect, useRef } from "react";
import { useChat, useUser, useChats } from "../../store";
import { SendHorizontal } from "lucide-react";
import { useParams } from "@tanstack/react-router";

export default function SendMessage(): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const { addMessage, match } = useChat();
  const { setMostRecentMessage } = useChats();
  const { user } = useUser();
  const { chatId } = useParams({ strict: false });
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextArea();
  }, [message]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMsg = {
      id: Math.floor(Math.random() * 100_000_000),
      message: message,
      sentAt: new Date(),
      user: user,
    };
    addMessage(newMsg);
    setMostRecentMessage(newMsg, Number(chatId));
    setMessage("");
  };

  return (
    <div className="absolute bottom-0 flex h-fit w-full items-center justify-center bg-white/30   px-4 py-4 backdrop-blur-xl">
      <form
        className="flex h-fit w-full items-center justify-center gap-2"
        onSubmit={onSubmit}
      >
        <textarea
          ref={textAreaRef}
          value={message}
          rows={1}
          id="text"
          autoFocus
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message ${match.name}`}
          className={`scroll w-full ${
            message.length === 0 ? "rounded-full" : "rounded-lg"
          } resize-none overflow-auto border-[1.5px] border-slate-300 p-4 px-3 py-2 outline-none focus:outline-none`}
        />
        <button
          type="submit"
          className={`${
            message.length === 0 ? "hidden" : "block"
          } flex items-center justify-center self-end rounded-lg bg-[#dd5170] p-2 px-3`}
        >
          <SendHorizontal width={22} height={22} className="stroke-white " />
        </button>
      </form>
    </div>
  );
}
