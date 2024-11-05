// Core
import {connectToDB} from "@/utils/database";
// Models
import Prompt from "@/models/prompt/prompt";

export const GET = async (
    _: Request,
    { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        await connectToDB();

        const prompts = await Prompt.find({
            creator: id
        }).populate('creator');
        return new Response(JSON.stringify(prompts), {status: 200});
    } catch (error) {
        return new Response('Failed to fetch all prompts', {status: 500});
    }
}