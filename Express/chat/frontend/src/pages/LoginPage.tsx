// Core
import {FC, FormEvent, useState} from 'react';
import { Link } from 'react-router-dom';
import {Eye, EyeOff, Lock, Mail, MessageSquare } from 'lucide-react';
// Store
import { useAuthStore } from "../store/auth/useAuthStore.ts";
// Components
import {AuthImagePattern, InputWrapper, LoadingLabel} from "../components";

const LoginPage: FC = () => {
    const { logIn, isLoggedIn } = useAuthStore();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<LoginTypes>({
        email: "",
        password: ""
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        logIn(formData)
    };


    return (
        <div className="h-screen grid lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageSquare className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
                            <p className="text-base-content/60">Sign in to your account</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputWrapper
                            title="Email"
                            icon={<Mail className="h-5 w-5 text-base-content/40" />}
                        >
                            <input
                                type="email"
                                className={`input input-bordered w-full pl-10`}
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </InputWrapper>
                        <InputWrapper
                            title="Password"
                            icon={<Lock className="h-5 w-5 text-base-content/40" />}
                        >
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`input input-bordered w-full pl-10`}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                className=" absolute top-1/2 right-3 -translate-y-1/2 inline-flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {
                                    showPassword
                                        ? <EyeOff className="h-5 w-5 text-base-content/40" />
                                        : <Eye className="h-5 w-5 text-base-content/40" />
                                }
                            </button>
                        </InputWrapper>

                        <button type="submit" className="btn btn-primary w-full" disabled={isLoggedIn}>
                            <LoadingLabel
                                loading={isLoggedIn}
                                label="Sign in"
                            />
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="link link-primary">
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <AuthImagePattern
                title={"Welcome back!"}
                subtitle={"Sign in to continue your conversations and catch up with your messages."}
            />
        </div>
    );
}

export default LoginPage;