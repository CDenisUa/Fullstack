// Core
import {connectToDB} from "@/utils/database";
// Models
import Prompt from "@/models/prompt/prompt";


// GET (read)
export const GET = async (_: Request, {params}: IParams<'id'>) => {
    const {id} = params;

    try {
        await connectToDB();
        const prompts = await Prompt.findById(id).populate('creator');
        if (!prompts) return new Response("Prompt not found", {status: 404});
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (error) {
        return new Response('Failed to fetch all prompts', {status: 500});
    }
}

// PATCH (update)
export const PATCH = async (request: Request, {params}: IParams<'id'>) => {
    const {id} = params;
    const {prompt, tag} = await request.json();

    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(id);
        if (!existingPrompt) return new Response("Prompt not found", {status: 404});
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200})
    } catch (error) {
        return new Response('Failed to fetch all prompts', {status: 500});
    }
}

// DELETE (delete)
export const DELETE = async (_: Request, {params}: IParams<'id'>) => {
    const {id} = params;
    try {
        await connectToDB();
        await Prompt.findByIdAndDelete(id);
        return new Response("Prompt deleted successfully", {status: 200})
    } catch (error) {
        return new Response("Failed to delete prompt", {status: 500})
    }
}