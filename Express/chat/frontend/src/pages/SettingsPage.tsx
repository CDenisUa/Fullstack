// Core
import {FC} from 'react';
import {Send} from "lucide-react";
// Store
import {useThemeStore} from '../store/theme/useThemeStore';
// Constants
import {THEMES} from '../constants'
// Components
import ThemeButton from "../components/theme-button/ThemeButton.tsx";

const PREVIEW_MESSAGES = [
    {id: 1, content: "Hey! I've going to here...", isSent: false},
    {id: 2, content: "I'm doing great!.", isSent: true},
];

const SettingsPage: FC = () => {
    const {theme, setTheme} = useThemeStore();

    return (
        <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
            <div className='space-y-6'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-lg font-semibold'>Theme</h2>
                    <p className='text-sm text-base-content/70'>Choose a theme for your chat interface</p>
                </div>
                <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2'>
                    {
                        THEMES.map(t => (
                            <ThemeButton
                                t={t}
                                theme={theme}
                                setTheme={setTheme}
                            />
                        ))
                    }
                </div>
                <h3 className="text-lg font-semibold mb-3">Preview</h3>
                <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
                    <div className="p-4 bg-base-200">
                        <div className="max-w-lg mx-auto">
                            <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                                            J
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-sm">John Doe</h3>
                                            <p className="text-xs text-base-content/70">Online</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                                    {
                                        PREVIEW_MESSAGES.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`
                                                    max-w-[80%] rounded-xl p-3 shadow-sm
                                                    ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                                                `}
                                            >
                                                <p className="text-sm">{message.content}</p>
                                                <p className={`
                                                    text-[10px] mt-1.5
                                                    ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                                                `}
                                                >
                                                    12:00 PM
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 border-t border-base-300 bg-base-100">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            className="input input-bordered flex-1 text-sm h-10"
                                            placeholder="Type a message..."
                                            value="This is a preview"
                                            readOnly
                                        />
                                        <button className="btn btn-primary h-10 min-h-0">
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;