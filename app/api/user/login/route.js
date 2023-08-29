import User from "@/models/User";
import { connectToDb } from "@/utils/database"

export const POST = async(req) => {
    try {
        connectToDb();
        const { loginDetails: { email, password } } = await req.json();
        const user = await User.findOne({email});
        if(user.length === 0) return new Response(JSON.stringify({error: 'Email does not exists'}, { status: 200 }))
        if(user.password !== password) return new Response(JSON.stringify({error: 'Incorrect Password'}, { status: 200 }))
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error.message)
    }
}