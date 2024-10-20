import Prompt from "@models/prompt";
import { connecttoDb } from "@utils/database";

export const GET = async(req,{params})=>{
    try {
        await connecttoDb();
        const prompts = await Prompt.find({
            creator:params.id
        }).populate('creator');
        return new Response(JSON.stringify(prompts),{status:200});
    } catch (error) {
        return new Response("Failed To Fetch Prompts",{status:500})
    }
}