import User from "@/models/User";
import { connectToDb } from "@/utils/database";

export const POST = async(req) => {
    const { email } = await req.json();
    try {
        connectToDb();
        const user = await User.findOne({email});
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error.message)
    }
}