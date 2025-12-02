// Core
import { useCallback, ChangeEventHandler, FC, FormEvent, useState } from 'react';
import { Mail, MessageSquare, User, Lock, EyeOff, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
// Store
import { useAuthStore } from "../store/auth/useAuthStore.ts";
// Components
import {InputWrapper, AuthImagePattern, LoadingLabel} from "../components";

const SignUpPage: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const { signUp, isSigningUp } = useAuthStore();
    const navigate = useNavigate();

    const validateForm = (): boolean => {
        const fail = (msg: string) => { toast.error(msg); return false; };

        if (!formData.password)              return fail('Password is required');
        if (formData.password.length < 6)    return fail('Password must be at least 6 characters');
        if (!formData.fullName.trim())       return fail('Full name is required');
        if (!formData.email.trim())          return fail('Email is required');
        if (!/\S+@\S+\.\S+/.test(formData.email)) return fail('Invalid email format');
        return true;
    };

    const toggleShow = useCallback(() => setShowPassword(prev => !prev), []);

    const handleChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        const field = event.target.name as keyof SignUpForm;
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }))
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const success = validateForm();
        if(success) {
            await signUp(formData);
            navigate("/");
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors">
                                <MessageSquare className="size-6 textarea-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                            <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputWrapper
                            icon={<User className="size-5 text-base-content/40" />}
                            title="Full Name"
                        >
                            <input
                                name="fullName"
                                type="text"
                                className="input input-bordered w-full pl-10"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </InputWrapper>
                        <InputWrapper
                            icon={<Mail className="size-5 text-base-content/40" />}
                            title="Email"
                        >
                            <input
                                name="email"
                                type="email"
                                className="input input-bordered w-full pl-10"
                                placeholder="your@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </InputWrapper>
                        <InputWrapper
                            icon={<Lock className="size-5 text-base-content/40" />}
                            title="Password"
                        >
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                className="input input-bordered w-full pl-10"
                                placeholder="********"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className=" absolute top-1/2 right-3 -translate-y-1/2 inline-flex items-center"
                                onClick={toggleShow}
                            >
                                {
                                    showPassword
                                        ? <EyeOff className="size-5 text-base-content/40" />
                                        : <Eye className="size-5 text-base-content/40" />
                                }
                            </button>
                        </InputWrapper>
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={isSigningUp}
                        >
                            <LoadingLabel
                                loading={isSigningUp}
                                label="Create Account"
                            />
                        </button>
                    </form>
                    <div className="text-center">
                        <p className="text-base-content/60">
                            Already have an account? {" "}
                            <Link to="/login" className="link link-primary" >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <AuthImagePattern
                title="Join our community"
                subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
            />
        </div>
    );
}

export default SignUpPage;
