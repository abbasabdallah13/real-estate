import User from "@/models/User";
import { connectToDb } from "@/utils/database";

export const POST = async(req) => {
    try {
        connectToDb();
        const { registerDetails: { firstName, lastName, email, password, confirmPassword } } = await req.json();
        let user = await User.find({ email });
        if(user.length > 0) return new Response(JSON.stringify({error: 'Email is already registered'}), { status: 200 });
        if(password.length < 6) return new Response(JSON.stringify({error: 'Password should be greater than 6 characters'}, { status: 200 }))
        if(password !== confirmPassword) return new Response(JSON.stringify({error: 'Passwords do not match'}, { status: 200 }))
        user = await User.create({
           name: firstName + ' ' + lastName, 
            email,
            image: 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg',
            password,
            wishlists: []
        })
        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error.message)
    }
}