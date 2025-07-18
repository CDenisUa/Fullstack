// Core
import { ChangeEventHandler, FC, FormEvent, useRef, useState } from 'react';
import { Send, X, Image } from "lucide-react";
import { toast } from "react-hot-toast";
// Store
import { useChatStore } from "../../../store/chat/useChatStore";

const MessageInput: FC = () => {
    const { sendMessage } = useChatStore();

    const [ text, setText ] = useState('');
    const [ imagePreview, setImagePreview ] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
        const file = event.target.files?.[0];
        if(!file) return

        if(!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImagePreview(null);
        if(fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!text.trim() && !imagePreview) return

        try {
            sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            setText("");
            setImagePreview(null);
            if(fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message.", error);
        }
    };

    return (
        <div className="p-4 w-full">
            {
                imagePreview && (
                    <div className="mb-3 flex items-center gap-2">
                        <div className="relative">
                            <img
                                src={imagePreview}
                                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                                alt="Preview"
                            />
                            <button
                                onClick={removeImage}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                                type="button"
                            >
                                <X className="size-3" />
                            </button>
                        </div>
                    </div>
                )
            }

            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className={`
                            hidden sm:flex btn btn-circle
                            ${imagePreview ? "text-emerald-500" : "text-zinc-400"}
                        `}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={16} />
                    </button>
                </div>
                <button
                    type="submit"
                    className="sm:flex btn btn-circle"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={16} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;