import { useState, useEffect, useRef, Dispatch } from "react";
import { useChat, useUser, useChats } from "../../store";
import { SendHorizontal, Camera, X } from "lucide-react";
import { useParams } from "@tanstack/react-router";

type UploadPhotoBtnProps = {
  setFile: Dispatch<React.SetStateAction<string | null>>;
};

function UploadPhotoBtn(props: UploadPhotoBtnProps): JSX.Element {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addFileToUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files ? e.target.files[0] : null;
    props.setFile(f ? URL.createObjectURL(f) : null);
  };

  return (
    <button type="button" className="cursor-pointer" onClick={addFileToUpload}>
      <Camera width={26} height={26} className="stroke-slate-800" />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={uploadFile}
      />
    </button>
  );
}

export default function SendMessage(): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const [file, setFile] = useState<string | null>(null);
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
      message: message.length ? message : file ? " " : "",
      sentAt: new Date(),
      user: user,
      img: file ?? undefined,
    };
    addMessage(newMsg);
    setMostRecentMessage(newMsg, Number(chatId));
    setMessage("");
    setFile(null);
  };

  return (
    <div
      className={`${
        file ? "-mt-[17%]" : "absolute"
      } bottom-0  flex h-fit w-full flex-col items-center justify-center gap-2   bg-white/30 px-4 py-4 backdrop-blur-xl`}
    >
      {file && (
        <div className="flex w-full items-center justify-start">
          <div className="relative">
            <button
              onClick={() => setFile(null)}
              className="absolute right-0 top-0 z-20 rounded-full bg-slate-800 p-1"
            >
              <X width={18} height={18} className="stroke-white" />
            </button>
            <img
              src={file}
              alt="file"
              className="h-24 w-24 rounded-lg object-cover drop-shadow-md"
            />
          </div>
        </div>
      )}
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
        <UploadPhotoBtn setFile={setFile} />
        <button
          type="submit"
          className={message.length === 0 && file === null ? "hidden" : "block"}
        >
          <SendHorizontal
            width={26}
            height={26}
            className="stroke-[#dd5170] "
          />
        </button>
      </form>
    </div>
  );
}
