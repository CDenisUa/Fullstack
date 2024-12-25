// Core
import {NextRequest} from "next/server";
import {connectToDB} from "@/utils/database";
// Models
import Prompt from "@/models/prompt/prompt";

export const GET = async (request: NextRequest) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (error) {
        return new Response('Failed to fetch all prompts', {status: 500});
    }
}