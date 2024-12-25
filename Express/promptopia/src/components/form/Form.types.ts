// Core
import {Dispatch, FormEventHandler, SetStateAction} from "react";

export interface FormPropTypes {
    type: string,
    post: Post,
    setPost: Dispatch<SetStateAction<Post>>,
    submitting: boolean,
    handleSubmit: FormEventHandler<HTMLFormElement> | undefined
}

interface Post {
    prompt: string,
    tag: string
}