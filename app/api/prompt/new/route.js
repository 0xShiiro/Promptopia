import { connecttoDb } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async(req)=>{
    try {
        await connecttoDb();
        const {prompt,userId,tag} = await req.json();
        const newPrompt = await Prompt.create({
            creator:userId,
            prompt:prompt,
            tag:tag,
        });
        return new Response(JSON.stringify(newPrompt),{status:201});
    } catch (error) {
        return new Response("Failed To Create New Prompt",{status:500})
    }
}