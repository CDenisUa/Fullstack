// Core
import {NextRequest} from "next/server";
// Types
import {PromptRequestTypes} from "@/models/prompt/prompt.types";
// Schema
import Prompt from '@/models/prompt/prompt';
// Utils
import {connectToDB} from '@/utils/database';

export const POST = async (req: NextRequest): Promise<Response> => {
    const {
        userId,
        prompt,
        tag
    } = await req.json() as PromptRequestTypes;

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error: any) {
        console.error(error);
        return new Response("Failed to create a new prompt", {status: 500})
    }
};