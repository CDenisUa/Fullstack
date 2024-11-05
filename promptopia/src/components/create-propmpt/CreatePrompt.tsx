'use client'
// Core
import {FC, FormEventHandler, useState} from "react";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
// Components
import {Form} from "@/components";

const CreatePrompt: FC = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const createPrompt: FormEventHandler<HTMLFormElement> | undefined = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/prompt/new',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        prompt: post.prompt,
                        userId: session?.user?.id,
                        tag: post.tag
                    })
                });
            if (response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type='Create'
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    );
}

export default CreatePrompt;