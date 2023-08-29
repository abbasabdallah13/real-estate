import User from "@/models/User";
import { connectToDb } from "@/utils/database";

export const PATCH = async(req) => {
    try {
        connectToDb();
        const { email, newWishlist } = await req.json();
        const user = await User.findOne({email});
        user.wishlists.push(newWishlist)
        user.save()

        return new Response(JSON.stringify(user), { status: 200 })
    } catch (error) {
        console.log(error.message)
    }
}